//(function(){
//console.log(adapter.browserDetails.browser);
//视频区域内容
function changeContent(content, video) {
    var video_out = document.getElementById("vid-box");
    if (video_out) {
        video_out.innerHTML = content;
        if (video)
            video_out.appendChild(video);
    }
}

var pub_key = "pub-c-9d0d75a5-38db-404f-ac2a-884e18b041d8"; //"pub-c-8fb11ca0-dedd-4a74-a80d-fcb3efefc7e0";//
var sub_key = "sub-c-4e25fb64-37c7-11e5-a477-0619f8945a4f"; //"sub-c-484a71d4-e170-11e7-a266-7abf3fe410a1";//
var standby_suffix = "-stdby";
var userId = "";
var isAdminLogin = false;
var callUserId = "";

function login(username) {
    if (isAdminLogin) {
        $("#vid-box-callarea").show();
        return true;
    }
    console.log("webrtc-login", username, pub_key);
    userId = username || "Anonymous";
    var userIdStdBy = userId + standby_suffix;
    var pubnub = window.pubnub = PUBNUB({
        publish_key: pub_key,
        subscribe_key: sub_key,
        uuid: userId,
        ssl: true
    });
    //pubnub.unsubscribe({ channel : userIdStdBy });

    pubnub.subscribe({
        channel: userIdStdBy,
        message: incomingCall,
        //timeout : 2000,
        connect: function(e) {
            pubnub.state({
                channel: userIdStdBy,
                uuid: userId,
                state: { "status": "Available" },
                callback: function(m) {
                    isAdminLogin = true;
                    console.log("subscribe=", JSON.stringify(m))
                    $("#vid-box-callarea").show();
                }
            });
            console.log("Subscribed and ready!");

        }
        // ,callback: function (message) {
        //     console.log('subscribe=I got the message ', message);
        // },
        // disconnect: function (uuid, peerConnection) {
        //     // Called when the peerConnection is closed
        //     console.log('subscribe=disconnect ', uuid,peerConnection);
        //}
    });
    return false;
}

function phoneStart() {

    var phone = window.phone = PHONE({
        number: userId || "Anonymous", // listen on username line else Anonymous
        publish_key: pub_key, // Your Pub Key
        subscribe_key: sub_key, // Your Sub Key
    });
    phone.reconnect(function(session) {
        console.log("reconnect=", session);
        changeContent("连接中....", null);
    });
    phone.connect(function(session) {
        console.log("connect=", session);
    });
    phone.ready(function() {
        console.log("Phone ON!", pubnub.state);
    });
    phone.receive(function(session) {
        console.log("session=", session);
        //session.message(message);
        session.connected(function(session) {
            console.log("connected=", session.video);
            var video_out = document.getElementById("vid-box");
            video_out.innerHTML = "";
            video_out.appendChild(session.video);
            sounds.play('sound/hi');
            $('#vid-box-call').hide();
            $('#vid-box-endcall').show();

        });
        session.ended(function(session) {
            console.log("ended=", session);
            changeContent("", null);
             $('#vid-box-endcall').hide();
            $('#vid-box-call').show();
            $('.monitor-box1').html('<img src="../images/shipin1.png">')
        });
    });

    phone.callstatus(function(session) {
        console.log("callstatus=", session);
        if (session && session.status == "connecting") {
            console.log("callstatus=", session.closed);
        }
    });
    phone.debug(function(session) {
        console.log("debug=", session);
    });
    phone.unable(function(details) {
        console.log("Alert!unable.", details);
        changeContent("未检测到摄像头或者麦克风，请先确认你的摄像头和麦克风工作正常!", null);
        alert("未检测到摄像头或者麦克风，请先确认你的摄像头和麦克风工作正常!");
    });

    phone.message(function(session) {
        console.log("message=", session);
    });
    phone.extra(function(session) {
        if (session == "extra_handup") {
            changeContent("对方拒绝你的通话请求!", null);
        }
        console.log("debug extra=", session);
    });
}
//检测对方是否离线


var stimeout ;
function checkState(stdby, userid) {
    window.pubnub.state({
        channel: stdby,
        uuid: userid,
        callback: function(m) {
            console.log("state callback:", userid, m);
            if (m.status != "Available") {
                changeContent("连接中....", null);
                $('#vid-box-endcall').show();
                stimeout = setTimeout(function(){
                     changeContent("暂时无人接听....", null);
                },10000)
               
            } else {
                changeContent("连接中....", null);
                $('#vid-box-endcall').show();
                $('#vid-box-call').hide();
            }
        },
        error: function(m) {
            console.log("state error:", userid, m);
        }
    });
}

function makeCall(callusername) {
    if (!window.pubnub) alert("请先登录!");

    console.log("makeCall=", callusername, window.pubnub);
    //Publish to their standby.
    callUserId = callusername;
    var callUser = callusername; //form.number.value;
    var stdByCh = callUser + standby_suffix;
    var msg = { "call_user": userId, "call_time": new Date().getMilliseconds(), "to_user": callusername };

   checkState(stdByCh, callUser);

    window.pubnub.publish({
        channel: stdByCh,
        message: msg,
        callback: function(m) {
            console.log("HERE" + callUser + stdByCh, m);
        },
        error: function(m) {
            console.log("Error:" + m);
        }
    });

    if (!window.phone) phoneStart();
    return false;
}

function incomingCall(m) {
    changeContent("连接中....", null);
    setTimeout(function() {
        if (!window.phone) phoneStart();
        phone.dial(m["call_user"]);
        console.log("incomingCall=", m);
    }, 2000);
}

function endCall(isvoice) {
    if (window.phone) {
        console.log("endCall=");
        changeContent("", null);
        window.phone.hangup();
        clearTimeout(stimeout)

        if (callUserId != "")
            window.phone.hangup(callUserId);
        if (isvoice)
            sounds.play('sound/goodbye');
        console.log("Bye!!!");
    }
}

function message(session, message) {
    add_chat(session.number, message);
}

function add_chat(number, message) {
    console.log(number + ": " + message);
    //chat_box.innerHTML = "<p>" + number+" ("+ formatTime(message["msg_timestamp"]) +"): " + message["msg_message"] + "</p>" + chat_box.innerHTML;
}

function sendMessage() {
    var msg = chat_msg.value;
    if (msg === '' || !window.phone) return alert("Not in a call.");
    var chatMsg = { 'msg_uuid': safetxt(userId), 'msg_message': safetxt(msg), 'msg_timestamp': new Date().getTime() };
    phone.send(chatMsg);
    console.log(msg);
    add_chat("Me: ", chatMsg);
}
// Will format in 12-hour h:mm.s a time format
function formatTime(millis) {
    var d = new Date(millis);
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var a = (Math.floor(h / 12) === 0) ? "am" : "pm";
    return (h % 12) + ":" + m + "." + s + " " + a;
}
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
// XSS Prevent
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
function safetxt(text) {
    return ('' + text).replace(/[<>]/g, '');
}
//})();
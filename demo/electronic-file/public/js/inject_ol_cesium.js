(function() {
  var  mode = window.location.href.match(/mode=([a-z0-9\-]+)\&?/i);
  var  DIST = true;
  var  isDev = mode && mode[1] === 'dev';
  var  cs = isDev ? 'CesiumUnminified/Cesium.js' : 'js/Cesium.js';
  var  ol = (DIST && isDev) ? 'olcesium-debug.js' : 'js/olcesium.js';

  if (!window.LAZY_CESIUM) {
    document.write(`${'<scr' + 'ipt type="text/javascript" src="'}${cs}"></scr` + 'ipt>');
  }
  document.write(`${'<scr' + 'ipt type="text/javascript" src="'}${ol}"></scr` + 'ipt>');

  let s;
  window.lazyLoadCesium = function() {
    if (!s) {
      s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `${cs}`;
      console.log('loading Cesium...');
      document.body.appendChild(s);
    }
    return s;
  };
})();


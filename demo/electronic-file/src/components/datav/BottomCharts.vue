<template>
  <div class="bottom-charts">
    <div class="bc-chart-item">
      <div class="bcci-header">告警通知</div>
      <dv-active-ring-chart :config="config1" />
      <Label-Tag :config="labelConfig1" />
    </div>
    <dv-decoration-2 class="decoration-1" :reverse="true" style="width:5px;" />

    <div class="bc-chart-item">
      <div class="bcci-header">LED大屏终端</div>
      <dv-active-ring-chart :config="config2" />
      <Label-Tag :config="labelConfig2" />
    </div>

    <dv-decoration-2 class="decoration-2" :reverse="true" style="width:5px;" />

<!--     <div class="bc-chart-item">
      <div class="bcci-header">C收费站</div>
      <dv-active-ring-chart :config="config3" />
      <Label-Tag :config="labelConfig3" />
    </div> -->

    <dv-decoration-2 class="decoration-3" :reverse="true" style="width:5px;" />

    <div class="bc-chart-item">
      <div class="bcci-header">游客结构统计</div>
      <dv-active-ring-chart :config="config4" />
      <Label-Tag :config="labelConfig4" />
    </div>

  </div>
</template>

<script>
import LabelTag from './LabelTag'

export default {
  name: 'BottomCharts',
  components: {
    LabelTag
  },
  data () {
    return {
      config1: {
        data: [
          {
            name: '码头告警',
            value: 356
          },
          {
            name: '景区告警',
            value: 215
          },
          {
            name: '其他',
            value: 317
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        radius: '65%',
        activeRadius: '70%'
      },

      config2: {
        data: [
          {
            name: '在线数量',
            value: 615
          },
          {
            name: '离线数量',
            value: 322
          },
          {
            name: '紧急插播入口',
            value: 198
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        radius: '65%',
        activeRadius: '70%'
      },

      config3: {
        data: [
          {
            name: '收费站',
            value: 452
          },
          {
            name: '监控中心',
            value: 512
          },
          {
            name: '道路外场',
            value: 333
          },
          {
            name: '其他',
            value: 255
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        radius: '65%',
        activeRadius: '70%'
      },

      config4: {
        data: [
          {
            name: '年龄比例',
            value: 156
          },
          {
            name: '性别',
            value: 415
          },
          // {
          //   name: '道路外场',
          //   value: 90
          // },
          {
            name: '其他',
            value: 210
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        radius: '65%',
        activeRadius: '70%'
      },

      labelConfig1: {
        data: ['码头告警', '景区告警', '其他']
      },
      labelConfig2: {
        data: ['在线数量', '离线数量', '紧急插播入口']
      },
      labelConfig3: {
        data: ['码头告警', '景区告警', '其他']
      },
      labelConfig4: {
        data: ['年龄比例', '性别', '其他']
      }
    }
  }
}
</script>

<style lang="less">
.bottom-charts {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  .bc-chart-item {
    width: 33%;
    height: 100%;
    padding-top: 20px;
    box-sizing: border-box;
  }

  .bcci-header {
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
  }

  .dv-active-ring-chart {
    height: calc(~"100% - 80px");
  }

  .label-tag {
    height: 30px;
  }

  .active-ring-name {
    font-size: 18px !important;
  }

  .decoration-1, .decoration-2, .decoration-3 {
    display: absolute;
    left: 0%;
  }
}
</style>

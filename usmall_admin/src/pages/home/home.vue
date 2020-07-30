<template>
  <div>
    <div class="box" id="main"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
    let option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line"
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
};
</script>
<style scoped>
.box {
  width: 100%;
  height: 100vh;
  border: 1px solid #ccc;
}
</style>
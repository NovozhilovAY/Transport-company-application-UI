<template>
  <div>
    <vue3-chart-js
        :type="type"
        :data="data"
        ref="chartRef"
    ></vue3-chart-js>
  </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

export default {
  name: 'CarChart',
  components: {
    Vue3ChartJs
  },
  props: {
    weeklyStat: Object
  },
  mounted() {
    this.setup(this.props);
  },
  setup(props){
    const type= 'line';
    console.log(props.weeklyStat.week);
    console.log(props.weeklyStat.kilometrage);
    const data= {
      labels: props.weeklyStat.week,
      datasets: [
        {
          borderColor:'#41B883',
          data: props.weeklyStat.kilometrage
        }
      ]
    }
    return {
      type,
      data
    }
  }
}


</script>
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <line-chart :chart-data="lineChartData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from './components/LineChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
}

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  components: {
    LineChart

  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

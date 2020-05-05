<template>
  <div>
    <list
      :list="list"
    />
  </div>
</template>
<script>
import { getYearHoliday } from '@/api/basic/index'
import List from '@/components/calendar'
export default {
  components: {
    List
  },
  data() {
    return {
      list: [],
    };
  },
  created() {

  },
  methods: {
    fetchData() {
      const myDate = new Date()
      const tYear = myDate.getFullYear()
      const array = []
      getYearHoliday({
        d: (tYear + '01%2C' + tYear + '02%2C' + tYear + '03%2C' + tYear + '04%2C' + tYear + '05%2C' + tYear + '06%2C' + tYear + '07%2C' + tYear + '08%2C' + tYear + '09%2C' + tYear + '10%2C' + tYear + '11%2C' + tYear + '12'),
        info: 1,
        back: 'json'
      }).then(res => {
        for (const i in res) {
          for (const j in res[i]) {
            const obj = {}
            if(res[i][j].type == 1 || res[i][j].type == 2) {
              eval("obj.date='" + (res[i][j].day).replace( /(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + "'")
              eval("obj.typename='" + res[i][j].typename + "'")
              array.push(obj)
            }
          }
        }
        this.list = array
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 300px);
}
</style>

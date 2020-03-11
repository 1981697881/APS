<template>
  <ele-calendar
    style="margin-top: 20px;"
    defaultValue="2019-05"
    @date-change="change"
    @pick="pick"
    :selectionMode="'dates'"
   @select="select"
    :render-content="renderContent"
    :data="datedef"
    :prop="prop"></ele-calendar>
</template>
<script>
  import eleCalendar from 'ele-calendar'
  import 'ele-calendar/dist/vue-calendar.css'
    export default {
      components: {
        eleCalendar
      },
      data() {
        return {
          datedef: [

            {'date': "2019-05-01", 'content': 'aa', "cid": null},

            {'date': "2019-05-15", 'content': 'bb', "cid": null},

          ],
          valueDates:[],
          prop: 'date' //对应日期字段名
        }
      },
      methods: {
        renderContent(h,parmas) { //设置lunarcalendar=true,parmas返回值包含农历
          const loop = data =>{
            return (
              data.defvalue.value ? (<div><div>{data.defvalue.text}</div>
                <span  >备选项</span>
                </div>) : <div>{data.defvalue.text}</div>
            )
          }
          return (
            <div  style="min-height:60px;">
            {loop(parmas)}
            </div>
        );
        },
        change() {
          console.log(this.datedef)
        },
        pick() {
          //console.log(this.datedef)
        },
        select(val) {
          this.valueDates=[]
          for(const i in val){
            this.valueDates.push(this.msToDate(val[i]).withoutTime)
          }
          console.log(this.valueDates)
        },
        //中国标准时间转年月日
        msToDate(msec) {
          let datetime = new Date(msec)
          let year = datetime.getFullYear()
          let month = datetime.getMonth()
          let date = datetime.getDate()
          let hour = datetime.getHours()
          let minute = datetime.getMinutes()
          let second = datetime.getSeconds()

          let result1 =
            year +
            '-' +
            (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
            '-' +
            (date + 1 < 10 ? '0' + date : date) +
            ' ' +
            (hour + 1 < 10 ? '0' + hour : hour) +
            ':' +
            (minute + 1 < 10 ? '0' + minute : minute) +
            ':' +
            (second + 1 < 10 ? '0' + second : second)

          let result2 =
            year +
            '-' +
            (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
            '-' +
            (date + 1 < 10 ? '0' + date : date)

          let result = {
            hasTime: result1,
            withoutTime: result2
          }

          return result
        },
      }
    }
</script>

<style scoped>

</style>

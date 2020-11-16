<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="120px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'部门'">
            <el-input v-model="form.deptName" readOnly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'职员'">
            <el-input v-model="form.name" readOnly="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'日期'">
            <el-input v-model="form.date" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'上班时间'" prop="startTime">
            <el-time-picker
              v-model="form.startTime"
              style="width: 100%"
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'下班时间'" prop="endTime">
            <el-time-picker
              v-model="form.endTime"
              style="width: 100%"
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-row>

   </el-form>
   <div slot="footer" style="text-align:center;padding-top: 15px">
       <el-button type="primary" @click.native="saveData('form')">保存</el-button>
     </div>
 </div>
</template>

<script>
import { getSalaryList,addOrUpdateAttendManage } from "@/api/attendance/index"

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      num1: 1,
      visible: false,
      form: {
       /* overtimeNum: '',
        normalNum: '',*/
        amId: '',
        startTime: '',
        endTime: '',
      },
      rules: {
        /*normalNum: [
          {required: true, message: '请输入值', trigger: 'blur'},
        ],
        overtimeNum: [
          {required: true, message: '请输入值', trigger: 'blur'},
        ],*/
        startTime: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        endTime: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
      },
      loading: false,
      obj: {},
      type: null,
    };
  },
 created() {
   if (this.listInfo) {
     this.form = this.listInfo
     console.log(this.form)
     this.fetchData(this.listInfo);
   }
 },
 mounted() {

 },
 methods: {
   // 查询前后三天日期
   getDay(date, day){
     var today = new Date(date);
     var targetday_milliseconds=today.getTime() + 1000*60*60*24*day
     today.setTime(targetday_milliseconds) //注意，这行是关键代码
     var tYear = today.getFullYear()
     var tMonth = today.getMonth()
     var tDate = today.getDate()
     var getDay = today.getDay()
     var getHours = today.getHours()
     var getMinutes = today.getMinutes()
     var getSeconds = today.getSeconds()
     tMonth = this.doHandleMonth(tMonth + 1)
     tDate = this.doHandleMonth(tDate)
     getHours = this.doHandleMonth(getHours)
     getMinutes = this.doHandleMonth(getMinutes)
     getSeconds = this.doHandleMonth(getSeconds)
     var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
     var week = weeks[getDay]
     return {
       date: tYear + "-" + tMonth + "-" + tDate + " " + getHours + ":" + getMinutes + ":" + getSeconds
     }
   },
   saveData(form) {
     this.$refs[form].validate((valid) => {
       //判断必填项
       if (valid) {
         this.form.punchOneTime = this.getDay(this.form.startTime, 0).date
         this.form.punchTwoTime = this.getDay(this.form.endTime, 0).date
         delete this.form.startTime
         delete this.form.endTime
         console.log(this.form)
         addOrUpdateAttendManage(this.form).then(res => {
           this.$emit('hideDialog')
           this.$emit('uploadList')
         });
       }else {
         return false
       }
     })
   },
   doHandleMonth(month) {
     var m = month
     if(month.toString().length == 1) {
       m = "0" + month
     }
     return m
   },
   fetchData(val) {
     const me = this
     getSalaryList(val).then(res => {
       if(res.data.length > 0){
         this.$set(me.form, 'amId', res.data[0].detail[0].amId)
         this.$set(me.form, 'startTime', new Date(res.data[0].detail[0].startTime))
         this.$set(me.form, 'endTime', new Date(res.data[0].detail[0].endTime))
         /*this.$set(me.form, 'overtimeNum', res.data[0].detail[0].overtimeNum)
         this.$set(me.form, 'normalNum', res.data[0].detail[0].normalNum)*/
         delete me.form.detail
         console.log(res)
       }
     })
   }
 }
}
</script>

<style>
</style>

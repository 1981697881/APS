<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="120px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'oid'" style="display: none">
            <el-input v-model="form.oid"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'上班时间'" prop="startTime">
            <el-time-picker
              v-model="form.startTime"
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'下班时间'" prop="endTime">
            <el-time-picker
              v-model="form.endTime"
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'正班时长'" prop="normalNum">
            <el-input v-model="form.normalNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'加班时长'" prop="overtimeNum">
            <el-input v-model="form.overtimeNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'抵扣年假/H'">
            <el-input v-model="form.annualLeaveDeduction"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'本月使用年假/H'">
            <el-input v-model="form.useAnnualLeave"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'病假/H'">
            <el-input v-model="form.sickLeave"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'事假/H'">
            <el-input v-model="form.personalLeave"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'调休/H'">
            <el-input v-model="form.rest"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'丧假/H'">
            <el-input v-model="form.bereavementLeave"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'产假/H'">
            <el-input v-model="form.maternityLeave"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'公假/H'">
            <el-input v-model="form.publicHoliday"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'婚假/H'">
            <el-input v-model="form.weddingLeave"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'陪产假/H'">
            <el-input v-model="form.paternityLeave"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'哺乳假/H'">
            <el-input v-model="form.breastfeedingLeave"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'工伤假/H'">
            <el-input v-model="form.workInjuryLeave"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'本月新增调休/H'">
            <el-input v-model="form.addRest"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'上月剩余调休/H'">
            <el-input v-model="form.remainingRestOfLastMonth"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'本月剩余调休/H'">
            <el-input v-model="form.restOfTheMonth"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'上月剩余年假/H'">
            <el-input v-model="form.remainingAnnualLeaveLastMonth"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'本月剩余年假/H'">
            <el-input v-model="form.annualLeaveRemainingThisMonth"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'餐补'">
            <el-input v-model="form.mealSupplement"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'出差补贴'">
            <el-input v-model="form.travelAllowance"></el-input>
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
import { getSalaryList,updateSalary } from "@/api/attendance/index"

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
        amId: '',
        overtimeNum: '',
        normalNum: '',
        startTime: '',
        endTime: '',
        annualLeaveDeduction: '',
        jobNum: '',
        totalTime: '',
        normalOverWTime: '',
        weekendOverWTime: '',
        statutoryOverWTime: '',
        useAnnualLeave: '',
        sickLeave: '',
        personalLeave: '',
        rest: '',
        bereavementLeave: '',
        maternityLeave: '',
        publicHoliday: '',
        weddingLeave: '',
        paternityLeave: '',
        breastfeedingLeave: '',
        workInjuryLeave: '',
        addRest: '',
        remainingRestOfLastMonth: '',
        restOfTheMonth: '',
        remainingAnnualLeaveLastMonth: '',
        annualLeaveRemainingThisMonth: '',
        mealSupplement: '',
        travelAllowance: '',
      },
      rules: {
        normalNum: [
          {required: true, message: '请输入值', trigger: 'blur'},
        ],
        overtimeNum: [
          {required: true, message: '请输入值', trigger: 'blur'},
        ],
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
         updateSalary(this.form).then(res => {
           this.$emit('hideDialog')
           this.$emit('uploadList')
         });
       }else {
         return false
       }
     })
   },
   doHandleMonth(month) {
     var m = month;
     if(month.toString().length == 1) {
       m = "0" + month;
     }
     return m;
   },
   fetchData(val) {
     const me = this
     getSalaryList(val).then(res => {
       this.$set(me, 'form', res.data[0])
       me.form = res.data[0]
       this.$set(me.form, 'amId', res.data[0].detail[0].amId)
       this.$set(me.form, 'startTime', new Date(res.data[0].detail[0].startTime))
       this.$set(me.form, 'endTime', new Date(res.data[0].detail[0].endTime))
       this.$set(me.form, 'overtimeNum', res.data[0].detail[0].overtimeNum)
       this.$set(me.form, 'normalNum', res.data[0].detail[0].normalNum)
       delete me.form.detail
      console.log(res)
     });
   },
 }
};
</script>

<style>
</style>

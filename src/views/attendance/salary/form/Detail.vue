<template>
  <div>
    <el-form v-model="form" label-width="120px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'oid'" style="display: none">
            <el-input v-model="form.oid"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'上班时间'">
            <el-time-picker
              v-model="form.startTime"
              :picker-options="{
                  selectableRange: '00:00:00 - 23:59:59'
                }"
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'下班时间'">
            <el-time-picker
              v-model="form.endTime"
              :picker-options="{
                  selectableRange: '00:00:00 - 23:59:59'
                }"
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'正班时长'">
            <el-input v-model="form.normalNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'加班时长'">
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
       <el-button type="primary" @click.native="saveData">保存</el-button>
     </div>
 </div>
</template>

<script>
import { getSalaryList } from "@/api/attendance/index"

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
        amId: null,
        overtimeNum: null,
        normalNum: null,
        startTime: null,
        endTime: null,
        annualLeaveDeduction: null,
        jobNum: null,
        totalTime: null,
        normalOverWTime: null,
        weekendOverWTime: null,
        statutoryOverWTime: null,
        useAnnualLeave: null,
        sickLeave: null,
        personalLeave: null,
        rest: null,
        bereavementLeave: null,
        maternityLeave: null,
        publicHoliday: null,
        weddingLeave: null,
        paternityLeave: null,
        breastfeedingLeave: null,
        workInjuryLeave: null,
        addRest: null,
        remainingRestOfLastMonth: null,
        restOfTheMonth: null,
        remainingAnnualLeaveLastMonth: null,
        annualLeaveRemainingThisMonth: null,
        mealSupplement: null,
        travelAllowance: null,
      },
      loading: false,
      obj: {},
      type: null,
    };
  },
 created() {
 },
 mounted() {
    console.log(this.listInfo)
    if (this.listInfo) {
      this.fetchData(this.listInfo);
    }
 },
 methods: {
   saveData() {
     this.$refs["form1"].validate((valid) => {
       //判断必填项
       if (valid) {
         shiftAdd(this.form).then(res => {
           this.$emit('hideDialog')
           this.$emit('uploadList')
         });
       }else {
         return false
       }
     })
   },
   fetchData(val) {
     getSalaryList(val).then(res => {
      console.log(res)
     });
   },
 }
};
</script>

<style>
</style>

<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'woId'" style="display: none">
            <el-input v-model="form.woId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" >
          <el-form-item :label="'上班时间'" prop="startTime">
            <el-time-picker
              arrow-control
              v-model="form.startTime"
              :picker-options="{
                selectableRange: '5:30:00 - 12:30:00'
               }"
              value-format="HH:mm:ss"
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" >
          <el-form-item :label="'下班时间'" prop="endTime">
            <el-time-picker
              arrow-control
              v-model="form.endTime"
              :picker-options="{
                selectableRange: '16:30:00 - 23:30:00'
              }"
              value-format="HH:mm:ss"
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'段内休息'" prop="roleName">
            <el-input v-model="form.roleName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" >
          <el-form-item :label="'出勤类型'" prop="roleName">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>-->
   </el-form>
   <div slot="footer" style="text-align:center;padding-top: 15px">
       <el-button type="primary" @click.native="confirm('form')">确认</el-button>
     </div>
 </div>
</template>

<script>
export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      form: {
        endTime: null,
        woId: null,
        startTime: null
      },
      rules: {
        endTime: [
          {required: true, message: '请选择日期', trigger: 'change'}
        ],
        startTime: [
          {required: true, message: '请选择日期', trigger: 'change'}
        ],
      },
    }
  },
  mounted() {
    if(this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    confirm(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          this.$emit('setTable', this.form)
          this.$emit('hideDialog', false)
        } else {
          return false
        }
      })
    }
  }
};
</script>



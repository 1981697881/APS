<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'soId'" style="display: none">
            <el-input v-model="form.soId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" >
          <el-form-item :label="'上班时间'" prop="roleName">
            <el-time-picker
              arrow-control
              v-model="value2"
              :picker-options="{
                selectableRange: '18:30:00 - 20:30:00'
               }"
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" >
          <el-form-item :label="'下班时间'" prop="roleName">
            <el-time-picker
              arrow-control
              v-model="value2"
              :picker-options="{
                selectableRange: '18:30:00 - 20:30:00'
              }"
              placeholder="任意时间点">
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
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
      </el-row>
   </el-form>
   <div slot="footer" style="text-align:center;padding-top: 15px">
       <el-button type="primary" @click.native="confirm('form')">确认</el-button>
     </div>
 </div>
</template>

<script>
import { notarizeList} from "@/api/aftermarket/index"

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
        factoryEstimatedDate: null,
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      value2: '',
      rules: {
        factoryEstimatedDate: [
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

<style>
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
     width: auto !important;
  }
</style>

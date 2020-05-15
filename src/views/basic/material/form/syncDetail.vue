<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'U9料号'" >
            <el-input v-model="form.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'品名'" >
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'组织编码'" >
            <el-input v-model="form.orgCode" readOnly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'色号'" >
            <el-input v-model="form.code1"></el-input>
          </el-form-item>
        </el-col>
       <!-- <el-col :span="12">
          <el-form-item :label="'参照料号2'" >
            <el-input v-model="form.code2"></el-input>
          </el-form-item>
        </el-col>-->
      </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'创建时间'">
              <el-date-picker
                v-model="value1"
                type="daterange"
                :picker-options="pickerOptions"
                range-separator="至"
                value-format="yyyy/MM/dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'修改时间'">
              <el-date-picker
                v-model="value2"
                type="daterange"
                :picker-options="pickerOptions"
                range-separator="至"
                value-format="yyyy/MM/dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')" v-loading.fullscreen.lock="fullscreenLoading">同步</el-button>
    </div>
  </div>
</template>

<script>
  import {syncMaterialInfo} from "@/api/basic/index";

  export default {
    data() {
      return {
        form: {
          code: '',
          code1: '', // 名称
          code2: '',
          createdOnEnd: '',
          createdOnStart: '',
          modifyOnEnd: '',
          modifyOnStart: '',
          name: '',
          orgCode: '901',
        },
        fullscreenLoading: false,
        value1: '',
        value2: '',
        rules: {
          goodCode: [
            {required: true, message: '请输入编码', trigger: 'blur'},
          ],
          roleLevel: [
            {required: true, message: '请选择等级', trigger: 'change'},
          ],
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      };
    },
    methods: {
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            this.fullscreenLoading = true
            this.form.createdOnEnd = null
            this.form.createdOnStart = null
            this.form.modifyOnEnd = null
            this.form.modifyOnStart = null
            if(this.value1 != null && this.value1 != '') {
              this.form.createdOnEnd = this.value1[1]
              this.form.createdOnStart = this.value1[0]
            }
            if(this.value2 != null && this.value2 != '') {
              this.form.modifyOnEnd = this.value2[1]
              this.form.modifyOnStart = this.value2[0]
            }
            syncMaterialInfo(this.form).then(res => {
              this.fullscreenLoading = false
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
          } else {
            return false;
          }
        })

      },
    }
  };
</script>

<style>
</style>

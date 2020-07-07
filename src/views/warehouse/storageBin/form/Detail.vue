<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'invId'" style="display: none">
            <el-input v-model="form.invId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12" :offset="7">
          <el-form-item :label="'备注'">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="saveData('form')" v-loading.fullscreen.lock="fullscreenLoading">修改</el-button>
      </div>
  </div>
</template>

<script>
import {alterInventory} from "@/api/basic/index";
export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        invId: null,
        remark: '',
      },
      fullscreenLoading: false,
      rules: {
        remark: [
          {required: true, message: '请输入备注', trigger: 'blur'},
        ],
      },
    };
  },
  created() {

  },
  mounted() {
    if(this.listInfo){
      this.form.invId = this.listInfo.invId
      this.form.remark = this.listInfo.remark
    }
  },
  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          this.fullscreenLoading = true
          alterInventory(this.form).then(res => {
            this.fullscreenLoading = false
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          });
        }else {
          return false;
        }
      })
    },
  }
};
</script>

<style>
</style>

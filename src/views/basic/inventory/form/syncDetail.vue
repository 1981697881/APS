<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'仓库编码'" >
            <el-input v-model="form.whCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'仓库名称'" >
            <el-input v-model="form.whName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'库位编码'" >
            <el-input v-model="form.binCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'库位名称'" >
            <el-input v-model="form.binName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'物料编码'" >
            <el-input v-model="form.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'物料名称'" >
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'组织编码'" >
            <el-input v-model="form.orgCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'批号'" >
            <el-input v-model="form.lotNo"></el-input>
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
  import {syncInventory} from "@/api/basic/index";

  export default {
    data() {
      return {
        form: {
          binCode: '', // 名称
          binName: '',
          code: '',
          lotNo: '',
          name: '',
          orgCode: '',
          whCode: '',
          whName: '',
        },
        fullscreenLoading: false,
        rules: {
          goodCode: [
            {required: true, message: '请输入编码', trigger: 'blur'},
          ],
          goodName: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
          roleLevel: [
            {required: true, message: '请选择等级', trigger: 'change'},
          ],
        },
      };
    },
    created() {

    },
    mounted() {
      //this.fetchFormat();
    },
    methods: {
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            this.fullscreenLoading = true
            syncInventory(this.form).then(res => {
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

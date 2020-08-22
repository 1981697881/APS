<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="110px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'名称'" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'编码'" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'内容'" prop="remark">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="saveData('form')">保存</el-button>
      </div>
  </div>
</template>

<script>
import {alterDict} from "@/api/system/index";

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
        name: null, // 名称
        code: null,
        remark: null,
      },
      aArray: [],
        rules: {
          name: [
                {required: true, message: '请输入', trigger: 'blur'},
            ],
          code: [
                {required: true, message: '请选择', trigger: 'blur'},
            ],
          remark: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
        },
    };
  },
  created() {

  },
  mounted() {
    if(this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    saveData(form) {
        this.$refs[form].validate((valid) => {
            //判断必填项
            if (valid) {
              alterDict(this.form).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
            }else{
                return false;
            }
        })
    },
  }
};
</script>

<style>
</style>

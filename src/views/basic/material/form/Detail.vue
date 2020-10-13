<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'gid'" style="display: none">
            <el-input v-model="form.gid"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'最高库存'" prop="max_stock">
            <el-input-number v-model="form.maxStock"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'最低库存'" prop="min_stock">
            <el-input-number v-model="form.minStock" :max="form.maxStock"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row> <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'商品分类'" >
            <el-input v-model="form.productType"></el-input>
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
import {materialAlter} from "@/api/basic/index";

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
        gid: null,
        maxStock: null, // 名称
        minStock: null,
        productType: null,
      },
      rules: {
        maxStock: [
          { required: true, message: '请输入最高库存', trigger: 'blur' },
        ],
        minStock: [
          { required: true, message: '请输入最低库存', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.form.gid = this.listInfo.gid
    this.form.productType = this.listInfo.productType
    this.form.maxStock = (this.listInfo.maxStock == null ? 0 : this.listInfo.maxStock)
    this.form.minStock = (this.listInfo.minStock == null ? 0 : this.listInfo.minStock)
  },
  mounted() {
  },
  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        //判断必填项
        if (valid) {
          materialAlter(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          })
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

<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="110px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'priId'" style="display: none">
            <el-input v-model="form.trId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'规格名称'" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'类型'" prop="tpId">
            <el-select v-model="form.tpId" class="width-full"  placeholder="请选择">
              <el-option :label="t.tpName" :value="t.tpId" v-for="(t,i) in aArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'包含料号'" >
            <el-input v-model="form.includeCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'包含旧料号'" >
            <el-input v-model="form.includeOldCode"></el-input>
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
import {addReportRules, updateReportRules, getResourcesList} from "@/api/basic/index";

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
        priId: null,
        name: null, // 名称
        includeCode: null,
        includeOldCode: null,
        tpId: null,
      },
      aArray: [],
        rules: {
          name: [
                {required: true, message: '请输入', trigger: 'blur'},
            ],
          tpId: [
                {required: true, message: '请选择', trigger: 'change'},
            ],
          includeCode: [
            {required: true, message: '请输入', trigger: 'blur'},
          ], includeOldCode: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
        },
    };
  },
  created() {

  },
  mounted() {
    this.fetchType()
    if(this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    fetchType() {
      const data = {
        pageNum: 1,
        pageSize: 1000
      };
      getResourcesList(data, { tpCategory: '报表类别'}).then(res => {
        if(res.flag) {
          this.aArray = res.data.records
        }
      })
    },
    saveData(form) {
        this.$refs[form].validate((valid) => {
            //判断必填项
            if (valid) {
              if (typeof (this.form.priId) != undefined && this.form.priId != null) {
                updateReportRules(this.form).then(res => {
                  this.$emit('hideDialog', false)
                  this.$emit('uploadList')
                });
              } else {
                addReportRules(this.form).then(res => {
                  this.$emit('hideDialog', false)
                  this.$emit('uploadList')
                });
              }
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

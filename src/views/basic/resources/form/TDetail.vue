<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'tpId'" style="display: none">
            <el-input v-model="form.tpId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="14" style="margin-left: 16%">
          <el-form-item :label="'名称'" prop="tpName">
            <el-input v-model="form.tpName" ></el-input>
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
  import{ resourcesAdd, resourcesAlter } from "@/api/basic/index"

  export default {
    props: {
      gpInfo: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        form: {
          tpId: null,
          tpName: null, // 名称
          tpCategory: '产线'
        },
        rules: {
          tpName: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
        },
      };
    },
    created() {
      if (this.gpInfo) this.form = this.gpInfo
    },
    mounted() {

    },
    methods: {
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            if (typeof (this.form.tpId) != undefined && this.form.tpId != null) {
              resourcesAlter(this.form).then(res => {
                this.$emit('hideGroupDialog', false)
                this.$emit('uploadGroup')
              });
            } else {
              resourcesAdd(this.form).then(res => {
                this.$emit('hideGroupDialog', false)
                this.$emit('uploadGroup')
              });
            }
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

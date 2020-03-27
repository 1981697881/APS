<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'trId'" style="display: none">
            <el-input v-model="form.trId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'规格名称'" prop="trName">
            <el-input v-model="form.trName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'匹配的编码'" prop="matchCode">
            <el-input v-model="form.matchCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'包含名字'" >
            <el-input v-model="form.include"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'不包含名字'" >
            <el-input v-model="form.exclude"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <!--<el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'数量大于'" >
              <el-input-number :min="1" v-model="form.numGe"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'数量小于'" >
              <el-input-number :min="1" v-model="form.numLe"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>-->
    </el-form>
    <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="saveData('form')">保存</el-button>
      </div>
  </div>
</template>

<script>
import {regulationAdd, regulationAlter} from "@/api/basic/index";

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
        trId: null,
        trName: null, // 名称
        exclude: null,
        include: null,
        matchCode: null,
      /*  numGe: null,
        numLe: null,*/
      },
        rules: {
          trName: [
                {required: true, message: '请输入编码', trigger: 'blur'},
            ],
          matchCode: [
            {required: true, message: '请输入编码', trigger: 'blur'},
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
              if (typeof (this.form.trId) != undefined && this.form.trId != null) {
                regulationAlter(this.form).then(res => {
                  this.$emit('hideDialog', false)
                  this.$emit('uploadList')
                });
              } else {
                regulationAdd(this.form).then(res => {
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

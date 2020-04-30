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
          <el-form-item :label="'编码'" prop="goodCode">
            <el-input v-model="form.goodCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'名称'" prop="goodName">
            <el-input v-model="form.goodName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'规格'" prop="roleName">
            <el-input v-model="form.roleName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'旧料号'" prop="roleName">
            <el-input v-model="form.roleName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'物料类别'" >
            <el-select v-model="form.roleLevel" class="width-full" placeholder="请选择用户权限">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'计量单位'" >
            <el-select v-model="form.pidS" multiple  placeholder="请选择">
              <el-option
                v-for="(t,i) in pArray"
                :key="i"
                :label="t.permissionName"
                :value="t.pid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'安全数量'" prop="roleName">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'旧料号'" prop="oldCode">
              <el-input v-model="form.oldCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
  props: {
    gid: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: {
          gid: null,
        goodCode: null, // 名称
        goodName:null,
        oldCode:null,
      },
        pidS:[],
      fullscreenLoading: false,
        pArray:[],
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
      levelFormat: [[1,'一级'],[2,'二级']]
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

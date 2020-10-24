<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'用户编码'" prop="jobNum">
            <el-input v-model="form.jobNum" readOnly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'登录账号'" prop="username">
            <el-input v-model="form.username" :readOnly="visible"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'对应职员'" prop="eid">
            <el-select v-model="form.eid" filterable  class="width-full" placeholder="请选择职员" @change="changeCheck">
              <el-option :label="t.name" :value="t.eid" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'说明'" >
            <el-input v-model="form.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'超级管理员'" >
            <el-switch
              v-model="value"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>
  import {addUsers, alterUsers, getUsersInfo, getMenuList} from "@/api/system/index"
  import { getClerkList } from "@/api/basic/index"
  export default {
    props: {
      listInfo: {
        type: Object,
        default: null
      },
      //是否自适应宽度，不自适应宽度默认为120px
      selfAdaption: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        data: [],
        value: false,
        form: {
          username: null, // 名称
          eid: null,
          jobNum: null,
          description: null
        },
        columns: [
          {text: "用户组", name: "gpName"},
          {text: "gpLevel", name: "gpLevel", default:false},
          {text: "isDel", name: "isDel", default:false},
          {text:'gpId', name:'gpId', default:false}
        ],
        activeName: 'first',
        pidS: [],
        list: [],
        visible: false,
        rules: {
          username: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
          jobNum: [
            {required: true, message: '请输入编码', trigger: 'blur'},
          ],
          eid: [
            {required: true, message: '请选择职员', trigger: 'change'},
          ],

        },
        levelFormat: []
      };
    },
    created() {

    },
    mounted() {
      this.fetchFormat()
      this.fetchMenu()
    },
    methods: {
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            let obj = this.form
            let mids = []
            let gids = []
            this.multipleSelection.forEach(function(item, index) {
              gids.push(item.gpId)
            })
            obj.gids = gids
            obj.mids = this.getChecked()
            if (typeof (this.form.uid) != undefined && this.form.uid != null) {
              alterUsers(obj).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
            } else {
              addUsers(obj).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
            }
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

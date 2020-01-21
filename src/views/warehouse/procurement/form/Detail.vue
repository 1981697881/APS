<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form"  :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'rid'" style="display: none">
            <el-input v-model="form.rid"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'日期'" prop="roleName">
            <el-input v-model="form.roleName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'入库单号'" prop="roleName">
            <el-input v-model="form.roleName"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'供应商'" prop="roleLevel">
            <el-select v-model="form.roleLevel" class="width-full" placeholder="请选择供应商">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'供应商'" prop="roleLevel">
            <el-select v-model="form.roleLevel" class="width-full" placeholder="请选择供应商">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'旧料号'" prop="roleName">
              <el-table :data="list" border height="250px" stripe size="mini" :highlight-current-row="true" >
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column
                  v-for="(t,i) in columns"
                  :key="i"
                  align="center"
                  :prop="t.name"
                  :label="t.text"
                  :width="t.width?t.width:(selfAdaption?'':'120px')"
                  v-if="t.default!=undefined?t.default:true"
                ></el-table-column>
              </el-table>
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
import {materialAdd,getMaterialInfo,getMType,getUnit} from "@/api/basic/index";

export default {
  props: {
      rid: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: {
          rid: null,
          roleName: null, // 名称
          roleLevel:null,
      },
        pidS:[],
        pArray:[],
        columns: [
            { text: "物料编码", name: "" },
            { text: "物料名称", name: "" },
            { text: "色号", name: "" },
            { text: "旧料号", name: "" },
            { text: "仓库", name: "" },
            { text: "仓位", name: "" },
            { text: "入库数量", name: "" },
            { text: "批号", name: "" },
        ],
        rules: {
            roleName: [
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
      this.form.rid=this.rid
  },
  mounted() {
      this.fetchFormat();
    if (this.form.rid) {
      this.fetchData(this.form.rid);
    }
  },
  methods: {
    saveData(form) {
        this.$refs[form].validate((valid) => {
            //判断必填项
            if (valid) {
                if (typeof (this.form.rid) != undefined && this.form.rid != null) {
                    updateRoles(this.form).then(res => {
                        this.$emit('hideDialog', false)
                        this.$emit('uploadList')
                    });
                }else{
                    materialAdd(this.form).then(res => {
                        this.$emit('hideDialog', false)
                        this.$emit('uploadList')
                    });
                }


            }else {
                return false;
            }
        })

    },
      //初始化下拉
      fetchFormat() {
          getMType().then(res => {
              this.pArray = res.data;
          });
          getUnit().then(res => {
              this.pArray = res.data;
          });
      },
    fetchData(val) {
        getMaterialInfo(val).then(res => {
        this.form = res.data;
      });
    }
  }
};
</script>

<style>
</style>

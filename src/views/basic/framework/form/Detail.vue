<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'deptId'" style="display: none">
            <el-input v-model="form.deptId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'编码'" prop="deptCode">
            <el-input v-model="form.deptCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'名称'" prop="deptName">
            <el-input v-model="form.deptName"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="20">

        <el-col :span="12">
          <el-form-item :label="'上级组织'" >
            <el-select v-model="form.deptParent"   placeholder="请选择">
              <el-option
                v-for="(t,i) in pArray"
                :key="i"
                :label="t.deptName"
                :value="t.deptId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'组织属性'" prop="orgAttr">
            <el-select v-model="form.orgAttr" class="width-full" placeholder="请选择">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
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
import {FrameAdd,FrameAlter,getFrameList} from "@/api/basic/index";

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
        deptId: null,
        deptCode: null, // 名称
        deptName: null,
        orgAttr: null,
      },
        pidS:[],
        pArray:[],
        rules: {
          deptCode: [
                {required: true, message: '请输入编码', trigger: 'blur'}
            ],
          deptName: [
            {required: true, message: '请输入名稱', trigger: 'blur'}
          ],
          orgAttr: [
                {required: true, message: '请选择', trigger: 'change'},
            ],

        },
      levelFormat: [['集团','集团'], ['公司','公司'], ['部门','部门']]
    };
  },
  created() {

  },
  mounted() {
      this.fetchFormat();
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    saveData(form) {
        this.$refs[form].validate((valid) => {
            //判断必填项
            if (valid) {
                //修改
                if (typeof (this.form.deptId) != undefined && this.form.deptId != null) {
                  FrameAlter(this.form).then(res => {
                        this.$emit('hideDialog', false)
                        this.$emit('uploadList')
                    });
                    //保存
                }else{
                    FrameAdd(this.form).then(res => {
                        this.$emit('hideDialog', false)
                        this.$emit('uploadList')
                    });
                }
            }else {
                return false;
            }
        })

    },
      fetchFormat() {
        const data = {
          pageNum: 1,
          pageSize: 1000,
        }
        //获取上级下拉
        getFrameList(data, { disable: false }).then(res => {
          console.log(res)
              this.pArray = res.data.records;
          });
      },
  }
};
</script>

<style>
</style>

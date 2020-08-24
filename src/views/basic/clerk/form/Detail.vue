<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'eid'" style="display: none">
            <el-input v-model="form.eid"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'编码'" prop="jobNum">
            <el-input v-model="form.jobNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'名称'" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'部门'" prop="deptIds">
            <el-select v-model="form.deptIds" multiple class="width-full"  placeholder="请选择用户权限">
              <el-option :label="t.deptName" :value="t.deptId" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'联系地址'" >
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'联系电话'" >
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'描述'" >
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'生产线'">
            <el-select v-model="form.tpId" class="width-full" placeholder="生产线" @change="selectChange">
              <el-option :label="t.tpName" :value="t.tpId" v-for="(t,i) in aArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'生产设备'">
            <el-select v-model="form.plId" class="width-full" placeholder="生产设备" :disabled="disPl">
              <el-option :label="t.plName" :value="t.plId" v-for="(t,i) in rArray"  :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'员工性质'" >
            <el-radio-group v-model="form.nature">
              <el-radio :label="1">办公室</el-radio>
              <el-radio :label="2">一线</el-radio>
              <el-radio :label="3">其他</el-radio>
            </el-radio-group>
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
import {addClerk, alterClerk, clerkInfo,getFrameList, getResourcesList, productionLineList} from "@/api/basic/index";
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
        eid: null,
        jobNum: null,
        address: null,
        nature: 3,
        tel: null,
        tpId: null,
        plId: null,
        deptIds: [],
        remark: null,
        name: null,// 名称
      },
      disPl: true,
      pidS: [],
      pArray: [],
      rArray: [],
      aArray: [],
      rules: {
        jobNum: [
          {required: true, message: '请输入编码', trigger: 'blur'},
        ],
        name: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
        deptId: [
          {type: 'array', required: true, message: '请选择部门', trigger: 'change'},
        ], tpId: [
          {required: true, message: '请选择产线', trigger: 'change'},
        ], plId: [
          {required: true, message: '请选择设备', trigger: 'change'},
        ],
      },
    };
  },
  mounted() {
    this.fetchFormat()
    this.fetchType()
    if (this.listInfo) {
      this.fetchLine(this.listInfo.tpId)
      this.form = this.listInfo

    }
  },
  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          if (typeof (this.form.eid) != undefined && this.form.eid != null) {
            alterClerk(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          }else{
            addClerk(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          }
        } else {
          return false;
        }
      })
    },
    // 切换类别
    selectChange(val) {
      this.disPl = false
      this.form.plId = null
      this.rArray = []
      this.fetchLine(val)

    },
    fetchType() {
      const data = {
        pageNum: 1,
        pageSize: 1000
      };
      getResourcesList(data).then(res => {
        if(res.flag) {
          this.aArray = res.data.records
        }
      })
    },
    fetchLine(val) {
      const data = {
        pageNum: 1,
        pageSize: 1000
      };
      productionLineList(data, { tpId: val }).then(res => {
        if(res.flag) {
          this.rArray = res.data.records
        }
      })
    },
    fetchFormat() {
      const data = {
        pageNum: 1,
        pageSize: 50
      };
      getFrameList(data).then(res => {
        this.pArray = res.data.records
      });
      },
    fetchData(val) {
      clerkInfo(val).then(res => {
        this.form = res.data;
      });
    }
  }
};
</script>

<style>
</style>

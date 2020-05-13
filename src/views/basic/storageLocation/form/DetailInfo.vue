<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form">
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="12">
          <el-form-item :label="'仓库'" prop="worn">
            <el-select v-model="form.worn" class="width-full" placeholder="仓库" @change="selectChange">
              <el-option :label="t.positionName" :value="t.piId" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'区域'" prop="parent">
            <el-select v-model="form.parent" class="width-full" placeholder="区域" :disabled="disPl">
              <el-option :label="t.positionName" :value="t.piId" v-for="(t,i) in rArray"  :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="12">
          <el-form-item :label="'编码'" prop="piCode">
            <el-input v-model="form.piCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'名称'" prop="piName">
            <el-input v-model="form.piName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="24">
          <el-form-item :label="'描述'" >
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {getWarehouseList, warehouseAdd, warehouseAlter} from "@/api/basic/index";

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
          piName: null, // 名称
          piCode: null,
          piId: null,
          parent: null,
          worn: null,
          remark: null,
          type: 3,
        },
        pArray: [],
        rArray: [],
        disPl: true,
        rules: {
          piCode: [
            {required: true, message: '请输入编码', trigger: 'blur'},
          ],
          piName: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
          worn: [
            {required: true, message: '请选择仓库', trigger: 'change'},
          ],
          parent: [
            {required: true, message: '请输入区域', trigger: 'change'},
          ],
        },
      };
    },
    created() {

    },
    mounted() {
      this.fetchWare(-1)
      if(this.listInfo) {
        this.form = this.listInfo
        this.disPl = false
        this.fetchLine(this.form.worn)
      }
    },
    methods: {
      // 切换类别
      selectChange(val) {
        this.disPl = false
        this.rArray = []
        this.fetchLine(val)
      },
      fetchWare(val) {
        getWarehouseList(val).then(res => {
          if(res.flag) {
            this.pArray = res.data
          }
        })
      },
      fetchLine(val) {
        getWarehouseList(val).then(res => {
          if(res.flag) {
            this.rArray = res.data
          }
        })
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            // 修改
            if (typeof (this.form.piId) != undefined && this.form.piId != null) {
              warehouseAlter(this.form).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
              // 保存
            }else{
              warehouseAdd(this.form).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
            }
          }else {
            return false
          }
        })
      },

    }
  };
</script>



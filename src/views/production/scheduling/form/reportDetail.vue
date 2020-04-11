<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="120px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'taskId'" style="display: none">
            <el-input v-model="form.oid"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'排产单号'">
            <el-input v-model="form.taskNum" readOnly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'生产线'" >
            <el-select v-model="form.plId" class="width-full" placeholder="生产线"  disabled >
              <el-option :label="t.plName" :value="t.plId" v-for="(t,i) in rArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'品名'" >
            <el-input v-model="form.goodName" readOnly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'色号'" >
            <el-input v-model="form.oldCode" readOnly="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'计划生产数量'" >
            <el-input-number v-model="form.allocatedNum"  :min="0"  disabled></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'实际完工数量'" prop="productionQuantity">
            <el-input-number v-model="form.productionQuantity"  :min="0" ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <!--<el-col :span="12">
          <el-form-item :label="'生产批号'" prop="allocatedNum">
            <el-input v-model="form.allocatedNum"  ></el-input>
          </el-form-item>
        </el-col>-->
        <el-col :span="12">
          <el-form-item :label="'生产日期'" prop="productionDate">
            <div class="block" >
              <el-date-picker
                disabled
                v-model="form.productionDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'汇报人'" >
            <el-input v-model="reporter" readOnly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'汇报日期'" prop="reportDate">
            <div class="block" >
              <el-date-picker
                v-model="form.reportDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="条码打印"
      v-if="visible"
      :width="'30%'"
      destroy-on-close
      append-to-body
    >
      <el-form>
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="12">
            <el-form-item :label="'打印/张'">
              <el-input v-model="num1" label="请输入数量"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'每托/桶或箱'">
              <el-input v-model="num1"  label="请输入数量"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="24">
            <el-form-item :label="'重复打印第几张'">
              <el-input v-model="num1"  label="请输入数量"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click.native="confirmPrint">打印</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click.native="saveData('form')">提交</el-button>
      <el-button type="primary" @click.native="print">打印条码</el-button>
    </div>
  </div>
</template>
<script>
  import { updateProductNum } from "@/api/production/index";
  import { getFinalGoods, getSemiFinishedProducts} from '@/api/basic/index'
  import {getToken} from '@/utils/auth' // get token from cookie
  import { PrintTwo } from '@/tools/doPrint'
  export default {
    props: {
      listInfo: {
        type: Object,
        default: null
      },
    },
    data() {
      return {
        num1: 1,
        visible: null,
        form: {
          taskId: null,
          goodName: null,
          oldCode: null,
          plId: null,
          taskNum: null,
          soNum: null,
          reportDate: null,
          odPrNum: null,
        },
        getTime: function() {
          var _this = this;
          let yy = new Date().getFullYear();
          let mm = new Date().getMonth() + 1;
          let dd = new Date().getDate();
          let hh = new Date().getHours();
          let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
          let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
          _this.form.reportDate = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
        },
        reporter: getToken('apsun'),
        rules: {
          productionQuantity: [
            {required: true, message: '请输入数量', trigger: 'blur'}
          ],
          reportDate: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          allocatedNum: [
            {required: true, message: '请选择批号', trigger: 'blur'}
          ],
        },
        value: null,
        loading: false,
        list: [],
        rArray: [],
        type: null,
      }
    },
    created() {
    },
    mounted() {
      this.fetchLine(this.listInfo.isF)
      if (this.listInfo) {
        this.form = this.listInfo
        this.form.plId = Number(this.listInfo.plId)
        if(this.listInfo.isF == 0){
          this.form.oldCode = this.listInfo.color
        }
        this.getTime()
      }
    },
    methods: {
      print() {
        this.visible = true
      },
      confirmPrint(){
        PrintTwo(
          '商品包装码',
          '3'
        )
        LODOP.PREVIEW()
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
              updateProductNum(this.form).then(res => {
                this.$emit('hideReport', false)
                this.$emit('uploadList')
              });
          } else {
            return false
          }
        })
      },
      fetchLine(val) {
        this.rArray = []
        console.log(val == 1)
        if(val == 0){
          getFinalGoods().then(res => {
            this.rArray = res.data
          })
        } else {
          getSemiFinishedProducts().then(res => {
            this.rArray = res.data
          })
        }
      },
    }
  };
</script>

<style>
</style>

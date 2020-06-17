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
          <el-form-item :label="'旧料号'" >
            <el-input v-model="form.oldCode" readOnly="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'生产线'" prop="tpId">
            <el-select v-model="form.tpId" class="width-full" placeholder="生产线" disabled>
              <el-option :label="t.tpName" :value="t.tpId" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'生产设备'" prop="plId">
            <el-select v-model="form.plId" class="width-full" placeholder="生产设备" disabled>
              <el-option :label="t.plName" :value="t.plId" v-for="(t,i) in rArray"  :key="i"></el-option>
            </el-select>
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
        <el-col :span="12">
          <el-form-item :label="'品名'" >
            <el-input v-model="form.goodName" readOnly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'报工入库数量'" prop="estimatedStorage">
            <el-input-number v-model="form.estimatedStorage"  :min="0" ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'生产批号'" prop="lotNo">
            <el-input v-model="form.lotNo"  ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'生产日期'" prop="productionDate">
            <div class="block" >
              <el-date-picker
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
                disabled
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
      v-dialogDrag
      :width="'30%'"
      destroy-on-close
      append-to-body
    >
      <el-form :rules="rules">
        <el-row :gutter="20" type="flex" justify="center">
          <!--<el-col :span="12">
            <el-form-item :label="'每托/桶或箱'">
              <el-input-number v-model="apiece"  label="请输入数量" :min="0"></el-input-number>
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item :label="'打印/张'">
              <el-input-number v-model="printingQuantity" label="请输入数量" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'打印模板'">
              <el-select v-model="printModel" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row :gutter="20" type="flex" justify="center">
          <el-col :span="12">
            <el-form-item :label="'打印批号'">
              &lt;!&ndash;<el-input-number v-model="repeat"  label="请输入数量" :min="0"></el-input-number>&ndash;&gt;
                <el-input v-model="lotNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click.native="confirmPrint">打印</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="success" v-if="isOver" @click.native="saveData('form')">提交</el-button>
      <el-button type="primary" @click.native="saveLotNo('form')">保存</el-button>
      <el-button type="primary" @click.native="print('form')">打印条码</el-button>
    </div>
  </div>
</template>
<script>
  import { updateProductNum, updateLotNo, schedulingPrint } from '@/api/production/index'
  import { getMcjSemiSchedulingType, getMcjSemiFinishedProducts } from '@/api/basic/index'
  import { getToken } from '@/utils/auth' // get token from cookie
  import { PrintTwo4} from '@/tools/doPrint'
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
        isSavtBtn: true,
        isOver: false,
        form: {
          taskId: null,
          goodName: null,
          oldCode: null,
          plId: null,
          tpId: null,
          lotNo: null,
          taskNum: null,
          soNum: null,
          estimatedStorage: null,
          reportDate: null,
          odPrNum: null,
        },
        lotNo: null,
        repeat: 0,
        printingQuantity: 1,
        apiece: 0,
        options: [],
        printModel: null,
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
          printModel: [
            {required: true, message: '请选择模板', trigger: 'change'}
          ],
          lotNo: [
            {required: true, message: '请选择批号', trigger: 'blur'}
          ],
        },
        value: null,
        loading: false,
        list: [],
        rArray: [],
        pArray: [],
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
        this.form.tpId = Number(this.listInfo.tpId)
        if(this.listInfo.isF == 0){
          this.form.oldCode = this.listInfo.color
        }
        if(this.listInfo.isOver == 1){
          this.isOver = false
        }else{
          this.isOver = true
        }
        this.getTime()
      }
    },
    methods: {
      print() {
        this.lotNo = this.form.lotNo
        this.visible = true
       /* // 判断必填项
        if (this.lotNo != null && this.lotNo != undefined) {
          this.visible = true
        } else {
          this.$message({
            message: "请填写批号",
            type: "warning"
          })
        }*/
      },
      confirmPrint() {
        if(this.printModel != null && this.lotNo != null) {
          if(this.listInfo.lotNo != null && this.listInfo.lotNo != '') {
            // data: 数据
            // printingQuantity: 打印品种
            // apiece: 打印
            // repeat: 重复打印第几张
            // printModel: 打印模板
            schedulingPrint({barcodeList:[{printId: this.form.taskId,
                printNum: this.printingQuantity,
                type: 2}]}).then(res => {
              if(res.flag) {
                var obj = res.data
                Object.assign(this.form, obj[0]);
                PrintTwo4(obj, this.printingQuantity, this.apiece, this.repeat, this.printModel)
                LODOP.PREVIEW()
              }
            })
          }else{
            updateLotNo({taskId: this.form.taskId, lotNo: this.lotNo}).then(reso => {
              if(reso.flag) {
                this.form.lotNo = this.lotNo
                // data: 数据
                // printingQuantity: 打印品种
                // apiece: 打印
                // repeat: 重复打印第几张
                // printModel: 打印模板
                schedulingPrint({barcodeList:[{printId: this.form.taskId,
                    printNum: this.printingQuantity,
                    type: 2}]}).then(res => {
                  if(res.flag) {
                    var obj = res.data
                    Object.assign(this.form, obj[0]);
                    PrintTwo4(obj, this.printingQuantity, this.apiece, this.repeat, this.printModel)
                    LODOP.PREVIEW()
                  }
                })
              }
            })
          }
          this.$emit('uploadList')
          this.$emit('hideReport', false)
        }else{
          this.$message({
            message: "模板和批号必填",
            type: "warning"
          })
        }
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            if(this.form.estimatedStorage <= this.form.productionQuantity){
              updateProductNum(this.form).then(res => {
                if(res.flag) {
                  this.isSavtBtn = false
                  this.$emit('uploadList')
                  this.$emit('hideReport', false)
                }
              })
            } else {
              this.$message({
                message: "入库数量不能大于完工数量",
                type: "warning"
              })
            }
          } else {
            return false
          }
        })
      },
      saveLotNo(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            updateLotNo({taskId: this.form.taskId, lotNo: this.form.lotNo, productionDate: this.form.productionDate}).then(res => {
              if(res.flag) {
                this.$emit('uploadList')
              }
            })
          } else {
            return false
          }
        })
      },
      fetchLine(val) {
        this.rArray = []
          this.options = [{
            value: '4',
            label: '美瓷胶标签'
          }]
        getMcjSemiSchedulingType().then(res => {
            this.pArray = res.data
            if(res.flag){
              getMcjSemiFinishedProducts(this.form.tpId).then(res2 => {
                if(res2.flag) {
                  this.rArray = res2.data
                }
              })
            }
          })
      },
    }
  };
</script>

<style>
</style>

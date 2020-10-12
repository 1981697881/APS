<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="120px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'taskId'" style="display: none">
            <el-input v-model="form.taskId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'soId'" style="display: none">
            <el-input v-model="form.soId"></el-input>
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
          <el-form-item :label="'色号/旧料号'" prop="oldCode">
            <el-input v-model="form.oldCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'生产线'" prop="tpId">
            <el-select v-model="form.tpId" class="width-full" placeholder="生产线" @change="selectChange">
              <el-option :label="t.tpName" :value="t.tpId" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'生产设备'" prop="plId">
            <el-select v-model="form.plId" class="width-full" placeholder="生产设备" :disabled="disPl">
              <el-option :label="t.plName" :value="t.plId" v-for="(t,i) in rArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'计划数量'" prop="allocatedNum">
            <el-input-number v-model="form.allocatedNum"  :min="0" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'计划日期'" prop="productionDate">
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
          <el-form-item :label="'备注'">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'任务警示'">
            <el-radio-group v-model="form.alertStatus">
              <el-radio :label=0 >正常</el-radio>
              <el-radio :label=3 style="color:#7b1424">加急</el-radio>
              <el-radio :label=4 style="color:#3b199a">暂停</el-radio>
              <!--<el-radio :label=1 style="color:#dc9118" disabled>延误</el-radio>-->
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click.native="saveData('form')">确定</el-button>
    </div>
  </div>
</template>

<script>
  import { schedulingSave, schedulingAlter } from "@/api/production/index";
  import { getSemiFinishedProductsType, getSemiFinishedProducts} from '@/api/basic/index'
  export default {
    props: {
      listInfo: {
        type: Object,
        default: null
      },
    },
    data() {
      return {
        radio: null,
        num1: 1,
        visible: false,
        form: {
          taskId: null,
          tips: null,
          isSemi: 1,
          oldCode: null,
          alertStatus: null,
          plId: null,
          tpId: null,
          taskNum: null,
          allocatedNum: null,
          remark: null,
          productionType: null,
          productionDate: null
        },
        disPl: true,
        rules: {
          oldCode: [
            {required: true, message: '请输入色号/旧料号', trigger: 'blur'},
          ],
          allocatedNum: [
            {required: true, message: '请输入数量', trigger: 'blur'},
          ],
          plId: [
            {required: true, message: '请选择产线', trigger: 'change'},
          ],
          tpId: [
            {required: true, message: '请选择产线', trigger: 'change'},
          ],
          productionDate: [
            {required: true, message: '请选择日期', trigger: 'change'},
          ],
          productionType: [
            {required: true, message: '请选择类别', trigger: 'change'},
          ],
        },
        value: null,
        loading: false,
        list: [],
        rArray: [],
        pArray: [],
        type: null,
        columns: null
      }
    },
    created() {
    },
    mounted() {
      this.fetchFormat()
      if (this.listInfo) {
        console.log(this.listInfo)
        if(this.listInfo.flag) {
          this.fetchLine(this.listInfo.tpId)
          this.form.alertStatus = Number(this.listInfo.alertStatus)
          this.form.tpId = Number(this.listInfo.tpId)
          this.disPl = false
        } else {
          this.form = this.listInfo
          this.fetchLine(this.form.tpId)
          this.form.alertStatus = Number(this.listInfo.alertStatus)
          this.form.plId = Number(this.listInfo.plId)
          this.form.tpId = Number(this.listInfo.tpId)
          this.disPl = false
        }
      }
      this.form.interfaceType = '主业半成品线计划'
    },
    methods: {
      // 切换类别
      selectChange(val) {
        this.disPl = false
        this.form.plId = null
        this.rArray = []
        this.fetchLine(val)
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            if (typeof (this.form.taskId) != undefined && this.form.taskId != null) {
              schedulingAlter(this.form).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
            } else {
              schedulingSave(this.form).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
            }
          } else {
            return false
          }
        })
      },
      fetchFormat() {
        getSemiFinishedProductsType().then(res => {
          if(res.flag) {
            this.pArray = res.data
          }
        })
      },
      fetchLine(val) {
        getSemiFinishedProducts(val).then(res => {
          if(res.flag) {
            this.rArray = res.data
          }
        })
      },
    }
  };
</script>

<style>
</style>

<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="90px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'排产单号'">
            <el-input v-model="form.taskNum" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'色号'" >
            <el-input v-model="form.oldCode" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'排产数量'" >
            <el-input v-model="form.allocatedNum" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'生产日期'" >
            <el-input v-model="form.rProductionDate" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'现生产线'" >
            <el-select v-model="form.rTpId" class="width-full" placeholder="生产线" disabled>
              <el-option :label="t.tpName" :value="t.tpId" v-for="(t,i) in pArray" :key="i" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'现生产设备'" >
            <el-select v-model="form.rPlId" class="width-full" placeholder="生产设备" disabled>
              <el-option :label="t.plName" :value="t.plId" v-for="(t,i) in rArray"  :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'是否超产'" >
            <el-switch
              v-model="form.isOutbreed"
              active-value="1"
              inactive-value="0"
            >
            </el-switch>
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
          <el-form-item :label="'生产线'" prop="tpId">
            <el-select v-model="form.tpId" class="width-full" placeholder="生产线" @change="selectChange">
              <el-option :label="t.tpName" :value="t.tpId" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'生产设备'" prop="plId">
            <el-select v-model="form.plId" class="width-full" placeholder="生产设备" :disabled="disPl">
              <el-option :label="t.plName" :value="t.plId" v-for="(t,i) in sArray"  :key="i"></el-option>
            </el-select>
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
  import { moveBill } from "@/api/production/index"
  import { getFinalGoodsTypeT, getFinalGoodsT} from '@/api/basic/index'
  export default {
    props: {
      listInfo: {
        type: Object,
        default: null
      },
      // 是否自适应宽度，不自适应宽度默认为120px
      selfAdaption: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        data: [],
        disPl: false,
        value: false,
        form: {
          taskNum: null,
          oldCode: null,
          allocatedNum: null,
          rTpId: null,
          rPlId: null,
          rProductionDate: null,
          tpId: null,
          plId: null,
          productionDate: null,
          isOutbreed: '0',
          taskId: null
        },
        pArray: [],
        rArray: [],
        sArray: [],
        pidS: [],
        list: [],
        visible: false,
        rules: {
          tpId: [
            {required: true, message: '请选择产线', trigger: 'change'},
          ],
          plId: [
            {required: true, message: '请选择设备', trigger: 'change'},
          ],
          productionDate: [
            {required: true, message: '请选择日期', trigger: 'change'},
          ],
        },
        levelFormat: []
      };
    },
    created() {

    },
    mounted() {
      this.fetchFormat()
      if (this.listInfo) {
        this.form = this.listInfo
        this.fetchLine(this.form.tpId)
        this.fetchLine2(this.form.tpId)
        this.form.oldCode = this.listInfo.color
        this.form.rTpId = this.listInfo.tpId
        this.form.rPlId = this.listInfo.plId
        this.form.rProductionDate = this.listInfo.productionDate
        this.form.isOutbreed = '0'
      }
    },
    methods: {
      // 切换类别
      selectChange(val) {
        this.disPl = false
        this.form.plId = null
        this.sArray = []
        this.fetchLine2(val)
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            moveBill({isOutbreed: this.form.isOutbreed, plId: this.form.plId, productionDate: this.form.productionDate, taskId: this.form.taskId }).then(res => {
                this.$emit('hideMove', false)
                this.$emit('uploadList')
              });
          } else {
            return false;
          }
        })
      },
      fetchFormat() {
        getFinalGoodsTypeT().then(res => {
          if(res.flag) {
            this.pArray = res.data
          }
        })
      },
      fetchLine(val) {
        getFinalGoodsT(val).then(res => {
          if(res.flag) {
            this.rArray = res.data
          }
        })
      },
      fetchLine2(val) {
        getFinalGoodsT(val).then(res => {
          if(res.flag) {
            this.sArray = res.data
          }
        })
      },
    }
  };
</script>

<style>
</style>

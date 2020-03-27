<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="120px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'oid'" style="display: none">
            <el-input v-model="form.oid"></el-input>
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
          <el-form-item :label="'项目名称'" >
            <el-input v-model="form.soName" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'排产单号'">
            <el-input v-model="form.taskNum" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'色号/旧料号'" prop="oldCode">
            <el-input v-model="form.oldCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'订单数量'" >
            <el-input v-model="form.odPrNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'生产线'" prop="plId">
            <el-select v-model="form.plId" class="width-full" placeholder="生产线" >
              <el-option :label="t.plName" :value="t.plId" v-for="(t,i) in rArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'生产类型'" prop="productionType">
            <el-select v-model="form.productionType" class="width-full" placeholder="生产类型" >
              <el-option :label="t.label" :value="t.value" v-for="(t,i) in options" :key="i"></el-option>
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
            <el-color-picker v-model="form.tips" show-alpha></el-color-picker>
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
  import { schedulingSave } from "@/api/production/index";
  import { getResourcesList, getFinalGoods} from '@/api/basic/index'
  import { getSalesInfo } from '@/api/aftermarket/index'

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
        visible: false,
        form: {
          oid: null,
          tips: null,
          oldCode: null,
          plId: null,
          taskNum: null,
          soNum: null,
          dueDate: null,
          odPrNum: null,
          soName: null,
          allocatedNum: null,
          soDate: null,
          remark: null,
          productionType: null,
          productionDate: null
        },
        rules: {
          oldCode: [
            {required: true, message: '请输入色号/旧料号', trigger: 'blur'},
          ],
          allocatedNum: [
            {required: true, message: '请输入数量', trigger: 'blur'},
          ],
          tpId: [
            {required: true, message: '请选择类别', trigger: 'change'},
          ],
          plId: [
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
        options: [{
          value: '0',
          label: '按订单生产'
        }, {
          value: '1',
          label: '备库存生产'
        }, {
          value: '2',
          label: '试生产'
        }, {
          value: '3',
          label: '内部自用'
        }, {
          value: '4',
          label: '赔偿生产'
        }, {
          value: '5',
          label: '返工生产'
        }],
        loading: false,
        list: [],
        pArray: [],
        rArray: [],
        sArray: [],
        type: null,
        columns: null
      }
    },
    created() {
    },
    mounted() {
      this.fetchLine()
      if (this.listInfo) {
        this.form = this.listInfo
        const listInfo = this.listInfo
        const form = this.form
        this.options.forEach(function(item, index) {
          if (item.label == listInfo.productionType) {
            form.productionType = item.value
          }
        })
        this.form.oldCode = this.listInfo.color
      }
    },
    methods: {
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            if (typeof (this.form.oid) != undefined && this.form.oid != null) {
              productionLineAlter(this.form).then(res => {
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
      fetchLine() {
        getFinalGoods().then(res => {
          this.rArray = res.data
        })
      },
    }
  };
</script>

<style>
</style>

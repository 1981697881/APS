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
          <el-form-item :label="'订单日期'" >
            <el-input v-model="form.soDate" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'订单号'" >
            <el-input v-model="form.soNum"></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="2">
          <el-button :size="'mini'" type="success" icon="el-icon-search" @click="queryOrder" >查询
          </el-button>
        </el-col>-->
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
          <el-form-item :label="'生产线'" prop="tpId">
            <el-select v-model="form.tpId" class="width-full" placeholder="生产线" @change="selectChange">
              <el-option :label="t.tpName" :value="t.tpId" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'生产设备'" prop="plId">
            <el-select v-model="form.plId" class="width-full" placeholder="生产设备" :disabled="disPl">
              <el-option :label="t.plName" :value="t.plId" v-for="(t,i) in rArray"  :key="i"></el-option>
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
          <!--<el-col :span="12">
          <el-form-item :label="'产品名称'" prop="soDeId">
            <el-select v-model="form.soDeId" class="width-full" placeholder="产品名称" >
              <el-option :label="t.goodName" :value="t.soDeId" v-for="(t,i) in sArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>-->
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'生产类型'" prop="productionType">
            <el-select v-model="form.productionType" class="width-full" placeholder="生产类型" >
              <el-option :label="t.label" :value="t.value" v-for="(t,i) in options" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'任务警示'">
            <el-radio-group v-model="form.alertStatus">
              <el-radio :label=3 style="color:#7b1424">加急</el-radio>
              <el-radio :label=4 style="color:#3b199a">暂停</el-radio>
              <el-radio :label=1 style="color:#dc9118" disabled>延误</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'备注'">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="20">
        <el-table :data="list" border :height="'250px'" stripe size="mini" :highlight-current-row="true" >
          <el-table-column prop="date" label="序号"  align="center" type="index" sortable></el-table-column>
          <el-table-column
            v-for="(t,i) in columns"
            :key="i"
            :prop="t.name"
            align="center"
            :label="t.text"
            :width="t.width?t.width:'120px'"
            v-if="t.default!=undefined?t.default:true"
          >
            <el-table-column
              v-if="t.colspan!=undefined?t.colspan:false"
              v-for="(a,b) in t.data"
              :prop="a.name"
              :key="b"
              :label="a.text"
              align="center"
              width="120">
            </el-table-column>
          </el-table-column>
         <el-table-column
           label="生产线"
           align="center"
           width="160px">
           <template slot-scope="scope">
             <el-select v-model="value" placeholder="请选择" style="float: left">
               <el-option
                 v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
           </template>
         </el-table-column>
   </el-table>
     </el-row>-->
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click.native="saveData('form')">确定</el-button>
    </div>
  </div>
</template>

<script>
import { schedulingSave, schedulingAlter } from "@/api/production/index";
import { getFinalGoodsType, getFinalGoods} from '@/api/basic/index'
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
      radio: null,
      num1: 1,
      visible: false,
      disPl: true,
      form: {
        taskId: null,
        alertStatus: null,
        tips: null,
        oldCode: null,
        plId: null,
        tpId: null,
        isSemi: 0,
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
          {required: true, message: '请选择产线', trigger: 'change'},
        ],
        plId: [
          {required: true, message: '请选择设备', trigger: 'change'},
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
    this.fetchFormat()
    if (this.listInfo) {
      this.form = this.listInfo
      const listInfo = this.listInfo
      const form = this.form
      this.fetchLine(this.form.tpId)
      this.options.forEach(function(item, index) {
        if (item.label == listInfo.productionType) {
          form.productionType = item.value
        }
      })
      this.form.oldCode = this.listInfo.color
    }
  },
  methods: {
    // 查询前后三天日期
    getDay(date, day) {
      var today = new Date(date);
      var targetday_milliseconds = today.getTime() + 1000*60*60*24*day
      today.setTime(targetday_milliseconds) // 注意，这行是关键代码
      var tYear = today.getFullYear()
      var tMonth = today.getMonth()
      var tDate = today.getDate()
      var getDay = today.getDay()
      tMonth = this.doHandleMonth(tMonth + 1)
      tDate = this.doHandleMonth(tDate)
      var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
      var week = weeks[getDay]
      return {
        day: tDate,
        week: week,
        date: tYear + "-" + tMonth + "-" + tDate
      }
    },
    doHandleMonth(month){
      var m = month;
      if(month.toString().length == 1) {
        m = "0" + month;
      }
      return m;
    },
    // 切换类别
    selectChange(val) {
      this.disPl = false
      this.form.plId = null
      this.rArray = []
      this.fetchLine(val)
    },
    attempt() {},
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
  /* preview(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          this.columns = [
            { text: "gid", name: 'gid', default:false },
            { text: "所属类别", name: 'type' },
            { text: "生产线", name: 'type' }
          ]
          for (let i = -3; i < 4; i++) {
            const data = this.getDay(this.form.proDate, i)
            this.columns.push({
              text: data.week + '', name: data.week + '', colspan: true, data: [{
                text: data.day + '', name: data.day + ''
              }]
            })
          }
          schedulingPreview({
            date: this.getDay(this.form.proDate, -3).date,
            num: this.form.num,
            plId: this.form.plId,
          }).then(res => {
            console.log(res)
            if(res.flag) {
              let obj = []
              obj.push(res.data)
              this.list = obj
              console.log(this.list)
            }
          })
        } else {
          return false
        }
      })
    },*/
    queryOrder() {
      if(this.form.orderNum != null || this.form.orderNum != undefined) {
        getSalesInfo(this.form.orderNum).then(res => {
          this.form.createTime = res.data['createTime']
          this.form.seller = res.data['seller']
          this.form.soId = res.data['soId']
          this.form.customerName = res.data['customerName']
          const detail = res.data.detail
          const me = this
          detail.forEach(function(item, index) {
            me.sArray.push(item)
          })
        })
      }
    },
    fetchFormat() {
      getFinalGoodsType().then(res => {
        if(res.flag) {
          this.pArray = res.data
        }
      })
    },
    fetchLine(val) {
      getFinalGoods(val).then(res => {
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

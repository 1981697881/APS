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
          <el-form-item :label="'订单号'">
            <el-input v-model="form.orderNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="success" icon="el-icon-search" @click="queryOrder" >查询
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'所属类别'" prop="tpId">
            <el-select v-model="form.tpId" class="width-full" placeholder="类别" @change="selectChange">
              <el-option :label="t.tpName" :value="t.tpId" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'生产线'" prop="plId">
            <el-select v-model="form.plId" class="width-full" placeholder="生产线" >
              <el-option :label="t.plName" :value="t.plId" v-for="(t,i) in rArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'旧料号'">
            <el-input v-model="form.orderId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'色号'">
            <el-input v-model="form.color"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'客户'">
            <el-input v-model="form.customerName" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'销售员'">
            <el-input v-model="form.seller" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'订单数量'" :readonly="true">
            <el-input v-model="form.orderNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'产品名称'" prop="soDeId">
            <el-select v-model="form.soDeId" class="width-full" placeholder="产品名称" >
              <el-option :label="t.goodName" :value="t.soDeId" v-for="(t,i) in sArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'厂务预计日期'">
            <div class="block">
              <el-date-picker
                v-model="form.dueDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'安排生产日期'" prop="proDate">
            <div class="block">
              <el-date-picker
                v-model="form.proDate"
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
          <el-form-item :label="'试产数量'">
            <el-input-number v-model="form.tryNum"  :min="0" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'试产日期'">
            <div class="block">
              <el-date-picker
                v-model="form.tryDate"
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
          <el-form-item :label="'生产数量'" prop="num">
            <el-input-number v-model="form.num"  :min="0" ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'订单日期'">
            <el-input v-model="form.createTime" :readonly="true"></el-input>
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
      <!-- <el-button type="warning" @click.native="attempt">尝试排产</el-button>-->
       <el-button type="primary" @click.native="saveData('form')">确定</el-button>
     <!-- <el-button type="primary" @click="preview('form')">预览</el-button>-->
     </div>
 </div>
</template>

<script>
import { schedulingPreview, schedulingSave } from "@/api/production/index";
import { getResourcesList, productionLineList} from '@/api/basic/index'
import { getSalesInfo } from '@/api/aftermarket/index'

export default {
  props: {
    oid: {
      type: Number,
      default: null
    },
  },
  data() {
    return {
      num1: 1,
      visible: false,
      form: {
        oid: null,
        plId: null,
        dueDate: null,
        orderNum: null,
        num: null,
        tryNum: null,
        proDate: null,
        tryDate: null,
        soDeId: null,
        createTime: null
      },
      rules: {
        num: [
          {required: true, message: '请输入数量', trigger: 'blur'},
        ],
        tpId: [
          {required: true, message: '请选择类别', trigger: 'change'},
        ],
        plId: [
          {required: true, message: '请选择产线', trigger: 'change'},
        ],
        proDate: [
          {required: true, message: '请选择日期', trigger: 'change'},
        ],
        soDeId: [
          {required: true, message: '请选择产品', trigger: 'change'},
        ],

      },
      value: null,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
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
    this.form.oid = this.oid
    this.fetchFormat()
    if (this.form.oid) {
      this.fetchData(this.form.oid);
    }
  },
  methods: {
    // 查询前后三天日期
    getDay(date, day){
      var today = new Date(date);
      var targetday_milliseconds=today.getTime() + 1000*60*60*24*day
      today.setTime(targetday_milliseconds) //注意，这行是关键代码
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
    //切换类别
    selectChange(val) {
      this.fetchLine({tpId: val})
    },
    attempt() {},

    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          if (typeof (this.form.oid) != undefined && this.form.oid != null) {
           /* productionLineAlter(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });*/
          } else {
            schedulingSave({
              goodPojoList: [
                {
                  num: this.form.num,
                  plId: this.form.plId,
                  proDate: this.form.proDate,
                  soDeId: this.form.soDeId
                }
              ],
              soId: this.form.soId
            }).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          }
        } else {
          return false
        }
      })
    },
    preview(form) {
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
    },
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
    fetchData(val) {
     /* saleInfo(val).then(res => {
        this.list = res.data
      })*/
    },
    fetchFormat() {
      const data = {
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 1000
      }
      getResourcesList(data).then(res => {
        if(res.flag) {
          this.pArray = res.data.records
        }
      })
    },
    fetchLine(val) {
      const data = {
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 1000
      }
      productionLineList(data, val).then(res => {
        this.rArray = res.data.records
      })
    },
  }
};
</script>

<style>
</style>

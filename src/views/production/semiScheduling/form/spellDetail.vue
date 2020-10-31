<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="90px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'日期'">
            <el-date-picker
              v-model="value"
              type="daterange"
              align="right"
              style="width: auto"
              value-format="yyyy-MM-dd"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'旧料号'">
            <el-input v-model="oldCode" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button  :size="'mini'" type="success" @click="query" icon="el-icon-search">查询</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table el-table :height="'calc(100vh/2.8)'"  :data="list" border size="mini" :highlight-current-row="true">
          <el-table-column
            v-for="(t,i) in columns"
            :key="i"
            align="center"
            :prop="t.name"
            :label="t.text"
            v-if="t.default!=undefined?t.default:true"
            :width="t.width?t.width:(selfAdaption?'':'150px')"
          >
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" @click="deleteRow(scope.$index,list)" style="cursor: pointer;">
                删除
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'排产数量'" >
            <el-input v-model="form.allocatedNum" disabled></el-input>
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
            <el-select v-model="form.tpId" class="width-full" placeholder="调整后生产线" @change="selectChange">
              <el-option :label="t.tpName" :value="t.tpId" v-for="(t,i) in pArray" :key="i" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'生产设备'" prop="plId">
            <el-select v-model="form.plId" class="width-full" placeholder="调整后生产设备" >
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
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>
  import { shareBill, getSemiList, isOutbreed } from '@/api/production/index'
  import { getSemiFinishedProductsType, getSemiFinishedProducts} from '@/api/basic/index'
  export default {
    props: {
      listInfo: {
        type: Array,
        default: null
      },
      //是否自适应宽度，不自适应宽度默认为120px
      selfAdaption: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        value: [],
        form: {
          allocatedNum: null,
          tpId: null,
          plId: null,
          productionDate: null,
          isOutbreed: '0',
        },
        oldCode: null,
        columns: [
          {text: '色号', name: 'color'},
          {text: '排产单号', name: 'taskNum'},
          {text: '生产日期', name: 'productionDate'},
          {text: '生产设备', name: 'plName'},
          {text: '生产数量', name: 'allocatedNum'},
        ],
        list: [],
        pArray: [],
        rArray: [],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
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
      };
    },
    created() {

    },
    mounted() {
      this.fetchFormat()
      if (this.listInfo) {
        this.list = this.listInfo
        this.$set(this.form, 'isOutbreed', '1')
      }
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
        let list = this.list
        let num = 0
        list.forEach((item, index) =>{
          num += Number(item.allocatedNum)
        })
        this.form.allocatedNum = num
      },
      query() {
        this.fetchData();
      },
      fetchData() {
        this.loading = true
        const data = {
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 50
        }
        let obj = {}
        this.oldCode != null && this.oldCode != undefined ? obj.oldCode = this.oldCode : null
        this.value != null && this.value != undefined ? obj.productionDateEnd = this.value[1] : null
        this.value != null && this.value != undefined ? obj.productionDateStart = this.value[0] : null
          getSemiList(data, obj).then(res => {
            if (res.flag) {
              this.loading = false
              let list = res.data
              let lData = []
              let num = 0
              for(let i in list){
                list[i].forEach((item, index) =>{
                  lData.push(item)
                  num += Number(item.allocatedNum)
                })
              }
              this.form.allocatedNum = num
              this.list = lData
            }
          })
      },
      // 切换类别
      selectChange(val) {
        this.form.plId = null
        this.rArray = []
        this.fetchLine(val)
      },
      saveData(form) {
        let me = this
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            let data = {}
            let lData = []
            let lData2 = []
            let num = 0
            let list = this.list
            let result = []
            list.forEach(function(item, index) {
              let obj = {}
              let obj2 = {}
              obj2.taskId = item.taskId
              obj2.allocatedNum = item.allocatedNum
              obj2.plId = me.form.plId
              obj2.productionDate = me.form.productionDate
              lData2.push(obj2)
              obj.allocatedNum = item.allocatedNum
              obj.gid = item.gid
              obj.isOutbreed = me.form.isOutbreed
              obj.plId = me.form.plId
              obj.productionDate = me.form.productionDate
              obj.remark = item.remark
              obj.taskId = item.taskId
              num += Number(item.allocatedNum)
              if(result.indexOf(item.gid) == -1){
                result.push(item.gid)
              }
              lData.push(obj)
            })
            /* data.taskId = me.form.taskId
             data.extendPojo = lData*/
            if(me.list.length > 1 ){
              if(num <= me.form.allocatedNum){
                if(result.length == 1){
                  isOutbreed(lData2).then(res => {
                    if (res.flag) {
                      shareBill(lData).then(reso => {
                        if(reso.flag){
                          me.$emit('hideSpell', false)
                          me.$emit('uploadList')
                        }
                      })
                    } else {
                      this.$confirm(res.msg + ',是否超出常量生产?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                        lData.forEach((item, index) =>{
                          item.isOutbreed = '1'
                        })
                        shareBill(lData).then(reso => {
                          if(reso.flag){
                            me.$emit('hideSpell', false)
                            me.$emit('uploadList')
                          }
                        })
                      }).catch(() => {
                        this.$message({
                          type: 'info',
                          message: '已取消删除'
                        });
                      });
                    }
                  })
                }else{
                  me.$message({
                    type: 'error',
                    message: '物料信息需要一致!'
                  });
                }
              } else {
                this.$message({
                  type: 'error',
                  message: '拼单数量不能大于原单数量!'
                });
              }
            } else {
              this.$message({
                type: 'error',
                message: '拼单数量不能小于零并且大于一!'
              });
            }
          } else {
            return false;
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

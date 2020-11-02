<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="90px" :size="'mini'">
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
                :picker-options="pickerOptionsStart"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'生产线'" prop="tpId">
            <el-select v-model="form.tpId" class="width-full" placeholder="调整后生产线" >
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
     <!-- <el-row :gutter="20">
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
      </el-row>-->
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>
  import { shareBill, isOutbreed } from '@/api/production/index'
  import { getFinalGoodsTypeT, getFinalGoodsT} from '@/api/basic/index'
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
        pickerOptionsStart: {
          disabledDate: time => {
            let beginDateVal = new Date()
            beginDateVal=beginDateVal.setDate(beginDateVal.getDate()-1)
            beginDateVal=new Date(beginDateVal)
            return time.getTime() <= beginDateVal;
          }
        },
        form: {
          allocatedNum: null,
          tpId: null,
          plId: null,
          productionDate: null,
          isOutbreed: '0',
        },
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
        let num = 0
        this.list.forEach((item, index) =>{
          num += Number(item.allocatedNum)
        })
        this.$set(this.form, 'isOutbreed', '1')
        this.form.allocatedNum = num
      }
    },
    methods: {
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
    }
  };
</script>

<style>
</style>

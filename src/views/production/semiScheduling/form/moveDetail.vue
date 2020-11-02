<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="90px" :size="'mini'">
      <el-row >
        <el-table el-table :height="'calc(100vh/2.8)'"  :data="list" border size="mini" :highlight-current-row="true">
          <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
          <el-table-column
            v-for="(t,i) in columns"
            :key="i"
            align="center"
            :prop="t.name"
            :label="t.text"
            v-if="t.default!=undefined?t.default:true"
            :width="t.width?t.width:(selfAdaption?'':'150px')"
          >
            <template slot-scope="scope">
                <span v-if="scope.row.isSet">
                  <div class="block" v-if="t.name == 'productionDate'">
                  <el-date-picker
                    v-model="sel[t.name]"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptionsStart"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                  <el-select size="mini" v-else-if="t.name == 'tpName'" v-model="sel[t.name]" placeholder="请选择" @change="changeTpId($event, sel)">
                    <el-option
                      :label="t.tpName"
                      :value="t.tpName"
                      v-for="(t,i) in pArray"
                      :key="i">
                    </el-option>
                  </el-select><el-select size="mini" v-else-if="t.name == 'plNName'" v-model="sel[t.name]" placeholder="请选择" @change="changePlId($event, sel)">
                    <el-option
                      :label="t.plName"
                      :value="t.plName"
                      v-for="(t,i) in rArray"
                      :key="i">
                    </el-option>
                  </el-select>
                  <span v-else>{{sel[t.name]}}</span>
                </span>
              <span v-else>{{scope.row[t.name]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
                  <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">
                    {{scope.row.isSet?'确定':"修改"}}
                  </span>
              <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" @click="deleteRow(scope.row,scope.$index,list)" style="cursor: pointer;">
                    删除
                  </span>
              <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,false)">
                    取消
                  </span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>
  import { moveBill, isOutbreed } from "@/api/production/index"
  import { getSemiFinishedProductsType, getSemiFinishedProducts} from '@/api/basic/index'
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
        pickerOptionsStart: {
          disabledDate: time => {
            let beginDateVal = new Date()
            beginDateVal=beginDateVal.setDate(beginDateVal.getDate()-1)
            beginDateVal=new Date(beginDateVal)
            return time.getTime() <= beginDateVal;
          }
        },
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
        columns: [
          {text: '色号', name: 'color'},
          {text: '排产单号', name: 'taskNum'},
          {text: '生产日期', name: 'productionDate'},
          {text: '原生产设备', name: 'plName'},
          {text: '现生产线', name: 'tpName'},
          {text: '现生产设备', name: 'plNName'},
          {text: '生产数量', name: 'allocatedNum'}
        ],
        pArray: [],
        rArray: [],
        sArray: [],
        pidS: [],
        list: [],
        visible: false,
        rules: {
          tpId: [
            {required: true, message: '请选择产线', trigger: 'change'}
          ],
          plId: [
            {required: true, message: '请选择设备', trigger: 'change'}
          ],
          productionDate: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
        },
        levelFormat: []
      };
    },
    created() {

    },
    mounted() {
      console.log(this.listInfo)
      this.fetchFormat()
      if (this.listInfo) {
        this.list = this.listInfo
        /*this.$set(this.listInfo, 'isOutbreed', '1')
        this.form = this.listInfo
        this.fetchLine(this.form.tpId)
        this.fetchLine2(this.form.tpId)
        this.form.plId = Number(this.listInfo.plId)
        this.form.tpId = Number(this.listInfo.tpId)
        this.form.rTpId = Number(this.listInfo.tpId)
        this.form.rPlId = Number(this.listInfo.plId)
        this.form.rProductionDate = this.listInfo.productionDate*/
      }
    },
    methods: {
      changeTpId(val, row) {
        const me = this
        this.pArray.forEach((item, index) => {
          if(item.tpName === val) {
            getFinalGoodsT(item.tpId).then(res => {
              if(res.flag) {
                me.$set(this, 'rArray', res.data)
                me.$forceUpdate()
              }
            })
          }
        })
        console.log(row)
      },
      changePlId(val, row) {
        const me = this
        this.rArray.forEach((item, index) => {
          if(item.plName === val) {
            me.$set(row, 'plId', item.plId)
          }
        })
      },
      // 读取表格数据
      readMasterUser() {
        // 根据实际情况，自己改下啊
        this.list.map(i => {
          i.isSet = false; // 给后台返回数据添加`isSet`标识
          return i;
        });
      },
      // 添加
      addMaster() {
        for (let i of this.list) {
          if (i.isSet) return this.$message.warning('请先保存当前编辑项');
        }
        this.cIndex += 1
        let j = {isSet: true, productionDate: null, cIndex: this.cIndex, plNName: null, allocatedNum: 10};
        this.list.push(j);
        this.sel = JSON.parse(JSON.stringify(j));
      },
      // 修改
      pwdChange(row, index, cg) {
        this.rArray = null
        // 点击修改 判断是否已经保存所有操作
        for (let i of this.list) {
          if (i.isSet && i.taskId != row.taskId) {
            this.$message.warning('请先保存当前编辑项');
            return false;
          }
        }
        // 是否是取消操作
        if (!cg) {
          if (!this.sel.plId) this.list.splice(index, 1);
          return row.isSet = !row.isSet;
        }
        console.log(row.isSet)
        // 提交数据
        if (row.isSet) {
          const sel = this.sel
          if((sel.productionDate == null || sel.productionDate === '') || (sel.plNName == null || sel.plNName === '') || (sel.tpName == null || sel.tpName === '')){
            return this.$message({
              type: 'error',
              message: '请输入必填项!'
            });
          }else {
            let data = JSON.parse(JSON.stringify(this.sel));
            for (let k in data) row[k] = data[k]
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            // 然后这边重新读取表格数据
            this.readMasterUser();
            row.isSet = false;
          }
        } else {
          this.sel = JSON.parse(JSON.stringify(row));
          row.isSet = true;
        }
      },
      // 删除带确认区 单行删除
      deleteRow(row, index, rows) {
        this.list.forEach((item, index2) =>{
          if(row.cIndex == item){
            this.list.splice(index2,1);
          }
        })
        rows.splice(index, 1);
      },
      // 切换类别
      selectChange(val) {
        this.disPl = false
        this.form.plId = null
        this.sArray = []
        this.fetchLine2(val)
      },
      saveData() {
        let me = this
        if(me.list.length> 0){
          let list = this.list
          let lData = []
          let lData2 = []
          list.forEach(function(item, index) {
            let obj = {}
            let obj2 = {}
            obj2.taskId = item.taskId
            obj2.allocatedNum = item.allocatedNum
            obj2.plId = item.plId
            obj2.productionDate = item.productionDate
            lData2.push(obj2)
            obj.taskId = item.taskId
            obj.isOutbreed = me.form.isOutbreed
            obj.plId = item.plId
            obj.productionDate = item.productionDate
            lData.push(obj)
          })
          isOutbreed(lData2).then(res => {
            if(res.flag) {
              moveBill(lData).then(reso => {
                if(reso.flag){
                  me.$emit('hideMove', false)
                  me.$emit('uploadList')
                }
              });
            } else {
              this.$confirm(res.msg + ',是否超出常量生产?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                lData.forEach((item, index) =>{
                  item.isOutbreed = '1'
                })
                moveBill(lData).then(reso => {
                  if(reso.flag){
                    me.$emit('hideMove', false)
                    me.$emit('uploadList')
                  }
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
            }
          });
        }
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
      fetchLine2(val) {
        getSemiFinishedProducts(val).then(res => {
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

<template>
  <div>
    <el-form :model="form" ref="form" label-width="90px" :size="'mini'">
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
      </el-row>
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
                  <el-input-number size="mini" v-if="t.name == 'allocatedNum'" placeholder="请输入内容" :min="1" :max="form.allocatedNum" v-model="sel[t.name]">
                  </el-input-number>
                  <div class="block" v-else-if="t.name == 'productionDate'">
                  <el-date-picker
                    v-model="sel[t.name]"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                  <el-select size="mini" v-else-if="t.name == 'plName'" v-model="sel[t.name]" placeholder="请选择" @change="changePlId($event, sel)">
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
        <el-col :span="24">
          <div class="el-table-add-row" style="width: 99.2%;" @click="addMaster()"><span>+ 添加</span></div>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>
  import { separateBill, isOutbreed } from '@/api/production/index'
  import { getSemiFinishedProductsType, getSemiFinishedProducts} from '@/api/basic/index'
  export default {
    props: {
      listInfo: {
        type: Object,
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
        cIndex: 0,
        form: {
          taskNum: null,
          oldCode: null,
          allocatedNum: null,
          rTpId: null,
          rPlId: null,
          rProductionDate: null,
          isOutbreed: '0',
        },
        pArray: [],
        rArray: [],
        columns: [
          {text: '生产日期', name: 'productionDate'},
          {text: '生产设备', name: 'plName'},
          {text: '生产数量', name: 'allocatedNum'},
        ],
        pidS: [],
        list: [],
        levelFormat: []
      };
    },
    created() {

    },
    mounted() {
      this.fetchFormat()
      console.log(this.listInfo)
      if (this.listInfo) {
        this.$set(this.listInfo, 'isOutbreed', '1')
        this.form = this.listInfo
        this.fetchLine(this.form.tpId)
        this.form.plId = Number(this.listInfo.plId)
        this.form.tpId = Number(this.listInfo.tpId)
        this.form.rTpId = Number(this.listInfo.tpId)
        this.form.rPlId = Number(this.listInfo.plId)
        this.form.allocatedNum = Number(this.listInfo.allocatedNum)
        this.form.rProductionDate = this.listInfo.productionDate
      }
    },
    methods: {
      changePlId(val, row) {
        const me = this
        this.rArray.forEach((item, index) => {
          if(item.plName === val) {
            me.$set(row, 'plId', item.plId)
          }
        })
      },
      //读取表格数据
      readMasterUser() {
        //根据实际情况，自己改下啊
        this.list.map(i => {
          i.isSet = false; //给后台返回数据添加`isSet`标识
          return i;
        });
      },
      // 添加
      addMaster() {
        for (let i of this.list) {
          if (i.isSet) return this.$message.warning('请先保存当前编辑项');
        }
        this.cIndex += 1
        let j = {isSet: true, productionDate: null, cIndex: this.cIndex, plId: null, allocatedNum: 10};
        this.list.push(j);
        this.sel = JSON.parse(JSON.stringify(j));
      },
      // 修改
      pwdChange(row, index, cg) {
        // 点击修改 判断是否已经保存所有操作
        for (let i of this.list) {
          if (i.isSet && i.cIndex != row.cIndex) {
            this.$message.warning('请先保存当前编辑项');
            return false;
          }
        }
        //是否是取消操作
        if (!cg) {
          if (!this.sel.plId) this.list.splice(index, 1);
          return row.isSet = !row.isSet;
        }
        console.log(row.isSet)
        //提交数据
        if (row.isSet) {
          const sel = this.sel
          if((sel.productionDate == null || sel.productionDate === '') || (sel.plId == null || sel.plId === '') || (sel.allocatedNum == null || sel.allocatedNum === '')){
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
            //然后这边重新读取表格数据
            this.readMasterUser();
            row.isSet = false;
          }
        } else {
          this.sel = JSON.parse(JSON.stringify(row));
          row.isSet = true;
        }
      },
      //删除带确认区 单行删除
      deleteRow(row, index, rows) {
        this.list.forEach((item, index2) =>{
          if(row.cIndex == item){
            this.list.splice(index2,1);
          }
        })
        rows.splice(index, 1);
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
            list.forEach(function(item, index) {
              let obj = {}
              let obj2 = {}
              obj2.taskId = me.form.taskId
              obj2.allocatedNum = item.allocatedNum
              obj2.plId = item.plId
              obj2.productionDate = item.productionDate
              lData2.push(obj2)
              obj.allocatedNum = item.allocatedNum
              obj.gid = me.form.gid
              obj.isOutbreed = me.form.isOutbreed
              obj.plId = item.plId
              obj.productionDate = item.productionDate
              obj.productionType = me.form.productionType
              obj.remark = me.form.remark
              num += Number(item.allocatedNum)
              console.log(obj)
              lData.push(obj)
            })
            data.taskId = me.form.taskId
            data.extendList = lData
            if(me.list.length > 0 ) {
              if(num <= me.form.allocatedNum){
                isOutbreed(lData2).then(res => {
                  if (res.flag) {
                    separateBill(data).then(reso => {
                      if(reso.flag){
                        me.$emit('hideSplit', false)
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
                      separateBill(data).then(reso => {
                        if(reso.flag){
                          me.$emit('hideSplit', false)
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
              } else {
                this.$message({
                  type: 'error',
                  message: '拆单数量不能大于原单数量!'
                });
              }
            } else {
              me.$message({
                type: 'error',
                message: '无拆单数量!'
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
  .el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
  }
</style>

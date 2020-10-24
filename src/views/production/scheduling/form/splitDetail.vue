<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'用户编码'" prop="jobNum">
            <el-input v-model="form.jobNum" readOnly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'登录账号'" prop="username">
            <el-input v-model="form.username" :readOnly="visible"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'对应职员'" prop="eid">
            <el-select v-model="form.eid" filterable  class="width-full" placeholder="请选择职员" @change="changeCheck">
              <el-option :label="t.name" :value="t.eid" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'说明'" >
            <el-input v-model="form.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'超级管理员'" >
            <el-switch
              v-model="value"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-table el-table :height="'calc(100vh/1.3)'"  :data="list" border size="mini" :highlight-current-row="true">
          <el-table-column
            v-for="(t,i) in columns"
            :key="i"
            align="center"
            :prop="t.name"
            :label="t.text"
            v-if="t.default!=undefined?t.default:true"
            :width="t.width?t.width:'150px'"
          >
            <template slot-scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input size="mini" v-if="t.name == 'FBatchNO'" placeholder="请输入内容" v-model="sel[t.name]"></el-input>
                  <el-input-number size="mini" v-else-if="t.name == 'FPlanQty'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input-number>
                  <el-input-number size="mini" v-else-if="t.name == 'putNum'" placeholder="请输入内容" v-model="sel[t.name]">
                  </el-input-number>
                  <div class="block"  v-else-if="t.name == 'FPlanCommitDate'">
                  <el-date-picker

                    v-model="sel[t.name]"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                  <div class="block"  v-else-if="t.name == 'FPlanFinishDate'">
                  <el-date-picker

                    v-model="sel[t.name]"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
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
  import {addUsers, alterUsers, getUsersInfo, getMenuList} from "@/api/system/index"
  import { getClerkList } from "@/api/basic/index"
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
        data: [],
        value: false,
        form: {
          username: null, // 名称
          eid: null,
          jobNum: null,
          description: null
        },
        columns: [
          {text: "用户组", name: "gpName"},
          {text: "gpLevel", name: "gpLevel", default:false},
          {text: "isDel", name: "isDel", default:false},
          {text:'gpId', name:'gpId', default:false}
        ],
        activeName: 'first',
        pidS: [],
        list: [],
        visible: false,
        rules: {
          username: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
          jobNum: [
            {required: true, message: '请输入编码', trigger: 'blur'},
          ],
          eid: [
            {required: true, message: '请选择职员', trigger: 'change'},
          ],

        },
        levelFormat: []
      };
    },
    created() {

    },
    mounted() {
      this.fetchFormat()
      this.fetchMenu()
    },
    methods: {
      //读取表格数据
      readMasterUser() {
        //根据实际情况，自己改下啊
        this.list.map(i => {
          i.isSet = false; //给后台返回数据添加`isSet`标识
          return i;
        });
      },
      //添加
      addMaster() {
        for (let i of this.list) {
          if (i.isSet) return this.$message.warning("请先保存当前编辑项");
        }
        this.cIndex += 10
        let j = {isSet: true, orderNo: this.cIndex, orderNo: '', planNum: ''};
        this.list.push(j);
        this.sel = JSON.parse(JSON.stringify(j));
      },
      //修改
      pwdChange(row, index, cg) {
        //点击修改 判断是否已经保存所有操作
        for (let i of this.list) {
          if (i.isSet && i.userId != row.userId) {
            this.$message.warning("请先保存当前编辑项");
            return false;
          }
        }
        //是否是取消操作
        if (!cg) {
          if (!this.sel.processId) this.list.splice(index, 1);
          return row.isSet = !row.isSet;
        }
        console.log(row.isSet)
        //提交数据
        if (row.isSet) {
          const sel = this.sel
          if((sel.processId == null || sel.processId === '') || (sel.orderNo == null || sel.orderNo === '') || (sel.planNum == null || sel.planNum === '')){
            return this.$message({
              type: 'error',
              message: "请输入必填项!"
            });
          }else {
            let data = JSON.parse(JSON.stringify(this.sel));
            for (let k in data) row[k] = data[k]
            this.$message({
              type: 'success',
              message: "添加成功!"
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
        this.result.forEach((item, index2) =>{
          if(row.processRouteDetailId == item){
            this.result.splice(index2,1);
          }
        })
        console.log(this.result)
        console.log(row)
        rows.splice(index, 1);
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            let obj = this.form
            let mids = []
            let gids = []
            this.multipleSelection.forEach(function(item, index) {
              gids.push(item.gpId)
            })
            obj.gids = gids
            obj.mids = this.getChecked()
            if (typeof (this.form.uid) != undefined && this.form.uid != null) {
              alterUsers(obj).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
            } else {
              addUsers(obj).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
            }
          } else {
            return false;
          }
        })

      },
      fetchFormat() {
        const data = {
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 1500
        };
        getClerkList(data, { disable: false }).then(res => {
          this.levelFormat = res.data.records
        });
      },
      fetchMenu() {
        getMenuList().then(res => {
          this.data = res.data.treeVoList
        });
      },
      fetchData(val) {
        getUsersInfo(val).then(res => {
          if(res.flag) {
            this.form = res.data
            let rows = this.list
            let group = res.data.gids
            this.Checkeds = res.data.mids
            if (rows) {
              rows.forEach(row => {
                for(const i in group) {
                  if(row.gpId == group[i]) {
                    this.$refs.multipleTable.toggleRowSelection(row)
                  }
                }
              })
            } else {
              this.$refs.multipleTable.clearSelection()
            }
          }
        });
      }
    }
  };
</script>

<style>
</style>

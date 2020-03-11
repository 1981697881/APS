<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'uid'" style="display: none">
            <el-input v-model="form.uid"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'用户编码'" prop="jobNum">
            <el-input v-model="form.jobNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'用户名称'" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'对应职员'" prop="eid">
            <el-select v-model="form.eid" class="width-full" placeholder="请选择职员">
              <el-option :label="t.username" :value="t.uid" v-for="(t,i) in levelFormat" :key="i"></el-option>
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
      <el-tabs  v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="所属用户组" name="first">
          <el-row >
            <el-table :data="list" border height="250px" ref="multipleTable" @selection-change="handleSelectionChange" stripe size="mini" :highlight-current-row="true" >
              <el-table-column align="center" type="selection"></el-table-column>
              <el-table-column
                v-for="(t,i) in columns"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                :width="t.width?t.width:(selfAdaption?'':'120px')"
                v-if="t.default!=undefined?t.default:true"
              ></el-table-column>
            </el-table>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="用户权限" name="second">
          <el-row  style="height: 250px;overflow: auto;border: 1px solid #EBEEF5;">
            <el-tree
              ref="tree1"
              :props="defaultProps"
              :default-expand-all="false"
              :data="data"
              show-checkbox
              :default-checked-keys="Checkeds"
              node-key="menuId"
              highlight-current
              :expand-on-click-node="false"
            />
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>
    import {addUsers, alterUsers, getUsersTree, getUsersInfo} from "@/api/system/index"
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
                data: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }],
                defaultProps: {
                    children: "children",
                    label: "label",
                    isLeaf: "leaf",
                    id: "menuId"
                },
                value: false,
                Checkeds:[],
                form: {
                  uid: null,
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
                multipleSelection: [],
                levelFormat: []
            };
        },
        created() {

        },
        mounted() {
          this.factchGroup()
          this.fetchFormat()
        },
        methods: {
          handleSelectionChange(val) {
            this.multipleSelection = val;
          },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            saveData(form) {
                this.$refs[form].validate((valid) => {
                    //判断必填项
                    if (valid) {
                      let obj = this.form
                      let mids = []
                      let gids = []
                      this.$refs.tree1.getCheckedKeys().forEach(function(item, index) {
                        console.log(item)
                      })
                      this.multipleSelection.forEach(function(item, index) {
                        gids.push(item.gpId)
                      })
                      obj.gids = gids
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
          factchGroup() {
            this.loading = true
            getUsersTree().then(res => {
              if(res.flag){
                this.loading = false
                this.list = res.data
                if (this.listInfo) {
                  this.fetchData(this.listInfo.uid)
                }
              }

            })
          },
            fetchFormat() {
              const data = {
                pageNum: this.list.current || 1,
                pageSize: this.list.size || 500
              };
              getClerkList(data).then(res => {
                this.levelFormat = res.data.records
              });
            },
            fetchData(val) {
              getUsersInfo(val).then(res => {
                  if(res.flag) {
                      this.form = res.data
                      let rows = this.list
                      let group = res.data.gids
                    console.log(this.list)
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

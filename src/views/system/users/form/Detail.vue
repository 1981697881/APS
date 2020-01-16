<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'rid'" >
            <el-input v-model="form.rid"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'用户编码'" prop="roleName">
            <el-input v-model="form.roleName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'用户名称'" prop="roleName">
            <el-input v-model="form.roleName"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'对应职员'" prop="roleLevel">
            <el-select v-model="form.roleLevel" class="width-full" placeholder="请选择职员">
              <el-option :label="t[1]" :value="t[0]" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'说明'" >
            <el-input v-model="form.roleName"></el-input>
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
            <el-table :data="list" border height="250px" stripe size="mini" :highlight-current-row="true" >
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
    import {saveRoles, updateRoles, getRoles, getPermission} from "@/api/system/permissions";

    export default {
        props: {
            rid: {
                type: Number,
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
                value:false,
                Checkeds:[],
                form: {
                    rid: null,
                    roleName: null, // 名称
                    roleLevel: null,
                },
                columns: [
                    { text: "gid", name: "gid", },
                    { text: "用户组", name: "" },
                ],
                activeName: 'first',
                pidS: [],
                list:{},
                pArray: [],
                rules: {
                    roleName: [
                        {required: true, message: '请输入名稱', trigger: 'blur'},
                    ],
                    roleLevel: [
                        {required: true, message: '请选择等级', trigger: 'change'},
                    ],

                },
                levelFormat: [[1, '一级'], [2, '二级']]
            };
        },
        created() {
            this.form.rid = this.rid
        },
        mounted() {
           /* this.fetchFormat();
            if (this.form.rid) {
                this.fetchData(this.form.rid);
            }*/
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            saveData(form) {
                this.$refs[form].validate((valid) => {
                    //判断必填项
                    if (valid) {
                        if (typeof (this.form.rid) != undefined && this.form.rid != null) {
                            updateRoles(this.form).then(res => {
                                this.$emit('hideDialog', false)
                                this.$emit('uploadList')
                            });
                        } else {
                            saveRoles(this.form).then(res => {
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
                getPermission().then(res => {
                    this.pArray = res.data;
                });
            },
            fetchData(val) {
                getRoles(val).then(res => {
                    this.form = res.data;
                });
            }
        }
    };
</script>

<style>
</style>

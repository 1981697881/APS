<template>
  <div>
    <el-container>
      <el-aside width="250px" style="line-height: normal">
        <div style="text-align: right;">
          <el-button type="success" style="padding: 7px 13px;" @click="setRow">添加</el-button>
          <el-button type="danger" style="padding: 7px 13px;" @click="Delivery1">删除</el-button>
        </div>
        <el-table height="300px" class="list-main"  :data="list1" border size="mini" :highlight-current-row="true" @row-click="rowClick1"  @row-dblclick="dblclick1">
          <el-table-column
            v-for="(t,i) in columns1"
            :key="i"
            align="center"
            :prop="t.name"
            :label="t.text"
            v-if="t.default!=undefined?t.default:true"
            :width="t.width?t.width:''"
             v-loading="loading"
          ></el-table-column>
        </el-table>
      </el-aside>
      <el-container>
        <el-header style="height: auto">
          <el-form :model="form" :rules="rules" ref="form" label-width="80px" :size="'mini'" style="padding-top: 10px;">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :label="'piId'" style="display: none">
                  <el-input v-model="form.piId"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :label="'编码'" prop="positionCode">
                  <el-input v-model="form.positionCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="'名称'" prop="positionName">
                  <el-input v-model="form.positionName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-header>
        <el-main style="line-height: normal">
          <el-table class="list-main" :data="list2" border size="mini" :highlight-current-row="true"   @row-click="rowClick2">
            <el-table-column
              v-for="(t,i) in columns2"
              :key="i"
              align="center"
              :prop="t.name"
              :label="t.text"
              v-if="t.default!=undefined?t.default:true"
              :width="t.width?t.width:''"
              v-loading="loading"
            ></el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <div slot="footer" style="text-align:center;padding-top: 15px;">
        <el-button type="success" @click="createData">新增</el-button>
        <el-button type="primary" @click="saveData('form')">保存</el-button>
        <el-button type="danger" @click="Delivery2">删除</el-button>
      </div>
    <el-dialog
      :visible.sync="visible"
      title="仓库信息"
      v-if="visible"
      :width="'30%'"
      destroy-on-close
      append-to-body
    >
      <el-form :model="form2" :rules="rules" ref="form2">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'piId'" style="display: none">
              <el-input v-model="form2.piId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="12">
              <el-form-item :label="'编码'" prop="positionCode">
                <el-input v-model="form2.positionCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'名称'" prop="positionName">
                <el-input v-model="form2.positionName"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click.native="saveParent('form2')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getWarehouseList, warehouseAdd, warehouseAlter, getAreaTree, delPosition} from "@/api/basic/index";

export default {
  data() {
    return {
      form2: {
        positionName: null, // 名称
        positionCode: null,
        piId: null,
        type: 1,
      },
      row: null,
      form: {
        positionName: null, // 名称
        positionCode: null,
        piId: null,
        parent: null,
        type: 2,
      },
      loading: false,
      visible: null,
      list1: [],
      list2: [],
      columns1: [
        { text: "编码", name: "positionCode" },
        { text: "名称", name: "positionName" },
      ],
      columns2: [
        { text: "编码", name: "positionCode" },
        { text: "名称", name: "positionName" },
      ],
      rules: {
        positionCode: [
          {required: true, message: '请输入编码', trigger: 'blur'},
        ],
        positionName: [
          {required: true, message: '请输入名稱', trigger: 'blur'},
        ],
      },
    };
  },
  created() {

  },
  mounted() {
    this.fetchData();
  },
  methods: {
    Delivery1() {
      if (this.row.piId) {
        this.$confirm('是否删除(' + this.row.positionName + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delPosition(this.row.piId).then(res => {
            if(res.flag){
              this.fetchData();
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        })
      }
    },
    Delivery2(){
      if (this.form.piId) {
        this.$confirm('是否删除(' + this.form.positionCode + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delPosition(this.form.piId).then(res => {
            if(res.flag){
              this.formatArea(this.row.piId)
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        })
      }
    },
    setRow() {
      this.form2 = {
        positionName: null, // 名称
        positionCode: null,
        piId: null,
        type: 1,
      }
      this.visible = true
    },
    dblclick1(row) {
      this.visible = true
      this.form2 = row
    },
    // 监听单击某一行
    rowClick1(obj) {
      this.form = {
        positionName: null, // 名称
        positionCode: null,
        piId: null,
        parent: null,
        type: 2,
      }
      this.row = obj
      this.formatArea(obj.piId)
    },
    // 监听单击某一行
    rowClick2(obj) {
      this.form = obj
    },
    formatArea(val) {
      this.loading = true
      getAreaTree(val).then(res => {
        if(res.flag) {
          this.loading = false
          this.list2 = res.data
        }
      });
    },

    fetchData() {
      this.loading = true;
      getWarehouseList(-1).then(res => {
        this.loading = false;
        this.list1 = res.data;
      });
    },
    createData() {
      this.form = {
        positionName: null, // 名称
        positionCode: null,
        piId: null,
        parent: null,
        type: 2,
      }
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        //判断必填项
        if (valid) {
          // 修改
          if(typeof (this.row.piId) != undefined && this.row.piId != null){
            if (typeof (this.form.piId) != undefined && this.form.piId != null) {
              warehouseAlter({
                type: this.form.type,
                piName: this.form.positionName,
                piId: this.form.piId,
                parent: this.row.piId,
                piCode: this.form.positionCode
              }).then(res => {
                this.formatArea(this.row.piId)
              });
              // 保存
            }else{
              warehouseAdd({
                type: this.form.type,
                piName: this.form.positionName,
                piId: this.form.piId,
                parent: this.row.piId,
                piCode: this.form.positionCode
              }).then(res => {
                this.formatArea(this.row.piId)
              });
            }
          }
        }else {
          return false;
        }
      })
    },
    saveParent(form) {
      this.$refs[form].validate((valid) => {
        //判断必填项
        if (valid) {
          // 修改
          if (typeof (this.form2.piId) != undefined && this.form2.piId != null) {
            warehouseAlter({
              type: this.form2.type,
              piName: this.form2.positionName,
              piId: this.form2.piId,
              piCode: this.form2.positionCode
            }).then(res => {
              if(res.flag){
                this.visible = false
                this.fetchData()
              }
            });
            // 保存
          } else {
            warehouseAdd({
              type: this.form2.type,
              piName: this.form2.positionName,
              piId: this.form2.piId,
              piCode: this.form2.positionCode
            }).then(res => {
              if(res.flag){
                this.visible = false
                this.fetchData()
              }
            });
          }
        } else {
          return false;
        }
      })
    },
  }
};
</script>



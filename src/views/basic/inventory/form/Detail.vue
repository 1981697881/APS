<template>
  <div>
    <el-container>
      <el-aside width="250px" style="line-height: normal">
        <el-table height="350px" class="list-main"  :data="list1" border size="mini" :highlight-current-row="true" @row-click="rowClick1">
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
          <el-form :model="form" :rules="rules" ref="form" label-width="80px" :size="'mini'">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :label="'库位'" prop="wid">
                  <el-select v-model="form.wid" multiple class="width-full" >
                    <el-option :label="t.wareName" :value="t.wid" v-for="(t,i) in pArray" :key="i"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!--<el-col :span="8">
                <el-form-item :label="'编码'" prop="positionCode">
                  <el-input v-model="form.positionCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="'名称'" prop="positionName">
                  <el-input v-model="form.positionName"></el-input>
                </el-form-item>
              </el-col>-->
              <el-col :span="12">
                <el-form-item :label-width="'0px'">
                  <el-checkbox v-model="form.eligibility" true-label="1" false-label="2">是否合格</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-header>
        <el-main style="line-height: normal">
          <list
            style="height: 230px"
            :columns="columns2"
            :loading="loading"
            :list="list2"
            index
            @row-click="rowClick2"
            @handle-size="handleSize"
            @handle-current="handleCurrent"
          />
        </el-main>
      </el-container>
    </el-container>
    <div slot="footer" style="text-align:center;padding-top: 15px;">
      <el-button type="primary" @click="saveData('form')">绑定</el-button>
      <el-button type="success" @click="createData('form')">修改</el-button>
      <el-button type="danger" @click="Delivery2">解除</el-button>
    </div>
  </div>
</template>

<script>
  import {getWarehouseList, wareBind, getStorageU9List, delPosition, getWarehouseU9List, wareBindUpdate, wareBindDelete} from "@/api/basic/index";
  import List from '@/components/List';
  export default {
    components: {
      List
    },
    data() {
      return {
        row: null,
        form: {
          wareName: null, // 名称
          wareCode: null,
          wid: [],
          wpId: null,
          eligibility: 0,
        },
        pArray: [],
        loading: false,
        visible: null,
        list1: [],
        list2: {},
        columns1: [
          { text: '编码', name: 'positionCode' },
          { text: '名称', name: 'positionName' },
        ],
        columns2: [
          { text: '编码', name: 'wareCode' },
          { text: '名称', name: 'wareName' },
        ],
        rules: {
          wid: [
            {required: true, type: 'array', message: '请选择库位', trigger: 'change'},
          ],
        },
      };
    },
    created() {

    },
    mounted() {
      this.fetchData()
      this.formatWarehouse()
    },
    methods: {
      //监听每页显示几条
      handleSize(val) {
        this.list2.size = val
        this.formatArea()
      },
      //监听当前页
      handleCurrent(val) {
        this.list2.current = val
        this.formatArea()
      },
      Delivery2(){
        if (this.form.wpId) {
          this.$confirm('是否解除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            wareBindDelete(this.form.wpId).then(res => {
              if(res.flag){
                this.formatArea({ piId: this.row.piId })
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
            message: '无选中行',
            type: 'warning'
          })
        }
      },
      // 监听单击某一行
      rowClick1(obj) {
        this.form = {
          wareName: null, // 名称
          wareCode: null,
          wpId: null,
          wid: [],
          eligibility: 0,
        }
        this.row = obj
        this.formatArea({ piId: obj.piId })

      },
      // 监听单击某一行
      rowClick2(obj) {
        const that = this
        that.form = {
          wid: [obj.row.wid],
          wpId: obj.row.wpId,
          eligibility: obj.row.eligibility
        }
      },
      formatArea(val, data = {
        pageNum: this.list2.current || 1,
        pageSize: this.list2.size || 50
      }) {
        this.loading = true
        getStorageU9List(data, val).then(res => {
          if(res.flag) {
            this.loading = false
            this.list2 = res.data
          }
        });
      },
      formatWarehouse() {
        getWarehouseU9List({
          pageNum: 1,
          pageSize: 1000
        }).then(res => {
          if(res.flag) {
            this.pArray = res.data.records
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
      createData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            // 修改
            if(typeof (this.row.piId) != undefined && this.row.piId != null){
              wareBindUpdate({piId: this.row.piId, wids: this.form.wid, eligibility: this.form.eligibility}).then(res => {
                this.formatArea({ piId: this.row.piId })
              });
              // 保存
            }
          }
        })
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            // 修改
            if(typeof (this.row.piId) != undefined && this.row.piId != null){
              wareBind({piId: this.row.piId, wids: this.form.wid, eligibility: this.form.eligibility}).then(res => {
                  this.formatArea({ piId: this.row.piId })
                });
                // 保存
              }
            }
        })
      },
    }
  };
</script>



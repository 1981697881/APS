<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'物料'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <!--<el-col :span="3">
          <el-form-item :label="'类别'">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>-->
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <!--<el-button :size="'mini'" type="primary" icon="el-icon-search" @click="handleAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="handleAlter">修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="del">删除</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-printer" @click="print">打印</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-error" @click="disable" >禁用</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-success" @click="enable" >启用</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-sort" @click="handleSync" >同步</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh"    @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { PrintFour } from '@/tools/doPrint'
export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  data() {
    return {
      options: [{
        value: '选项1',
        label: '成品'
      }, {
        value: '选项2',
        label: '半成品'
      }],
      value: '',
      search: {
        keyword: null,
        type:null
      }
    };
  },
  mounted(){

  },
  methods:{
      //关键字查询
      query(){
          if((typeof this.search.keyword != null) && (this.search.keyword !='')){

          }
      },
      del() {
      if (this.clickData.gid) {
        this.$emit('delList',{
          gid:this.clickData.gid,
        })
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    upload() {
      this.$emit("uploadList")
    },
    handleAlter() {
      if (this.clickData.gid) {
        this.$emit('showDialog',{
          gid: this.clickData.gid,
        })
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    handleSync() {
      this.$emit('syncDialog')
    },
    handleAdd(){
      this.$emit('showDialog')

    },
    disable() {
      if (this.clickData.gid) {
        this.$message({
          message: "抱歉，功能尚未完善！",
          type: "warning"
        });
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    enable() {
      if (this.clickData.gid) {
        this.$message({
          message: "抱歉，功能尚未完善！",
          type: "warning"
        });
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    print() {
      if (this.selections.length>0) {
        PrintFour(this.selections)
        LODOP.PREVIEW()
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
  }
};
</script>

<style>
</style>

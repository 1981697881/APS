<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <!--<el-col :span="4">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>-->
        <el-button-group style="float:right;padding-bottom: 10px;padding-right: 10px">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleAlter">修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="del">删除</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {getMType} from "@/api/basic/index";
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
      if (this.clickData.trId) {
        this.$emit('delList',{
          trId: this.clickData.trId,
        })
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    handleAlter() {
      if (this.clickData.trId) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    upload() {
      this.$emit('uploadList')
    },
      handleAdd(){
          this.$emit('showDialog')

    },
  }
};
</script>

<style>
</style>

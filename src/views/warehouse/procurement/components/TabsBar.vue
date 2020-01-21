<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="2">
          <el-form-item :label="'日期'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item :label="'入库号'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item :label="'采购员'">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item :label="'供应商'">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="handleAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-search" >修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="del">删除</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" >审核</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" >反审核</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" >批量入库</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" >条码打印</el-button>
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
          if (this.clickData.oid) {
              this.$emit('delList',{
                  oid:this.clickData.oid,
              })
          } else {
              this.$message({
                  message: "无选中行",
                  type: "warning"
              });
          }
      },
      handleAdd(){
          this.$emit('showDialog')

    },
  }
};
</script>

<style>
</style>

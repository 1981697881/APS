<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'70px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'仓库'" prop="plaIdS">
            <el-select v-model="parent"  placeholder="请选择" @change="selectWorn">
              <el-option :label="t.positionName" :value="t.piId" v-for="(t,i) in plaArray" :key="i">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click.native="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import {getWarehouseList} from "@/api/basic/index"
export default {
    components: {},
    computed: {
        ...mapGetters(["node","clickData","selections"])
    },
  data() {
    return {
      plaArray: [],
      parent: null,
      search: {
        keyword: null,
      }
    };
  },
  mounted(){
    this.fetchWare(-1)
  },
  methods:{
    // 切换仓库
    selectWorn(val) {
      this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.search.keyword = ''
      this.parent = null
      this.$emit('uploadList')
    },
    fetchWare(val) {
      getWarehouseList(val).then(res => {
        if(res.flag) {
          this.plaArray = res.data
        }
      })
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.keyword != null || this.search.keyword != undefined ? obj.oldCode = this.search.keyword : null
      this.parent != null && this.parent != undefined ? obj.grandpaPiId = this.parent : null
      return obj
    },
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
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
  }
};
</script>

<style>
</style>

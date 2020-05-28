<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'60px'">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-form-item :label="'单号'">
            <el-input v-model="search.shipNo" placeholder="单号" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'旧料号'">
            <el-input v-model="search.oldCode" placeholder="旧料号" />
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
import { mapGetters } from "vuex";
import {getMType} from "@/api/basic/index";
export default {
    components: {},
    computed: {
        ...mapGetters(["node","clickData","selections"])
    },
  data() {
    return {
      search: {
        oldCode: null,
        shipNo: null,
      }
    };
  },
  mounted() {

  },
  methods: {
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.$emit('uploadList')
      this.search.oldCode = ''
      this.search.shipNo = ''
      this.value = ''
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.oldCode != null && this.search.oldCode != '' ? obj.oldCode = this.search.oldCode : null
      this.search.shipNo != null && this.search.shipNo != '' ? obj.shipNo = this.search.shipNo : null
      return obj
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

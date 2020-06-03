<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <!--<el-col :span="4">
          <el-form-item :label="'物料名称'">
            <el-input v-model="search.name" />
          </el-form-item>
        </el-col>-->
        <el-col :span="4">
          <el-form-item :label="'旧料号'">
            <el-input v-model="search.oldCode" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
         <!-- <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handleAlter">修改</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-sort" @click="handleAdd">同步</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    components: {},
    computed: {
        ...mapGetters(["node","clickData","selections"])
    },
  data() {
    return {
      search: {
        name: null,
        oldCode: null,
      }
    };
  },
  methods: {
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.$emit('uploadList')
      this.search.name = ''
      this.search.oldCode = ''
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.name != null && this.search.name != '' ? obj.name = this.search.name : null
      this.search.oldCode != null && this.search.oldCode != '' ? obj.oldCode = this.search.oldCode : null
      return obj
    },
    handleAlter() {
      if (this.clickData.invId) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        })
      }
    },
    handleAdd() {
      this.$emit('showSync')
    },
  }
};
</script>

<style>
</style>

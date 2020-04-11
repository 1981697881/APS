<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="alter">修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="Delivery">删除</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh"    @click="upload">刷新</el-button>
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
        keyword: null
      }
    };
  },

  methods: {
    Delivery() {
      if (this.clickData.eid) {
        this.$confirm('是否删除（' + this.clickData.name + '），删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delList', {
            eid: this.clickData.eid
          })
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
    alter() {
      if (this.clickData.eid) {
        this.$emit('delList', this.clickData)
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        })
      }
    },
    upload() {
      this.$emit("uploadList")
    },
    // 关键字查询
    query() {
      if((typeof this.search.keyword != null) && (this.search.keyword !='')) {
      }
    },
    handleAdd(){
      this.$emit('showDialog')
    }
  }
};
</script>

<style>
</style>

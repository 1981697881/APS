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
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAdd">仓库编辑</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-printer" @click="print">打印</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { PrintStorage } from '@/tools/doPrint'
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
    // 关键字查询
    query(){
        this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.$emit('uploadList')
      this.search.keyword = ''
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.keyword != null || this.search.keyword != undefined ? obj.keyword = this.search.keyword : null
      return obj
    },
    handlerAdd() {
      this.$emit("showDialog")
    },
    // 下载文件
    download(res) {
      if (!res.data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([res.data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', res.headers['content-disposition'].split('filename=')[1])
      document.body.appendChild(link)
      link.click()
    },
    exportData() {
      /*exportAdjust(this.qFilter()).then(res => {
        this.download(res)
      })*/
      this.$message({
        message: "抱歉，功能尚未完善！",
        type: "warning"
      });
    },
    print() {
      if (this.selections.length>0) {
        PrintStorage(this.selections)
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

<template>
  <div class="list-header">
    <el-form  :size="'mini'" :label-width="'50px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'色号'">
            <el-input v-model="search.color" placeholder="色号"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'料号'">
            <el-input v-model="search.itemCode" placeholder="料号"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right;padding-right: 10px">
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-check" @click="notarize">确认</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { salesListSync, exportSales, notarizeList} from "@/api/aftermarket/index"
  export default {
    components: {},
    computed: {
      ...mapGetters(['node','clickData','selections'])
    },
    data() {
      return {
        visible: null,
        value: '',
        search: {
          color: null,
          itemCode: null,
          keyword: null
        }
      }
    },
    methods: {
      notarize() {
        if (this.clickData.soId) {
          notarizeList({soId: this.clickData.soId}).then(res => {
            if(res.flag) {
              this.upload()
            }
          })
          /*this.$emit('showDialog', this.clickData)*/
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          });
        }
      },
      // 查询条件过滤
      qFilter() {
        let obj = {}
        this.search.itemCode != null && this.search.itemCode != '' ? obj.code = this.search.itemCode : null
        this.search.color != null && this.search.color != '' ? obj.oldCode = this.search.color : null
        return obj
      },
      // 关键字查询
      query() {
        this.$emit('uploadList', this.qFilter())
      },
      confirm(form) {
        this.fullscreenLoading = true
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            // if(this.form.value.length > 0) {
            delete this.form.value
            salesListSync(this.form).then(res => {
              this.visible = false
              this.fullscreenLoading = false
              this.upload()
            })
          } else {
            return false
          }
        })
      },
      upload() {
        this.$emit('uploadList')
        this.search.color = ''
        this.search.itemCode = ''
      },
      handleSync() {
        this.visible = true
      },
    }
  };
</script>

<style>
</style>

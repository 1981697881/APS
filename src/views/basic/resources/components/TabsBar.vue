<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-button-group style="float:right">
        <el-dropdown @command="handlerBtn" trigger="click">
          <el-button :size="'mini'" type="primary">
            新增<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">生产线</el-dropdown-item>
            <el-dropdown-item command="2">生产设备</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handlerAlter" trigger="click">
          <el-button :size="'mini'" type="primary">
            修改<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">生产线</el-dropdown-item>
            <el-dropdown-item command="2">生产设备</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handlerDel" trigger="click">
          <el-button :size="'mini'" type="primary">
            删除<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">生产线</el-dropdown-item>
            <el-dropdown-item command="2">生产设备</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button style="float: right" :size="'mini'" icon="el-icon-refresh" type="primary" @click="upload">刷新</el-button>
        <el-button style="float: right" :size="'mini'" type="primary" icon="el-icon-error" @click="disable" >禁用</el-button>
        <el-button style="float: right" :size="'mini'" type="primary" icon="el-icon-success" @click="enable" >启用</el-button>
       <!-- <el-button style="float: right" :size="'mini'" icon="el-icon-view" type="primary" @click="usage">资源使用情况</el-button>-->
      </el-button-group>
    </el-form>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: {
        name: ""
      }
    };
  },
  computed: {
    ...mapGetters(["node","clickData"])
  },
  methods:{
    handlerBtn(command) {
        if(command=="1") {
          this.$emit("showGroupDialog")
        }else if(command=="2") {
            this.$emit("showDialog")
        }
    },
      handlerAlter(command) {
        if(command=="1") {
          if (this.clickData.tpId) {
            this.$emit('showGroupDialog', this.clickData)
          } else {
            this.$message({
              message: "无选中行",
              type: "warning"
            });
          }
        }else if(command=="2") {
          if (this.clickData.plId) {
            this.$emit('showDialog', this.clickData)
          } else {
            this.$message({
              message: "无选中行",
              type: "warning"
            });
          }
        }

      },
    upload() {
      this.$emit('uploadList')
    },
    handlerDel(command) {

      if(command == "1") {
        if (this.clickData.tpId) {
          this.$confirm('是否删除（' + this.clickData.tpName + '），删除后将无法恢复?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('delGroup', this.clickData.tpId)
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
          });
        }
      }else if(command == "2") {
        if (this.clickData.plId) {
          this.$confirm('是否删除（' + this.clickData.plName + '），删除后将无法恢复?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('delList', this.clickData.plId)
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
          });
        }
      }

    },
    disable() {
      if (this.clickData.plId) {
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
      if (this.clickData.plId) {
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
    usage() {
      if (this.clickData.plId) {
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
  }
};
</script>

<style>
</style>

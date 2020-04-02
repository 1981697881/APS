<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-button-group style="float:right">
        <el-dropdown @command="handlerBtn" trigger="click">
          <el-button :size="'mini'" type="primary">
            新增<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">资源类别</el-dropdown-item>
            <el-dropdown-item command="2">生产线</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handlerAlter" trigger="click">
          <el-button :size="'mini'" type="primary">
            修改<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">资源类别</el-dropdown-item>
            <el-dropdown-item command="2">生产线</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handlerDel" trigger="click">
          <el-button :size="'mini'" type="primary">
            删除<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">资源类别</el-dropdown-item>
            <el-dropdown-item command="2">生产线</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button style="float: right" :size="'mini'" icon="el-icon-refresh" type="primary" @click="upload">刷新</el-button>
        <el-button style="float: right" :size="'mini'" type="primary" >启用</el-button>
        <el-button style="float: right" :size="'mini'" type="primary" >禁用</el-button>
        <el-button style="float: right" :size="'mini'" type="primary" >资源使用情况</el-button>
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
          this.$emit('delGroup', this.clickData.tpId)
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          });
        }
      }else if(command == "2") {
        if (this.clickData.plId) {
          this.$emit('delList', this.clickData.plId)
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          });
        }
      }

    },
  }
};
</script>

<style>
</style>

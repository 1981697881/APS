<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-button-group style="float:right">
        <el-dropdown @command="handlerBtn" trigger="click">
          <el-button :size="'mini'" type="primary">
            新增<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">用户组</el-dropdown-item>
            <el-dropdown-item command="2">用户</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handlerAlter" trigger="click">
          <el-button :size="'mini'" type="primary">
            修改<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">用户组</el-dropdown-item>
            <el-dropdown-item command="2">用户</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handlerDel" trigger="click">
          <el-button :size="'mini'" type="primary">
            删除<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">用户组</el-dropdown-item>
            <el-dropdown-item command="2">用户</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button style="float: right" :size="'mini'" type="primary" >权限管理</el-button>
        <el-button style="float: right" :size="'mini'" type="primary" >权限浏览</el-button>
        <el-button style="float: right" :size="'mini'" type="primary" >启用</el-button>
        <el-button style="float: right" :size="'mini'" type="primary" >禁用</el-button>
        <el-button style="float: right" :size="'mini'" type="primary" >保存权限</el-button>
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
  methods: {
    handlerBtn(command) {
      if(command=="1") {
        this.$emit("showGroupDialog")
      }else if(command=="2") {
        this.$emit("showDialog")
      }
    },
      handlerAlter(command) {
        if(command=="1") {
          if (this.clickData.gpId) {
            this.$emit('showGroupDialog', this.clickData)
          } else {
            this.$message({
              message: "无选中行",
              type: "warning"
            });
          }
        }else if(command=="2") {
          console.log(this.clickData)
          if (this.clickData.uid) {
            this.$emit('showDialog', {uid: this.clickData.uid})
          } else {
            this.$message({
              message: "无选中行",
              type: "warning"
            });
          }
        }

      },
    handlerDel(command) {
      if(command=="1") {
        if (this.clickData.gpId) {
          this.$emit('delGroup', this.clickData.gpId)
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          });
        }
      }else if(command=="2") {
        if (this.clickData.uid) {
          this.$emit('delList', this.clickData.uid)
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

<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-button-group style="float:right">
        <el-button :size="'mini'" type="primary" @click="handlerAdd">新建</el-button>
        <el-button :size="'mini'" type="primary" @click="handlerAlter">保存</el-button>
        <el-button :size="'mini'" type="primary" @click="del">删除</el-button>
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
    handleTab(node){
      if(node){
        console.log(node.data.type)
        if(node){

        }
      }else{
        this.$message({
          type:"warning",
          message:"请先选择房产"
        })
      }
    },
      handlerAdd() {
        this.$emit("reset")
    },
      del() {
          if (this.clickData.oowId) {
                  this.$emit('del', this.clickData.oowId)
              } else {
                  this.$message({
                      message: "无选中行",
                      type: "warning"
                  });
              }
      },
      handlerAlter() {
        this.$emit('handlerSave')
      }
  }
};
</script>

<style>
</style>

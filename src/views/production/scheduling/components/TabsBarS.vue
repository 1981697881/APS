<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" >调整生产</el-button>
        </el-col>
        <el-col :span="2" >
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" >暂停生产</el-button>
        </el-col>
        <el-col :span="2" >
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" >再次生产</el-button>
        </el-col>
        <el-col :span="2" >
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" >结束生产</el-button>
        </el-col>
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
                search:null
            };
        },

        methods:{

        }
    };
</script>

<style>
</style>

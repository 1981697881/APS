<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-button-group style="float:right">
          <!--<el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleAdd">添加</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="del">删除</el-button>-->
          <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getByUserAndPrId } from '@/api/system/index'
export default {
  components: {},
  computed: {
    ...mapGetters(['node','clickData','selections'])
  },
  data() {
    return {
      btnList: [],
      search: {
        keyword: null
      }
    }
  },

  mounted() {
    let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });
  },
  methods: {
    onFun(method, event){
      this[method](event)
    },
    del(){
      if (this.clickData.oid) {
        this.$emit('delList',{
          oid:this.clickData.oid,
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    // 关键字查询
    query(){
      if((typeof this.search.keyword != null) && (this.search.keyword !='')){
      }
    },
    handleAdd(){
      this.$emit('showDialog')
    },
  }
};
</script>

<style>
</style>

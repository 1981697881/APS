<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'60px'">
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
        <el-col :span="4">
          <el-form-item :label="'料号'">
            <el-input v-model="search.code" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'合格'" >
            <el-select v-model="search.status" placeholder="请选择" @change="selectChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'仓库'" prop="plaIdS">
            <el-select v-model="parent"  placeholder="请选择" @change="selectWorn">
              <el-option :label="t.positionName" :value="t.piId" v-for="(t,i) in plaArray" :key="i">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <!--<el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handleAlter">库位编辑</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-sort" @click="handleAdd">同步</el-button>-->
          <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getByUserAndPrId } from '@/api/system/index'
import {getWarehouseList} from '@/api/basic/index'
export default {
  components: {},
  computed: {
    ...mapGetters(['node','clickData','selections'])
  },
  data() {
    return {
      plaArray: [],
      parent: null,
      search: {
        name: null,
        oldCode: null,
        status: null,
        code: null,
      },
      btnList: [],
      options: [{
        value: 1,
        label: '是'
      }, {
        value: 2,
        label: '否'
      }],
    };
  },
  mounted(){
    this.fetchWare(-1)
    let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });
  },
  methods: {
    onFun(method){
      this[method]()
    },
    fetchWare(val) {
      getWarehouseList(val).then(res => {
        if(res.flag) {
          this.plaArray = res.data
        }
      })
    },
    selectChange(val) {
      this.status = val
      this.$emit('queryBtn', this.qFilter())
    },
    // 切换仓库
    selectWorn(val) {
      this.$emit('queryBtn', this.qFilter())
    },
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.search.name = ''
      this.search.oldCode = ''
      this.search.code = ''
      this.search.status = ''
      this.parent = null
      this.$emit('uploadList')
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.name != null && this.search.name != '' ? obj.name = this.search.name : null
      this.search.code != null && this.search.code != '' ? obj.code = this.search.code : null
      this.search.status != null && this.search.status != '' ? obj.status = this.search.status : null
      this.parent != null && this.parent != '' ? obj.piId = this.parent : null
      this.search.oldCode != null && this.search.oldCode != '' ? obj.oldCode = this.search.oldCode : null
      return obj
    },
    handleAlter() {
      this.$emit('showDialog', this.clickData)
    },
    handleAdd() {
      this.$emit('showSync')
    },
  }
};
</script>

<style>
</style>

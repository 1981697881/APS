<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'60px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'日期'">
            <el-date-picker
              v-model="value"
              type="daterange"
              align="right"
              style="width: auto"
              class="input-class"
              unlink-panels
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'料号'">
            <el-input v-model="search.goodCode" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'旧料号'">
            <el-input v-model="search.oldCode" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'库位号'">
            <el-input v-model="search.positionCode" />
          </el-form-item>
        </el-col>
        <el-col :span="1.5">
          <el-form-item :label-width="'10px'">
            <el-checkbox v-model="showZero" @change="clickChange">0库存</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="2.2">
          <el-form-item :label-width="'0px'">
            <el-checkbox v-model="showSort" @change="clickChange2">按时间排序</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="1.5">
          <el-form-item :label-width="'0px'">
            <el-checkbox v-model="lotNoMerge" @change="clickChange3">批号</el-checkbox>
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
        <el-button-group style="float:right">
          <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>
         <!-- <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
           <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handleAlter">修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click.native="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {exportStorageBin} from '@/api/warehouse/index'
import {getWarehouseList} from '@/api/basic/index'
import { getByUserAndPrId } from '@/api/system/index'
export default {
  components: {},
  computed: {
    ...mapGetters(['node','clickData','selections'])
  },
  data() {
    return {
      value: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      parent: null,
      showZero: false,
      lotNoMerge: false,
      showSort: true,
      plaArray: [],
      btnList: [],
      search: {
        oldCode: null,
        goodCode: null,
        type: null,
        positionCode: null,
      }
    };
  },
  mounted() {
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
    clickChange(val) {
      this.showZero = val
      this.$emit('queryBtn', this.qFilter())
    },
    clickChange2(val) {
      this.showSort = val
      this.$emit('queryBtn', this.qFilter())
    },
    clickChange3(val) {
      this.lotNoMerge = val
      this.$emit('onlist', val)
      this.$emit('queryBtn', this.qFilter())
    },
    // 切换仓库
    selectWorn(val) {
      this.$emit('queryBtn', this.qFilter())
    },
    fetchWare(val) {
      getWarehouseList(val).then(res => {
        if(res.flag) {
          this.plaArray = res.data
        }
      })
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
    upload() {
      this.search.oldCode = ''
      this.search.goodCode = ''
      this.search.positionCode = ''
      this.showSort = true
      this.showZero = false
      this.lotNoMerge = false
      this.value = ''
      this.parent = null
      this.$emit('uploadList')
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.oldCode != null && this.search.oldCode != '' ? obj.oldCode = this.search.oldCode : null
      this.search.goodCode != null && this.search.goodCode != '' ? obj.goodCode = this.search.goodCode : null
      this.search.positionCode != null && this.search.positionCode != '' ? obj.positionCode = this.search.positionCode : null
      this.parent != null && this.parent != undefined ? obj.grandpaPiId = this.parent : null
      this.showZero != null && this.showZero != undefined ? obj.showZero = this.showZero : null
      this.showSort != null && this.showSort != undefined ? obj.showSort = this.showSort : null
      this.lotNoMerge != null && this.lotNoMerge != undefined ? obj.lotNoMerge = this.lotNoMerge : null
      this.value != null && this.value != undefined ? obj.endDate = this.value[1] : null
      this.value != null && this.value != undefined ? obj.startDate = this.value[0] : null
      return obj
    },
    exportData() {
      exportStorageBin(this.qFilter()).then(res => {
        this.download(res)
      })
    },
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    handleAlter() {
      if (this.clickData.invId) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
  }
};
</script>
<style>
</style>

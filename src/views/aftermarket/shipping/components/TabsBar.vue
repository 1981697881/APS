<template>
  <div class="list-header">
    <el-form  :size="'mini'" :label-width="'50px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'日期'">
            <el-date-picker
              v-model="value"
              type="daterange"
              style="width: auto"
              align="right"
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
        <el-col :span="4">
          <el-form-item :label="'单号'">
            <el-input v-model="search.keyword" placeholder="单号"/>
          </el-form-item>
        </el-col>
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
          <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>
          <!--<el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>-->
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { salesListSync, exportSales, notarizeList} from '@/api/aftermarket/index'
import { getByUserAndPrId } from '@/api/system/index'
export default {
  components: {},
  computed: {
    ...mapGetters(['node','clickData','selections'])
  },
  data() {
    return {
      visible: null,
      fullscreenLoading: false,
      form: {
        docNo: '',
        customeCode: '',
        customerName: '',
        itemCode: '',
        itemName: '',
        color: '',
        orgCode: '901',
        businessDateStart: '',
        businessDateEnd: '',
        value: [],
      },
      btnList: [],
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
      search: {
        color: null,
        itemCode: null,
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
    onFun(method){
      this[method]()
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
     /* exportSales(this.qFilter()).then(res => {
        this.download(res)
      })*/
      this.$emit('exportData')
    },
    changeDate(val) {
      this.form.businessDateEnd = val[1]
      this.form.businessDateStart = val[0]
    },
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
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.keyword != null && this.search.keyword != '' ? obj.docNo = this.search.keyword : null
      this.search.itemCode != null && this.search.itemCode != '' ? obj.itemCode = this.search.itemCode : null
      this.search.color != null && this.search.color != '' ? obj.color = this.search.color : null
      this.value != null && this.value != undefined ? obj.businessDateEnd = this.value[1] : null
      this.value != null && this.value != undefined ? obj.businessDateStart = this.value[0] : null
      return obj
    },
    // 关键字查询
    query() {
      this.$emit('uploadList', this.qFilter())
    },
    upload() {
      this.$emit('uploadList')
      this.search.keyword = ''
      this.search.color = ''
      this.search.itemCode = ''
      this.value = ''
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
       /*   }else{
            this.$message({
              message: '请选择时间',
              type: 'warning'
            });
          }*/
        } else {
          return false
        }
      })
    },

    handleSync() {
      this.visible = true
    },
  }
};
</script>

<style>
</style>

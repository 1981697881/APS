<template>
  <div class="list-header">
    <el-form  :size="'mini'" :label-width="'70px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'订单日期'">
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
        <el-col :span="3">
          <el-form-item :label="'状态'" :label-width="'70px'">
            <el-select v-model="isConfirm" placeholder="请选择" @change="selectChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right;padding-right: 10px">
          <el-button :size="'mini'" type="primary" icon="el-icon-warning" @click="errorInfo">异常排程信息</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="handleSync">U9同步</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-check" @click="notarize">核准</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="open">日期修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>
        </el-button-group>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="确认信息"
      v-if="visible"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <el-form :model="form" ref="form" label-width="120px" :size="'mini'">
        <el-row :gutter="20" >
          <el-col :span="12">
            <el-form-item :label="'单号'" >
              <el-input v-model="form.docNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'组织编码'" >
              <el-input v-model="form.orgCode" readOnly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'物料名'" >
              <el-input v-model="form.itemName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'物料编码'" >
              <el-input v-model="form.itemCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'色号'" >
              <el-input v-model="form.color"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'客户名称'" >
              <el-input v-model="form.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'客户编码'" >
              <el-input v-model="form.customeCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" >
            <el-form-item :label="'日期'" >
              <el-date-picker
                v-model="form.value"
                type="daterange"
                style="width: auto"
                align="right"
                unlink-panels
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeDate"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="primary" @click.native="confirm('form')" v-loading.fullscreen.lock="fullscreenLoading">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { salesListSync, exportSales, notarizeBatchList} from "@/api/aftermarket/index"
  import { updateSaleOrderDetail} from "@/api/production/index"
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
        options: [{
          value: true,
          label: '已排产'
        }, {
          value: false,
          label: '未排产'
        }],
        isConfirm: false,
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
    methods: {
      open() {
        if (this.clickData) {
          if(this.clickData.factoryEstimatedDate.indexOf("KC") !== -1){
            this.$emit('showDialogT')
           /* this.$prompt('请输入', '厂务预计出货日期', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputValue: this.clickData.factoryEstimatedDate,
            }).then(({ value }) => {
              updateSaleOrderDetail({soDeId: this.clickData.soDeId, factoryEstimatedDate: value}).then(res => {
                if(res.flag) {
                  this.$emit('uploadList')
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });
            });*/
          }
        } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
       }
      },
      selectChange(val) {
        this.isConfirm = val
        this.$emit('uploadList')
      },
      errorInfo() {
        this.$emit('showDialog')
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
        exportSales(this.qFilter()).then(res => {
          this.download(res)
        })
      },
      changeDate(val) {
        this.form.businessDateEnd = val[1]
        this.form.businessDateStart = val[0]
      },
      notarize() {
        if (this.selections.length>0) {
          const selection = this.selections
          let arrray = []
          selection.forEach((item, index) => {
            if(arrray.indexOf(item.soId) == -1){
              arrray.push(item.soId)
            }
          })
          notarizeBatchList({soIds: arrray}).then(res => {
            if(res.flag) {
              this.$emit('queryBtn', this.qFilter())
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
        this.search.keyword != null && this.search.keyword != '' ? obj.docNo = this.search.keyword : null
        this.search.itemCode != null && this.search.itemCode != '' ? obj.itemCode = this.search.itemCode : null
        this.search.color != null && this.search.color != '' ? obj.color = this.search.color : null
        this.value != null && this.value != undefined ? obj.businessDateEnd = this.value[1] : null
        this.value != null && this.value != undefined ? obj.businessDateStart = this.value[0] : null
        obj.isConfirm = this.isConfirm
        return obj
      },
      // 关键字查询
      query() {
        this.$emit('queryBtn', this.qFilter())
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
                   message: "请选择时间",
                   type: "warning"
                 });
               }*/
          } else {
            return false
          }
        })
      },
      upload() {
        this.search.keyword = ''
        this.search.color = ''
        this.search.itemCode = ''
        this.value = ''
        this.isConfirm = false
        this.$emit('uploadList')
      },
      handleSync() {
        this.visible = true
      },
    }
  };
</script>

<style>
</style>

<template>
  <div>
    <el-form :model="form" ref="form" label-width="80px" :size="'mini'">
      <el-row :gutter="20" v-for="(t,i) in dateList" :key="i">
        <el-col :span="12">
          <el-form-item :label="'日期'">
            <div class="block" >
              <el-date-picker
                v-model="t.factoryEstimatedDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item :label-width="'40px'" v-if="i>0">
              <el-button  @click="delRow(t, i)">删除</el-button>
            </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;margin-top: 50px">
      <el-button type="success" @click.native="add('form')">添加</el-button>
      <el-button type="primary" @click.native="confirm('form')">保存</el-button>
    </div>
  </div>
</template>
<script>
  import { updateSaleOrderDetail } from "@/api/production/index"
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['clickData'])
    },
    props: {
      listInfo: {
        type: Object,
        default: null
      },
    },
    data() {
      return {
        dateList: [],
        loading: false,
        form: {
          soDeId: null
        }
      }
    },
    mounted() {
      this.form.soDeId = this.listInfo.soDeId
      if(this.listInfo.factoryEstimatedDate.length > 0){
        if(this.listInfo.factoryEstimatedDate == 'KC'){
          this.dateList.push({
            factoryEstimatedDate: null
          })
        }else{
          let dateList = this.listInfo.factoryEstimatedDate.split(',')
          dateList.forEach((item, index) =>{
            if(item == 'KC') {
              this.dateList.push({
                factoryEstimatedDate: null
              })
            }else{
              this.dateList.push({
                factoryEstimatedDate: item
              })
            }
          })
        }
      } else {
        this.dateList.push({
          factoryEstimatedDate: null
        })
      }
      console.log(this.dateList)
    },
    methods: {
      delRow(item, index) {
        this.dateList.splice(index, 1);
      },
      add() {
        let dList = this.dateList
        let isTrue = true
        dList.some((item, index) => {
          if(item.factoryEstimatedDate == null || item.factoryEstimatedDate == '') {
            isTrue = false
            return true
          }
        })
        if(isTrue){
          this.dateList.push({
            factoryEstimatedDate: null
          })
        }else{
          this.$message({
            type: 'info',
            message: '请填写完，再添加'
          });
        }
      },
      confirm() {
        let dList = this.dateList
        let dateStr = []
        dList.forEach((item, index) => {
          if(item.factoryEstimatedDate != null && item.factoryEstimatedDate != ''){
            dateStr.push(item.factoryEstimatedDate)
          }
        })
          //判断必填项
          if (dateStr.length > 0) {
            updateSaleOrderDetail({soDeId: this.form.soDeId, factoryEstimatedDate: dateStr.toString()}).then(res => {
              if (res.flag) {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              }
            })
          } else {
            return false
          }
      },
    }
  };
</script>

<style>
</style>

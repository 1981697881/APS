<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'日期'" prop="factoryEstimatedDate">
            <div class="block" >
              <el-date-picker
                v-model="form.factoryEstimatedDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-form-item :label-width="'0px'" >
              <el-button @click="setRow">选择</el-button>
            </el-form-item>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;margin-top: 50px">
      <el-button type="primary" @click.native="confirm('form')">添加</el-button>
      <el-button type="primary" @click.native="confirm('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { updateSaleOrderDetail } from "@/api/aftermarket/index"
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['clickData'])
    },
    props: {
      soDeId: {
        type: String,
        default: null
      },
    },
    data() {
      return {
        loading: false,
        form: {
          soDeId: null
        }
      }
    },
    mounted() {
      this.form.soDeId = this.soDeId
    },
    methods: {
      confirm() {
        this.$refs['form'].validate((valid) => {
          //判断必填项
          if (valid) {
            updateSaleOrderDetail({soDeId: this.clickData.soDeId, factoryEstimatedDate: ''}).then(res => {
              if (res.flag) {
                this.$emit('hideDialogT', false)
                this.$emit('uploadList')
              }
            })
          } else {
            return false
          }
        })
      },
    }
  };
</script>

<style>
</style>

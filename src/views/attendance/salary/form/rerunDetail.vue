<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="120px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'部门'">
            <el-select v-model="form.deptNumber" class="width-full"  placeholder="请选择部门" @change="selectChange">
              <el-option :label="t.deptName" :value="t.deptId" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'职员'">
            <el-select v-model="form.empNumbers" filterable multiple  class="width-full"  placeholder="请选择职员" >
              <el-option v-for="(t,i) in rArray" :label="t.name" :value="t.eid" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'日期'" prop="date">
            <el-date-picker
              v-model="form.date"
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
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click.native="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { attendCal } from "@/api/attendance/index"
  import { getFrameList, getClerkList } from '@/api/basic/index'
  export default {
    data() {
      return {
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
        num1: 1,
        visible: false,
        pArray: [],
        rArray: [],
        form: {
          empNumbers: null,
          deptNumber: '',
          beginDate: null,
          endDate: null,
          date: '',
        },
        rules: {
          date: [
            { type: 'array', required: true, message: '请选择日期', trigger: 'change' }
          ],
        },
        loading: false,
        obj: {},
        type: null,
      };
    },
    created() {
      this.fetchFormat()
    },
    mounted() {

    },
    methods: {
      // 切换类别
      selectChange(val) {
        console.log(val)
      this.form.empNumbers = []
        this.rArray = []
        let arr = []
        arr.push(val)
        this.fetchLine(arr)
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            let obj = {}
            this.form.empNumbers.length > 0 && this.form.empNumbers != null ? obj.empNumbers = this.form.empNumbers.toString() : null
            this.form.deptNumber != null && this.form.deptNumber != undefined ? obj.deptNumber = this.form.deptNumber : null
            this.form.date != null && this.form.date != undefined ? obj.beginDate = this.form.date[0] : null
            this.form.date != null && this.form.date != undefined ? obj.endDate = this.form.date[1] : null
            attendCal({ empNumbers: this.form.empNumbers.toString(),
              deptNumber: this.form.deptNumber,
              beginDate: this.form.date[0],
              endDate: this.form.date[1]}).then(res => {
              this.$emit('hideDialog')
              this.$emit('uploadList')
            });
          }else {
            return false
          }
        })
      },
      fetchLine(val){
        const data = {
          pageNum: 1,
          pageSize: 1000,
        };
        getClerkList(data, { disable: false, deptIds: val }).then(res => {
          this.rArray = res.data.records
        });
      },
      fetchFormat() {
        const data = {
          pageNum: 1,
          pageSize: 1000,
        };
        getFrameList(data,{ disable: false }).then(res => {
          this.pArray = res.data.records
        });

      },
    }
  };
</script>

<style>
</style>

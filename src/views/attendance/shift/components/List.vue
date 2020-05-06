<template>
  <div style="padding-top: 25px;">
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item :label="'oowId'" style="display: none;">
              <el-input v-model="form.oowId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'班次代码'" prop="oowCode">
              <el-input v-model="form.oowCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'班次名称'" prop="oowName">
              <el-input v-model="form.oowName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :label="'取卡最早时间'" prop="punchTimeLimit">
                <el-time-picker
                  arrow-control
                  v-model="form.punchTimeLimit"
                  :picker-options="{
                selectableRange: '5:30:00 - 12:30:00'
               }"
                  value-format="HH:mm:ss"
                  placeholder="任意时间点">
                </el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'取卡最晚时间'" prop="punchTimeLast">
                <el-time-picker
                  arrow-control
                  v-model="form.punchTimeLast"
                  :picker-options="{
                selectableRange: '16:30:00 - 23:30:00'
               }"
                  value-format="HH:mm:ss"
                  placeholder="任意时间点">
                </el-time-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :label="'迟到允许值'" prop="allowedLateNum">
                <el-input  v-model="form.allowedLateNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'早退允许值'" prop="allowEarlyDeparture">
                <el-input v-model="form.allowEarlyDeparture"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :label="'加班起始值'" prop="overtimeAllowableValue">
                <el-input  v-model="form.overtimeAllowableValue"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'取整分钟数'" prop="takeWholeMinutes">
                <el-input v-model="form.takeWholeMinutes"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <div style="margin-top: 20px">
              <el-button @click="setRow">添加</el-button>
            </div>
              <el-table class="list-main" :data="list" border size="mini" :highlight-current-row="true"  @row-dblclick="dblclick" @row-click="rowClick">
                <el-table-column
                  v-for="(t,i) in columns"
                  :key="i"
                  align="center"
                  :prop="t.name"
                  :label="t.text"
                  v-if="t.default!=undefined?t.default:true"
                  :width="t.width?t.width:''"
                ></el-table-column>
              </el-table>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import {getShiftInfoList, shiftAdd, shiftAlter, getShiftClerkList} from "@/api/attendance/index";
  export default {
    data() {
      return {
        form: {
          allowEarlyDeparture: null,
          allowedLateNum: null,
          oowCode: null,
          oowId: null,
          oowName: null,
          overtimeAllowableValue: null,
          punchTimeLast: null,
          punchTimeLimit: null,
          takeWholeMinutes: null,
        },
        pidS: [],
        list: [],
        columns: [
          { text: "上班时间", name: "startTime" },
          { text: "下班时间", name: "endTime" },
        ],
        pArray:[],
        rules: {
          allowEarlyDeparture: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ],
          allowedLateNum: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ],
          oowCode: [
            {required: true, message: '请输入编码', trigger: 'blur'},
          ],
          oowName: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
          overtimeAllowableValue: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ],
          punchTimeLast: [
            {required: true, message: '请输入值', trigger: 'change'},
          ],
          punchTimeLimit: [
            {required: true, message: '请输入值', trigger: 'change'},
          ],
          takeWholeMinutes: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ],
        },
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      setList(val) {
        this.list = []
        this.list.push(val)
      },
      setRow() {
        this.$emit('showDialog')
      },
      reset() {
        this.$refs.form.resetFields()
        this.form.oowId = null
        this.list = []
      },
      dblclick(obj) {
        this.$emit('showDialog', obj)
      },
      //监听单击某一行
      rowClick(obj) {
        this.$store.dispatch("list/setClickData", obj);
      },
      saveData() {
        this.$refs["form"].validate((valid) => {
          //判断必填项
          if (valid) {
            //修改
            this.form.workingHoursList = this.list
            if (typeof (this.form.oowId) != undefined && this.form.oowId != null) {
              shiftAlter(this.form).then(res => {
                this.$emit('uploadList')
              });
              //保存
            }else{
              shiftAdd(this.form).then(res => {
                this.$emit('uploadList')
              });
            }
          }else {
            return false
          }
        })
      },
      fetchData(val) {
        this.loading = true
        getShiftInfoList(val).then(res => {
          if(res.flag) {
            this.loading = false
            this.list = res.data['workingHoursList']
            this.form = res.data
          }
        });
      }
    }
  };
</script>

<style>
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100% !important;
  }
</style>

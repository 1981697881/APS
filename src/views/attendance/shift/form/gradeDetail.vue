<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'" label-width="60px">
      <el-row :gutter="20">
        <el-col :span="10" >
          <el-form-item :label="'班次'" prop="oowId">
            <el-select v-model="form.oowId" class="width-full" placeholder="请选择班次" >
              <el-option :label="t.oowName" :value="t.oowId" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item :label="'职员'">
            <el-input v-model="name" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button  :size="'mini'" type="success" @click="query" icon="el-icon-search">查询</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <list
          style="height: 200px"
          :columns="columns"
          :loading="loading"
          :list="list"
          index
          type
          @selection-change="handleSelectionChange"
          />
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 60px">
      <el-button type="primary" @click="saveData">排班</el-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex"
  import List from "@/components/List"
  import {empBind, getShiftList} from "@/api/attendance/index"
  import {getClerkList} from "@/api/basic/index"
  export default {
    components: {
      List
    },
    computed: {
      ...mapGetters(['selections'])
    },
    props: {
      listInfo: {
        type: Object,
        default: null
      },
    },
    data() {
      return {
        loading: false,
        form: {
          oowId: null,
        },
        name: null,
        multipleSelection: [],
        list: {},
        columns: [
          { text: "uid", name: "uid",default: false },
          { text: "deptIds", name: "deptIds",default: false },
          { text: "职员编码", name: "jobNum" },
          { text: "职员名称", name: "name" },
          { text: "部门", name: "deptNames" },
          { text: "联系地址", name: "address" },
          { text: "联系电话", name: "tel" },
          { text: "描述", name: "remark" },
        ],
        pArray: [],
        rules: {
          oowId: [
            {required: true, message: '请选择班次', trigger: 'change'},
          ],
        },
      }
    },
    mounted() {
      this.formatData()
      this.fetchData()
      if(this.listInfo) {
        this.fetchData(this.listInfo.name)
      }
    },
    methods: {
      // 监听多选 参数-所有选中的值
      handleSelectionChange(val){
        this.$store.dispatch('list/setSelections', val)
      },
      saveData() {
        this.$refs["form"].validate((valid) => {
          //判断必填项
          if (valid) {
            const selections = this.selections
            const array = []
            selections.forEach((item, index) => {
              let obj = {}
              eval("obj.eid='" + item.eid + "'")
              eval("obj.oowId='" + this.form.oowId + "'")
              array.push(obj)
            })
            empBind(array).then(res => {
                this.$emit('hideDialog')
                this.$emit('uploadList')
              });
          } else {
            return false
          }
        })
      },
      query() {
        if(this.name != null && this.name != ''){
          this.fetchData({name: this.name})
        }
      },
      fetchData(val, data = {
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 50
      }) {
        this.loading = true;
        getClerkList(data, val).then(res => {
          this.loading = false;
          this.list = res.data;
        });
      },
      formatData() {
        getShiftList().then(res => {
          if(res.flag) {
            this.pArray = res.data
          }
        });
      }
    }
  };
</script>

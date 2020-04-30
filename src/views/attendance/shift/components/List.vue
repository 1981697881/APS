<template>
  <div style="padding-top: 25px;">
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item :label="'班次代码'" prop="roleName">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'班次名称'" prop="roleName">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :label="'取卡最早时间'" prop="roleName">
                <el-input  v-model="form.desc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'取卡最晚时间'" prop="roleName">
                <el-input v-model="form.roleName"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :label="'迟到允许值'" prop="roleName">
                <el-input  v-model="form.desc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'早退允许值'" prop="roleName">
                <el-input v-model="form.roleName"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item :label="'加班起始值'" prop="roleName">
                <el-input  v-model="form.desc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'取整分钟数'" prop="roleName">
                <el-input v-model="form.roleName"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'加班需要加班单'" prop="roleName">
              <el-checkbox v-model="form.checked"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div style="margin-top: 20px">
              <el-button @click="setRow">添加</el-button>
            </div>
              <el-table class="list-main" :data="list" border size="mini" :highlight-current-row="true"  @dblclick="dblclick" @row-click="rowClick">
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
  import {FrameAdd,updateRoles,getSuperior,getCompany} from "@/api/system/permissions";
  export default {
    props: {
      rid: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        form: {
          checked: true,
          rid: null,
          roleName: null, // 名称
          roleLevel:null,
        },
        pidS: [],
        list: [],
        columns: [
          { text: "上班时间", name: "" },
          { text: "段内休息", name: "" },
          { text: "下班时间", name: "" },
          { text: "出勤类型", name: "" }
        ],
        pArray:[],
        rules: {
          roleName: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
          roleLevel: [
            {required: true, message: '请选择等级', trigger: 'change'},
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
        this.list.push(val)
      },
      setRow() {
        this.$emit('showDialog')
      },
      reset() {
        this.$refs.form.resetFields()
      },
      dblclick(obj) {
        this.$emit('showDialog', obj.row)
      },
      //监听单击某一行
      rowClick(obj) {
        this.$store.dispatch("list/setClickData", obj);
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            //修改
            if (typeof (this.form.rid) != undefined && this.form.rid != null) {
              updateRoles(this.form).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
              //保存
            }else{
              FrameAdd(this.form).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
            }
          }else {
            return false;
          }
        })
      },
      fetchFormat() {
        //获取公司、上级下拉
        getSuperior().then(res => {
          this.pArray = res.data;
        });
        getCompany().then(res => {
          this.pArray = res.data;
        });
      },
      fetchData(val) {
      }
    }
  };
</script>

<style>
</style>

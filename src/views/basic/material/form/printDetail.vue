<template>
  <div>
    <el-form v-model="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'gid'" style="display: none">
            <el-input v-model="form.gid"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-table :data="list" border :height="'250px'" stripe size="mini" :highlight-current-row="true" >
          <el-table-column prop="date" label="序号" type="index" sortable></el-table-column>
          <el-table-column
            v-for="(t,i) in columns"
            :key="i"
            :prop="t.name"
            :label="t.text"
            :width="t.width?t.width:'120px'"
            v-if="t.default!=undefined?t.default:true"
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button  type="text" size="small"  @click.native="alterNum(scope.row)">打印</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="新增"
      v-if="visible"
      :width="'30%'"
      v-dialogDrag
      destroy-on-close
      append-to-body
    >
      <el-form :rules="rules" :model="form">
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="12">
            <el-form-item :label="'每托/桶或箱'">
              <el-input-number v-model="apiece"  label="请输入数量" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'打印/张'">
              <el-input-number v-model="printingQuantity" label="请输入数量" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="12">
            <el-form-item :label="'打印模板'" prop="printModel">
              <el-select v-model="form.printModel" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'打印批号'" prop="lotNo">
              <!--<el-input-number v-model="repeat"  label="请输入数量" :min="0"></el-input-number>-->
              <el-input v-model="form.lotNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click.native="saveNum('form')">确定</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="success" @click.native="add">新增</el-button>
    </div>
  </div>
</template>

<script>
  import { getMattersPrint } from "@/api/basic/index";

  export default {
    props: {
      listInfo: {
        type: Object,
        default: null
      },
    },
    data() {
      return {
        visible: false,
        form: {
          gid: null,
          printModel: null,
        },
        rules: {
          printModel: [
            {required: true, message: '请输入模板', trigger: 'change'},
          ],lotNo: [
            {required: true, message: '请输入编码', trigger: 'blur'},
          ],
        },
        repeat: 0,
        printingQuantity: 1,
        apiece: 0,
        printModel: null,
        loading: false,
        options: [{
          value: '0',
          label: '自有产品标签'
        }, {
          value: '1',
          label: 'OEM产品_加固剂&防水宝标签'
        }, {
          value: '2',
          label: 'OEM产品_美瓷胶标签'
        }, {
          value: '3',
          label: '色石&Base标签'
        }, {
          value: '4',
          label: '美瓷胶标签'
        }],
        list: [],
        columns: [
          { text: "gid", name: "gid",default:false },
          { text: "U9料号", name: "goodCode" },
          { text: "名称", name: "goodName" },
          { text: "旧料号", name: "oldCode" },
          { text: "规格", name: "spec" },
          { text: "批号", name: "lotNo" },
          { text: "打印时间", name: "" },
        ],
      };
    },
    created() {
    },
    mounted() {
      this.form.gid = this.listInfo.gid
      if (this.form.gid) {
        this.fetchData(this.listInfo.gid)
      }
    },
    methods: {
      //修改数量
      alterNum(row) {
        this.form = row;
        this.visible = true;
      },
      saveNum(form){
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            this.visible = false
          }else{
            return false;
          }
        })

      },
      add() {
        this.visible = true
      },
      fetchData(val) {
        getMattersPrint(val).then(res => {
          this.list = res.data;
        });
      },
    }
  };
</script>

<style>
</style>

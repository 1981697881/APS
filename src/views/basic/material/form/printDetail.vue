<template>
  <div>
    <el-form  label-width="100px" :size="'mini'">
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
      <el-form :model="form" :rules="rules" ref="form" >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'gid'" style="display: none">
              <el-input v-model="form.gid"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="12">
            <el-form-item :label="'每箱支数'">
              <el-input-number v-model="apiece"  label="请输入数量" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'打印/张'" prop="printingQuantity">
              <el-input-number v-model="form.printingQuantity" label="请输入数量" :min="1"></el-input-number>
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
  import { getMattersPrint, barcodeGoods } from "@/api/basic/index"
  import {PrintAccount, PrintThree, PrintTwo1, PrintTwo2, PrintTwo3, PrintTwo4} from "@/tools/doPrint"
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
          lotNo: null,
          printModel: null,
          printingQuantity: 1,
        },
        rules: {
          printModel: [
            {required: true, message: '请选择模板', trigger: 'change'},
          ],printingQuantity: [
            {required: true, message: '请输入数量', trigger: 'change'},
          ],lotNo: [
            {required: true, message: '请输入编码', trigger: 'blur'},
          ],
        },
        repeat: 0,
        apiece: 0,
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
          label: '半成品_色石&Base标签'
        }, {
          value: '4',
          label: '半成品_美瓷胶标签'
        }, {
          value: '5',
          label: '外购物料标签'
        }],
        list: [],
        columns: [
          { text: "gid", name: "gid",default:false },
          { text: "U9料号", name: "goodCode" },
          { text: "名称", name: "goodName" },
          { text: "旧料号", name: "oldCode" },
          { text: "规格", name: "spec" },
          { text: "批号", name: "lotNo" },
          { text: "打印时间", name: "createTime" },
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
      alterNum(row) {
        this.form = row
        this.form.color = row.oldCode
        this.isLog = true
        this.visible = true
      },
      printType(type, data) {
        console.log(data)
       if(type == "0"){
         PrintAccount(data, this.form.printingQuantity)
         LODOP.PREVIEW()
       }else if(type == "1"){
         PrintTwo1(data, this.form.printingQuantity)
         LODOP.PREVIEW()
       }else if(type == "2"){
         PrintTwo2(data, this.form.printingQuantity, this.apiece)
         LODOP.PREVIEW()
       }else if(type == "3"){
         PrintTwo3(data, this.form.printingQuantity)
         LODOP.PREVIEW()
       }else if(type == "4"){
         PrintTwo4(data, this.form.printingQuantity)
         LODOP.PREVIEW()
       }else if(type == "5"){
         PrintThree(data)
         LODOP.PREVIEW()
       }
      },
      saveNum(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            if (this.isLog) {
              this.printType(this.form.printModel, [this.form])
            } else {
              barcodeGoods({barcodeList:[{gid: this.form.gid,
                  printNum: this.form.printingQuantity,
                  lotNo: this.form.lotNo,
                  type: 4}]}).then(res => {
                    if(res.flag){
                      res.data[0].color = res.data[0].oldCode
                      this.printType(this.form.printModel, res.data)
                    }
              });
            }
            this.visible = false
          }else{
            return false;
          }
        })

      },
      add() {
        this.form = {
          lotNo: null,
          gid: this.listInfo.gid,
          printModel: null,
          color: this.listInfo.oldCode,
          oldCode: this.listInfo.oldCode,
          printingQuantity: 1,
        }
        this.isLog = false
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

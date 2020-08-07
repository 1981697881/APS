<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'tpId'" style="display: none">
            <el-input v-model="form.tpId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12" >
          <el-form-item :label="'名称'" prop="tpName">
            <el-input v-model="form.tpName" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" >
          <el-form-item :label="'类别'" prop="type" @change="selectChange">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item :label="'规则'" prop="rules">
            <el-select v-model="form.rules" multiple placeholder="请选择">
              <el-option
                v-for="item in rArray"
                :key="item.trId"
                :label="item.trName"
                :value="item.trId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item :label="'注意事项1'" >
            <el-input v-model="matters.matters0.note" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item >
            <el-checkbox v-model="matters.matters0.display">是否展示</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item :label="'注意事项2'">
            <el-input v-model="matters.matters1.note" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item >
            <el-checkbox v-model="matters.matters1.display">是否展示</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item :label="'注意事项3'">
            <el-input v-model="matters.matters2.note" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item >
            <el-checkbox v-model="matters.matters2.display">是否展示</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item :label="'注意事项4'" >
            <el-input v-model="matters.matters3.note" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item >
            <el-checkbox v-model="matters.matters3.display">是否展示</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item :label="'注意事项5'" >
            <el-input v-model="matters.matters4.note" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item >
            <el-checkbox v-model="matters.matters4.display">是否展示</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item :label="'注意事项6'" >
            <el-input v-model="matters.matters5.note" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  >
            <el-checkbox v-model="matters.matters5.display">是否展示</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'加班时段'">
            <el-select v-model="form.overWorkDay" multiple placeholder="请选择">
              <el-option
                v-for="item in dayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item :label="'是否加班'">
            <el-switch v-model="form.isOverwork" active-value="0" inactive-value="1"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>-->
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import{ resourcesAdd, resourcesAlter, regulationList, productionRules, getListMatters } from "@/api/basic/index"
  export default {
    props: {
      gpInfo: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        form: {
          tpId: null,
          isOverwork: '1',
          tpName: null, // 名称
          tpCategory: '产线设备',
          type: null,
          overWorkDay: [],
          rules: []
        },
        dayOptions: [{
          value: '1',
          label: '星期一'
        }, {
          value: '2',
          label: '星期二'
        }, {
          value: '3',
          label: '星期三'
        }, {
          value: '4',
          label: '星期四'
        }, {
          value: '5',
          label: '星期五'
        }, {
          value: '6',
          label: '星期六'
        }, {
          value: '7',
          label: '星期日'
        }],
        matters: {
          matters0: {
            note: null,
            display: false,
          },
          matters1: {
            note: null,
            display: false,
          },
          matters2: {
            note: null,
            display: false,
          },
          matters3: {
            note: null,
            display: false,
          },
          matters4: {
            note: null,
            display: false,
          },
          matters5: {
            note: null,
            display: false,
          },
        },
        options: [{
          value: 1,
          label: '成品线'
        }, {
          value: 2,
          label: '半成品线'
        }, {
          value: 3,
          label: '美瓷胶成品线'
        }, {
          value: 4,
          label: '美瓷胶半成品线'
        }],
        rArray: [],
        rules: {
          rules: [
            {type: 'array', required: true, message: '请选择规则', trigger: 'change'},
          ],
          tpName: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
          type: [
            {required: true, message: '请选择类别', trigger: 'change'},
          ],
        },
      };
    },
    created() {
     /* this.fetchFormat()*/
      if (this.gpInfo) {
        this.form = this.gpInfo
        this.form.type = this.gpInfo.parent
        /*this.alterFormat(this.form.tpId)*/
        this.alterMatters(this.form.tpId)
      }
    },
    mounted() {

    },
    methods: {
      alterFormat(val) {
        productionRules(val).then(res => {
          if(res.flag) {
            this.form.rules = res.data
          }
        })
      },
      compare(arr1, arr2) {
        return arr1.ipMatId-arr2.ipMatId
      },
      alterMatters(val) {
        const me = this
        getListMatters(val).then(res => {
          if(res.flag) {
            me.form.overWorkDay = res.data.overWorkDay ==''?[]: res.data.overWorkDay .split(',')
            if(res.data.listMatters.length> 0){
              const matterArray = res.data.listMatters.sort(this.compare)
              let martterObj = {}
              matterArray.forEach((item,index) => {
                martterObj['matters'+index] = item

              })
              this.matters = martterObj
            }
          }
        })
        console.log(this.form)
      },
      fetchFormat() {
        const data = {
          pageNum: 1,
          pageSize: 1000
        };
        regulationList(data).then(res => {
          this.rArray = res.data.records
        });
      },
      selectChange(val) {
        this.form.type = val
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          const marrter = this.matters
          //判断必填项
          if (valid) {
            let array = []
            for(const i in marrter){
              let obj = {}
              marrter[i].tpId = this.form.tpId
              array.push(marrter[i])
            }
            this.form.importantMatters = array
            this.form.overWorkDay = this.form.overWorkDay.toString()
            if (typeof (this.form.tpId) != undefined && this.form.tpId != null) {
              resourcesAlter(this.form).then(res => {
                this.$emit('hideGroupDialog', false)
                this.$emit('uploadGroup')
              });
            } else {
              resourcesAdd(this.form).then(res => {
                this.$emit('hideGroupDialog', false)
                this.$emit('uploadGroup')
              });
            }
          }else {
            return false;
          }
        })

      },
    }
  };
</script>

<style>
</style>

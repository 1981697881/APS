<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'plId'" style="display: none">
            <el-input v-model="form.plId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'生产线'" prop="tpId">
            <el-select v-model="form.tpId" class="width-full" placeholder="类别">
              <el-option :label="t.tpName" :value="t.tpId" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'生产设备'" prop="plName">
            <el-input v-model="form.plName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'排产数量上限'" >
            <el-input-number v-model="form.upperLimit"  :min="0"  label="描述文字"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'排产数量下限'">
            <el-input-number v-model="form.lowerLimit"  :min="0"  label="描述文字"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'正常资源'" >
            <el-input-number v-model="form.normalResources"  :min="0"  label="描述文字"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'加班资源'">
            <el-input-number v-model="form.overtimeResources"  :min="0"  label="描述文字"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'其他资源'">
            <el-input-number v-model="form.otherResources"  :min="0"  label="描述文字"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'单批数量'">
            <el-input-number v-model="form.singleLotNum"  :min="0"  label="描述文字"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="24">
          <el-form-item :label="'描述'">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
     <!-- <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item :label="'星期一'">
            <el-radio-group v-model="form.Monday">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">加班</el-radio>
              <el-radio :label="0">休息</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col><el-col :span="12">
          <el-form-item :label="'星期二'">
            <el-radio-group v-model="form.Tuesday">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">加班</el-radio>
              <el-radio :label="0">休息</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item :label="'星期三'">
            <el-radio-group v-model="form.Wednesday">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">加班</el-radio>
              <el-radio :label="0">休息</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col><el-col :span="12">
          <el-form-item :label="'星期四'">
            <el-radio-group v-model="form.Thursday">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">加班</el-radio>
              <el-radio :label="0">休息</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item :label="'星期五'">
            <el-radio-group v-model="form.Friday">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">加班</el-radio>
              <el-radio :label="0">休息</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col><el-col :span="12">
          <el-form-item :label="'星期六'">
            <el-radio-group v-model="form.Saturday">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">加班</el-radio>
              <el-radio :label="0">休息</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item :label="'星期日'">
            <el-radio-group v-model="form.Sunday">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">加班</el-radio>
              <el-radio :label="0">休息</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'工作时段'" prop="workDay">
            <el-select v-model="form.workDay" multiple placeholder="请选择">
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
          <el-form-item :label="'规则'">
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
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import{productionLineAdd, productionLineAlter, getResourcesList, productionRules, regulationList} from '@/api/basic/index'

  export default {
    props: {
      listInfo: {
        type: Object,
        default: null
      },
      //是否自适应宽度，不自适应宽度默认为120px
      selfAdaption: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        form: {
         /* Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
          Saturday: 0,
          Sunday: 0,*/
          plId: null,
          tpId: null,
          upperLimit: null,
          lowerLimit: null,
          singleLotNum: null,
          plName: null, // 名称
          normalResources: null,
          otherResources: null,
          overtimeResources: null,
          description: null,
          workDay: [],
          rules: [],
        },
        list: [],
        pArray: [],
        rArray: [],
        options: [{
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
        rules: {
          plName: [
            {required: true, message: '请输入名稱', trigger: 'blur'},
          ],
          rules: [
            {type: 'array', required: true, message: '请选择规则', trigger: 'change'},
          ],
          tpId: [
            {required: true, message: '请选择产线', trigger: 'change'},
          ], workDay: [
            {type: 'array', required: true, message: '请选择', trigger: 'change'},
          ],
        },
      };
    },
    created() {
      this.fetchFormat()
      if (this.listInfo) {
        this.form = this.listInfo
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
      handleClick(tab, event) {
        console.log(tab, event);
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          // 判断必填项
          if (valid) {
            this.form.workDay = this.form.workDay.toString()
            if (typeof (this.form.plId) != undefined && this.form.plId != null) {
              productionLineAlter(this.form).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
            } else {
              productionLineAdd(this.form).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
            }
          } else {
            return false
          }
        })
      },
      fetchFormat() {
        const data = {
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 1000
        };
        getResourcesList(data).then(res => {
          this.pArray = res.data.records
        });
        regulationList(data).then(res => {
          this.rArray = res.data.records
        });
      },
    }
  };
</script>

<style>
</style>

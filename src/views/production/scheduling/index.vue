<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <el-card class="box-card box-card-component">
        <div slot="header" class="clearfix" >
          <span>成品线计划</span>
          <el-select v-model="value" style="float: right;" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <tabs-bar @showDialog="handlerDialog" @theDelivery="delivery"/>
        </div>
        <list ref="list1"  @showDialog="handlerDialog"/>
      </el-card>
    </div>
    <div class="list-containerOther">
      <el-card class="box-card box-card-component">
        <div slot="header" class="clearfix" >
          <span>半成品线生产计划</span>
          <el-select v-model="value" style="float: right;" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <tabs-bar-e @showDialog="handlerDialog" @theDelivery="delivery"/>
        </div>
        <scheduling ref="list2"  @showDialog="handlerDialog"/>
      </el-card>
    </div>
   <!-- <div class="list-containerOther">
      <el-card class="box-card box-card-component">
        <div slot="header" class="clearfix" >
          <span>美瓷胶包装线色系统计表</span>
        </div>
        <div>
          <tabs-bar-s @showDialog="handlerDialog" @theDelivery="delivery"/>
        </div>
        <detail ref="list3"  @showDialog="handlerDialog"/>
      </el-card>
    </div>-->
    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      :width="'80%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" ></info>

    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List ,Detail,Scheduling,TabsBarE,TabsBarS} from "./components";
import { Info } from "./form";

export default {
  components: {
    TabsBar,
    List,
      Info,
      Detail,
      Scheduling,
      TabsBarE,
      TabsBarS
  },
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      visible: null,
      oid: null,
        orderId: null,
        createTime: null,
      treeId: null, // null
      floorId: null
    };
  },
    mounted() {
        this.$refs.list1.fetchData()
    },
  methods: {
      delivery(obj){
          if(obj){
              this.$refs.list1.Delivery(obj.oid)
              this.$refs.list1.fetchData()
          }
      },
      hideWindow(val){
          this.visible = val
      },
    handlerDialog(obj){
      //if(obj)
      this.visible = true
    },
    handlerNode(node) {
      this.$refs.list1.fetchData(node.data.fid,node.data.type)
    },
      //更新列表
      upload(){
          this.$refs.list1.fetchData()
      }
  }
};
</script>

<style lang="scss" scoped>
  .list-containerOther{
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
<style lang="scss" >
  .box-card-component{
    .el-card__header {
      padding: 2px 20px;
      line-height: 40px;
    }
    .el-card__body{
      padding: 0px!important;
    }
  }
</style>

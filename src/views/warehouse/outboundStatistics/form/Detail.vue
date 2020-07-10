<template>
  <div>
    <list
      height="300px"
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
      @handle-size="handleSize"
      @handle-current="handleCurrent"
    />
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click.native="saveData()">驳回</el-button>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import{ outboundStatisticsInfo2, OutBackputList} from '@/api/warehouse/index'
  import List from '@/components/List'
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
      //是否自适应宽度，不自适应宽度默认为120px
      selfAdaption: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        loading: false,
        list: {},
        columns: [
          { text: 'gid', name: 'gid', default: false },
          { text: '单号', name: 'outNo' },
          { text: 'U9料号', name: 'goodCode' },
          { text: '旧料号', name: 'oldCode' },
          { text: '品名', name: 'goodName' },
          { text: '规格', name: 'spec' },
          { text: '批号', name: 'lotNo' },
          { text: '数量', name: 'num' },
          { text: '库位', name: 'positionCode' },
          { text: '状态', name: 'isBack' },
        ]
      };
    },
    created() {

    },

    mounted() {
      if (this.listInfo) {
        console.log(this.listInfo)
        this.fetchFormat(this.listInfo.outNo)
      }
    },
    methods: {
      saveData() {
        if (this.selections.length>0) {
          const selection = this.selections
          let arrray = []
          selection.forEach((item, index) => {
            if(arrray.indexOf(item.outDeId) == -1){
              arrray.push(item.outDeId)
            }
          })
          OutBackputList(arrray).then(res => {
            if(res.flag) {
              this.fetchFormat(this.listInfo.outNo)

              this.$emit('uploadList')
            }
          })
          /*this.$emit('showDialog', this.clickData)*/
        } else {
          this.$message({
            message: "无选中行",
            type: "warning"
          });
        }
      },
      // 监听每页显示几条
      handleSize(val) {
        this.list.size = val
        this.fetchData();
      },
      // 监听当前页
      handleCurrent(val) {
        this.list.current = val;
        this.fetchData();
      },
      fetchFormat(val) {
        console.log(val)
        const data = {
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 50,
          outNo: val || ''
        };
        outboundStatisticsInfo2(data).then(res => {
          this.list = {records: res.data}
        });
      },
    }
  };
</script>

<style>
</style>

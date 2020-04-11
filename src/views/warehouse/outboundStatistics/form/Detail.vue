<template>
  <div>
    <list
      height="300px"
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @handle-size="handleSize"
      @handle-current="handleCurrent"
    />
  </div>
</template>
<script>
  import{ outboundStatisticsInfo } from '@/api/warehouse/index'
  import List from '@/components/List'
  export default {
    components: {
      List
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
          { text: 'gid', name: 'gid',default:false },
          { text: 'U9料号', name: 'goodCode' },
          { text: '色号', name: 'oldCode' },
          { text: '规格', name: '' },
          { text: '批号', name: 'lotNo' },
          { text: '数量', name: 'num' },
          { text: '库位', name: 'positionName' },
        ]
      };
    },
    created() {

    },

    mounted() {
      if (this.listInfo) {
        this.fetchFormat(this.listInfo.gid)
      }
    },
    methods: {
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
        const data = {
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 50,
          id: val || ''
        };
        outboundStatisticsInfo(data).then(res => {
          this.list = res.data
        });
      },
    }
  };
</script>

<style>
</style>

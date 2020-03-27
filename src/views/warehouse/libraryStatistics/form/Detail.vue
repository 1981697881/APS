<template>
  <div>

  </div>
</template>

<script>
  import{ libraryStatisticsInfo } from '@/api/warehouse/index'

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

      };
    },
    created() {

    },
    mounted() {
      if (this.listInfo) {
        this.fetchFormat()
      }
    },
    methods: {
      fetchFormat() {
        const data = {
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 1000,
          id: this.list.size || ''
        };
        libraryStatisticsInfo(data).then(res => {
          this.pArray = res.data.records
        });
      },
    }
  };
</script>

<style>
</style>

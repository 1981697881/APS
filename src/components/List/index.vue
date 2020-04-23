<template>
  <div>
    <el-table
      :data="list.records"
      border
      :stripe="timeColor?false : true"
      size="mini"
      :highlight-current-row="true"
      @row-dblclick="dblclick"
      @row-click="rowClick"
      :row-class-name="tableRowClassName"
       @selection-change="handleSelectionChange"
      :height="height"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      v-loading="loading"
    >
      <el-table-column v-if="type" :type="type?'selection':''"></el-table-column>
      <el-table-column v-if="index" prop="date" label="序号" type="index" align="center" sortable></el-table-column>
      <slot name="title"></slot>
      <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        :prop="t.name"
        :formatter="t.formatt!=undefined?taskWarning : null"
        v-if="t.default!=undefined?t.default:true"
        :label="t.text"
        :width="t.width?t.width:(selfAdaption?'':'120px')"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <!--<el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button  type="text" size="small"  @click.native="">添加</el-button>
        </template>
      </el-table-column>-->
      <slot name="after"></slot>
    </el-table>

    <div class="text-center pages" v-if="list.total && list.total!=0" style="padding-top: 15px;">
      <el-pagination
        @size-change="handleSize"
        @current-change="handleCurrent"
        :current-page="list.current"
        :page-sizes="[50, 100, 250, 500, 1000, 5000]"
        :page-size="list.size"
        :page-count="list.pages?list.pages:0"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.total?list.total:0"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      // 请求返回的json数据
      type: Object,
      default: null
    },
    columns: {
      // 列
      type: Array,
      default: null
    },
    index: {
      // 是否需要序号列
      type: Boolean,
      default: false
    },
    // 是否开启多选
    type: {
      type: Boolean,
      default: false
    },
    // 是否开启多选
    timeColor: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    // 是否打开底部合计行
    showSummary: {
      type: Boolean,
      default: false
    },
    //是否自适应宽度，不自适应宽度默认为120px
    selfAdaption: {
      type: Boolean,
      default: true
    },
    //是否自定义高度 默认100%
    height:{
      type: String,
      default: "100%"
    }
  },
  methods: {
    formatSex(row, column) {
    },
    taskWarning(row, column) {
      let stau = ''
      if(row.isDel == 0) {
        stau = ''
      }else if(row.isDel == 1) {
        stau = ''
      }else if(row.isDel == 2) {
        stau = ''
      }else{
        stau = ''
      }
      return  stau
    },
    tableRowClassName({row, rowIndex}) {
      if (row.alertStatus === '加急') {
        return 'urgent-row';
      } else if (row.alertStatus === '暂停') {
        return 'suspended-row';
      }else if (row.alertStatus === '延误') {
        return 'delay-row';
      }else if (row.alertStatus === '日期冲突') {
        return 'conflict-row';
      }
      return '';
    },
    // 监听多选 参数-所有选中的值
    handleSelectionChange(val){
      this.$store.dispatch('list/setSelections',val)
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    },
    // 表格单击操作
    rowClick(row, column, el) {
      return this.$emit("row-click", { row, column, el });
    },
    // 表格双击操作
    dblclick(row, column, el) {
      return this.$emit("dblclick", { row, column, el });
    },
    //监听每页显示数量
    handleSize(size) {
      return this.$emit("handle-size", size);
    },
    //监听当前页码数
    handleCurrent(current) {
      return this.$emit("handle-current", current);
    }
  }
};
</script>

<style>
  .el-table__body tr.current-row>td{
    background-color: #f19944 !important;
    /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
  }
  /* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #f19944;
    /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
  }

</style>
<style>                                                                                                                                                            <el-radio :label="8" style="color:#8032a4" disabled>冲突</el-radio>
  .el-table .urgent-row {
    background: #7b1424;
    color: #f19944;
  }
  .el-table .suspended-row {
    background: #3b199a;
    color: #f19944;
  }
  .el-table .delay-row {
    background: #dc9118;
    color: #f19944;
  }
  .el-table .conflict-row {
    background: #8032a4;
    color: #f19944;
  }
</style>

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import notpage from '@/views/404'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    affix: true                  if set true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const StaticRouterMap = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
}, {
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
}, {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '首页',
      icon: 'dashboard',
      affix: true
    }
  }]
}, {
  path: '/basic',
  component: Layout,
  name: 'Basic',
  meta: {
    title: '基础资料',
    icon: 'component'
  },
  children: [{
      path: 'framework',
      component: () => import('@/views/basic/framework/index'),
      name: 'Framework',
      meta: {
        title: '组织架构'
      },
    },{
      path: 'material',
      component: () => import('@/views/basic/material/index'),
      name: 'Material',
      meta: {
        title: '物料管理'
      },
    },
    {
      path: 'clerk',
      component: () => import('@/views/basic/clerk/index'),
      name: 'Clerk',
      meta: {
        title: '职员管理'
      },
    },
    {
      path: 'supplier',
      component: () => import('@/views/basic/supplier/index'),
      name: 'Supplier',
      meta: {
        title: '供应商管理'
      },
    },{
      path: 'inventory',
      component: () => import('@/views/basic/inventory/index'),
      name: 'Inventory',
      meta: {
        title: '库存信息'
      },
    },{
      path: 'resources',
      component: () => import('@/views/basic/resources/index'),
      name: 'Resources',
      meta: {
        title: '生产资源管理'
      },
    },{
      path: 'barcode',
      component: () => import('@/views/basic/barcode/index'),
      name: 'Barcode',
      meta: {
        title: '条码设置'
      },
    }]
  },
  {
    path: '/production',
    component: Layout,
    name: 'Production',
    meta: {
      title: '生产管理',
      icon: "component"
    },
    children: [
      /*{
      path: 'prepare',
      component: () => import('@/views/production/prepare/index'),
      name: 'Prepare',
      meta: {
        title: '生产单管理'
      },
    },*/
      {
      path: 'scheduling',
      component: () => import('@/views/production/scheduling/index'),
      name: 'Scheduling',
      meta: {
        title: '生产排程'
      },
    },{
      path: 'sboard',
      component: () => import('@/views/production/sboard/index'),
      name: 'sboard',
      meta: {
        title: '生产任务看板'
      },
    },{
      path: 'efficiency',
      component: () => import('@/views/production/efficiency/index'),
      name: 'Efficiency',
      meta: {
        title: '工时效率统计表'
      },
    }]
  },
  {
    path: '/warehouse',
    component: Layout,
    name: 'Warehouse',
    meta: {
      title: '仓库物流管理',
      icon: 'component'
    },
    children: [{
      path: 'procurement',
      component: () => import('@/views/warehouse/procurement/index'),
      name: 'Procurement',
      meta: {
        title: '采购入库计划'
      },
    },{
      path: 'recipients',
      component: () => import('@/views/warehouse/recipients/index'),
      name: 'Recipients',
      meta: {
        title: '出货计划'
      },
    },{
      path: 'movingframe',
      component: () => import('@/views/warehouse/movingframe/index'),
      name: 'Movingframe',
      meta: {
        title: '移库信息'
      },
    },{
      path: 'adjust',
      component: () => import('@/views/warehouse/adjust/index'),
      name: 'Adjust',
      meta: {
        title: '库存调整'
      },
    },{
      path: 'storageBin',
      component: () => import('@/views/warehouse/storageBin/index'),
      name: 'StorageBin',
      meta: {
        title: '库位信息'
      },
    },{
      path: 'laborMonitoring',
      component: () => import('@/views/warehouse/laborMonitoring/index'),
      name: 'LaborMonitoring',
      meta: {
        title: '物流部效率统计'
      },
    },{
      path: 'deliveryOrderBoard',
      component: () => import('@/views/warehouse/deliveryOrderBoard/index'),
      name: 'DeliveryOrderBoard',
      meta: {
        title: '出货单可发看板'
      },
    },{
      path: 'shipmentBoard',
      component: () => import('@/views/warehouse/shipmentBoard/index'),
      name: 'ShipmentBoard',
      meta: {
        title: '出货统计看板'
      },
    },{
      path: 'receivingBoard',
      component: () => import('@/views/warehouse/receivingBoard/index'),
      name: 'ReceivingBoard',
      meta: {
        title: '收货统计看板'
      },
    },{
      path: ' locationBoard',
      component: () => import('@/views/warehouse/locationBoard/index'),
      name: 'LocationBoard',
      meta: {
        title: '库位看板'
      },
    },
     /* {
      path: 'materialback',
      component: () => import('@/views/warehouse/materialback/index'),
      name: 'Materialback',
      meta: {
        title: '退料单'
      },
    },{
      path: 'returns',
      component: () => import('@/views/warehouse/returns/index'),
      name: 'Returns',
      meta: {
        title: '退货入库单'
      },
    },{
      path: 'storage',
      component: () => import('@/views/warehouse/storage/index'),
      name: 'Storage',
      meta: {
        title: '生产入库'
      },
    },{
      path: 'shelves',
      component: () => import('@/views/warehouse/shelves/index'),
      name: 'Shelves',
      meta: {
        title: '商品上架'
      },
    },{
      path: 'picking',
      component: () => import('@/views/warehouse/picking/index'),
      name: 'Picking',
      meta: {
        title: '拣货单管理'
      },
    },{
      path: 'soldout',
      component: () => import('@/views/warehouse/soldout/index'),
      name: 'Soldout',
      meta: {
        title: '商品下架'
      },
    },{
      path: 'sipping',
      component: () => import('@/views/warehouse/sipping/index'),
      name: 'Sipping',
      meta: {
        title: '发货出库'
      },
    },{
      path: 'scrap',
      component: () => import('@/views/warehouse/scrap/index'),
      name: 'Scrap',
      meta: {
        title: '商品报废'
      },
    },
      {
      path: 'differences',
      component: () => import('@/views/warehouse/differences/index'),
      name: 'Differences',
      meta: {
        title: '发货差异报表'
      },
    }*/
    ]
  },
  {
    path: '/aftermarket',
    component: Layout,
    name: 'Aftermarket',
    meta: {
      title: '销售管理',
      icon: "component"
    },
    children: [
     {
      path: 'sales',
      component: () => import('@/views/aftermarket/sales/index'),
      name: 'Sales',
      meta: {
        title: '销售计划'
      },
    },
    {
      path: 'shipping',
      component: () => import('@/views/aftermarket/shipping/index'),
      name: 'Shipping',
      meta: {
        title: '订单转出货情况表'
      },
    },{
      path: 'inVoorraad',
      component: () =>import('@/views/aftermarket/inVoorraad/index'),
      name: 'inVoorraad',
      meta: {
        title: '产品可出货库存表'
      },
    },{
      path: 'auftragslage',
      component: () => import('@/views/aftermarket/auftragslage/index'),
      name: 'Auftragslage',
      meta: {
        title: '项目订货情况分析表'
      },
    }
      /*, {
       path: 'shipment',
       component: () => import('@/views/aftermarket/shipment/index'),
       name: 'Shipment',
       meta: {
         title: '出货排程'
       },
     }
    ,{
       path: 'perform',
       component: () => import('@/views/aftermarket/perform/index'),
       name: 'Perform',
       meta: {
         title: '订单执行统计'
       },
     }*/
    ]
  },{
    path: '/attendance',
    component: Layout,
    name: 'Attendance',
    meta: {
      title: '考勤管理',
      icon: "component"
    },
    children: [{
      path: 'shift',
      component: () => import('@/views/attendance/shift/index'),
      name: 'Shift',
      meta: {
        title: '班次管理'
      },
    },{
      path: 'arrange',
      component: () => import('@/views/attendance/arrange/index'),
      name: 'Arrange',
      meta: {
        title: '排班'
      },
    },
     /* {
      path: 'punchcard',
      component: () => import('@/views/attendance/punchcard/index'),
      name: 'Punchcard',
      meta: {
        title: '打卡管理'
      },
    },{
      path: 'vacate',
      component: () => import('@/views/attendance/vacate/index'),
      name: 'Vacate',
      meta: {
        title: '请假管理'
      },
    },*/
      {
      path: 'salary',
      component: () => import('@/views/attendance/salary/index'),
      name: 'Salary',
      meta: {
        title: '考勤管理'
      },
    }]
  },
  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: {
      title: '系统设置',
      icon: "component"
    },
    children: [{
      path: 'users',
      component: () => import('@/views/system/users/index'),
      name: 'Users',
      meta: {
        title: '用户管理'
      },
    },{
      path: 'journal',
      component: () => import('@/views/system/journal/index'),
      name: 'Journal',
      meta: {
        title: '日志管理'
      },
    },{
      path: 'notice',
      component: () => import('@/views/system/notice/index'),
      name: 'Notice',
      meta: {
        title: '通知管理'
      },
    },{
      path: 'board',
      component: () => import('@/views/system/board/index'),
      name: 'Board',
      meta: {
        title: '看板管理'
      },
    }]
  },
  /* {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '开发文档', icon: 'link', roles: ['admin', 'editor'] } // 设置该路由进入的权限，支持多个权限叠加}
      }
    ]
  }, */

  // 404 page must be placed at the end !!!
  /* {
    path: '*',
    redirect: '/404',
    hidden: true
  } */
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})

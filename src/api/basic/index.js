import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 组织架构-获取组织树
export function getFrameTree(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}

// 组织架构-获取列表
export function getFrameList(params) {
  const url = '/department/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

// 组织架构-新增
export function FrameAdd(params) {
  const url = '/department/add'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 组织架构-新增
export function FrameAlter(params) {
  const url = '/department/update'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'put',
    data: params
  })
}
// 组织架构-获取详情
export function getFrameInfo(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}

// 组织架构-获取上级下拉
export function getSuperior(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}

// 组织架构-获取公司下拉
export function getCompany(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}

// 组织架构-删除
export function delFrame(params) {
  return request({
    url: '/department/del/' + params,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'delete'
  })
}

// 物料管理-获取列表
export function getMaterialList(data) {
  const url = '/goods/list/' + data.pageNum + '/' + data.pageSize
  return request({
      url: url,
      headers: {
        'authorization': getToken('apsrx'),
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
}

// 物料管理-新增
export function materialAdd(params) {
  const url = '/goods/add'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: {
      goods: params
    }
  })
}
// 物料管理-修改
export function materialAlter(params) {
  const url = '/goods/update'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'put',
    data: {
      goods: params
    }
  })
}
// 物料管理-同步物料
export function syncMaterialInfo(params) {
  const url = '/Admin/ItemInfo/sync'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 物料管理-获取详情
export function getMaterialInfo(params) {
  const url = '/goods/getById/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
  })
}

// 物料管理-类别下拉
export function getMType(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}

// 物料管理-计量单位下拉
export function getUnit(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}

// 物料管理-删除
export function delMaterial(params) {
  const url = '/goods/del/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'delete'
  })
}

// 职员管理-获取列表
export function getClerkList(params) {
  const url = '/Admin/employee/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

// 职员管理-新增
export function addClerk(params) {
  return request({
    url: '/employee/add',
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 职员管理-修改
export function alterClerk(params) {
  return request({
    url: '/employee/update',
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    data: params
  })
}

// 职员管理-获取详情
export function clerkInfo(params) {
  return request({
    url: '/table/list' + params,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get'
  })
}

// 职员管理-获取部门下拉
export function clerkDepartment(params) {
  return request({
    url: '/table/list' + params,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}

// 职员管理-删除
export function delClerk(params) {
  return request({
    url: '/employee/del/' + params,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'delete',
  })
}
// 供应商管理-获取列表
export function supplierList(params) {
  const url = '/supplier/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

// 供应商管理-新增
export function addSupplier(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}

// 供应商管理-获取详情
export function supplierInfo(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}

// 供应商管理-删除
export function delSupplier(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'get',
    params
  })
}

// 库存查看-获取列表
export function getInventory(params) {
  const url = '/inv-detail/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
// 库存管理-同步库存
export function syncInventory(params) {
  const url = '/Admin/InvDetail/sync'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: {
      itemInfoPojo: params
    }
  })
}

// 供应商管理-删除
// 生产资源-获取列表
export function getResourcesList(data) {
  const url = '/type/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: {
      tpCategory: '产线设备'
    }
  })
}
// 生产资源-获取成品产线
export function getFinalGoodsType() {
  const url = '/type/list/endProductType'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'get'
  })
}
// 生产资源-获取半成品产线
export function getSemiFinishedProductsType() {
  const url = '/type/list/semiProductType'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'get'
  })
}
// 生产资源-获取成品生产设备
export function getFinalGoods(data) {
  const url = '/production-line/list/endProduct/' + data
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'get'
  })
}
// 生产资源-获取半成品生产设备
export function getSemiFinishedProducts(data) {
  const url = '/production-line/list/semiProductLine/' + data
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'get'
  })
}
// 生产资源-新增
export function resourcesAdd(params) {
  const url = '/Admin/type/add'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 生产资源-修改
export function resourcesAlter(params) {
  const url = '/Admin/type/update'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 生产资源-获取详情
export function resourcesInfo(params) {
  const url = '/type/getById/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

// 生产资源-删除
export function delResources(params) {
  const url = '/Admin/type/delete/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'post'
  })
}
// 生产资源产线-获取列表
export function productionLineList(data, query) {
  const url = '/production-line/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 生产资源产线-新增
export function productionLineAdd(params) {
  const url = '/Admin/productionLine/add'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 生产资源产线-修改
export function productionLineAlter(params) {
  const url = '/Admin/productionLine/update'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 生产资源产线-获取详情
export function productionLineInfo(params) {
  const url = '/production-line/getById/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

// 生产资源产线-删除
export function delProductionLine(params) {
  const url = '/Admin/productionLine/delete/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'delete'
  })
}
// 规则-获取列表
export function regulationList(data) {
  const url = '/task-rules/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
  })
}

// 规则-新增
export function regulationAdd(params) {
  const url = '/task-rules/add'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 规则-修改
export function regulationAlter(params) {
  const url = '/task-rules/update'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'put',
    data: params
  })
}
// 规则-删除
export function delRegulation(params) {
  const url = '/task-rules/delete/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'delete'
  })
}
// 库位管理-获取列表
export function getStorageList(data) {
  const url = '/position/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

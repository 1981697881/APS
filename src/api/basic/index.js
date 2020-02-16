import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 组织架构-获取组织树
export function getFrameTree(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}

// 组织架构-获取列表
export function getFrameList(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}

// 组织架构-新增
export function FrameAdd(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}

// 组织架构-获取详情
export function getFrameInfo(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
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
      'authorization': getToken('rx')
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
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}

// 组织架构-删除
export function delFrame(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}

// 物料管理-获取列表
export function getMaterialList(data) {
  const url = ' /goods/list/' + data.pageNum + '/' + data.pageSize
  return request({
      url: url,
      headers: {
        'authorization': getToken('rx'),
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
      'authorization': getToken('rx'),
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
      'authorization': getToken('rx'),
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
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: {
      itemInfoPojo: params
    }
  })
}
// 物料管理-获取详情
export function getMaterialInfo(params) {
  const url = '/goods/getById/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
  })
}

// 物料管理-类别下拉
export function getMType(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
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
      'authorization': getToken('rx')
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
      'authorization': getToken('rx')
    },
    method: 'delete'
  })
}

// 职员管理-获取列表
export function getClerkList(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}

// 职员管理-新增
export function addClerk(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}

// 职员管理-获取详情
export function clerkInfo(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}

// 职员管理-获取部门下拉
export function clerkDepartment(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}

// 职员管理-删除
export function delClerk(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}

// 供应商管理-获取列表
export function supplierList(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}

// 供应商管理-新增
export function addSupplier(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
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
      'authorization': getToken('rx')
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
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}

// 库存查看-获取列表
export function getInventory(params) {
  const url = ' /inv-detail/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
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
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: {
      itemInfoPojo: params
    }
  })
}

// 供应商管理-删除

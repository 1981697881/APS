import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 领用出库-获取列表
export function getRecipientsList(data) {
  const url = '/type/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: {
      category: '产线'
    }
  })
}

// 领用出库-新增
export function resourcesAdd(params) {
  const url = '/type/add'
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
// 领用出库-修改
export function resourcesAlter(params) {
  const url = '/type/update'
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
// 领用出库-获取详情
export function resourcesInfo(params) {
  const url = '/type/getById/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

// 领用出库-删除
export function delResources(params) {
  const url = '/type/del/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx')
    },
    method: 'delete'
  })
}
// 退料单-获取列表
export function getMaterialbackList(data) {
  const url = '/type/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: {
      category: '产线'
    }
  })
}

// 退料单-新增
export function materialbackAdd(params) {
  const url = '/type/add'
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
// 退料单-修改
export function materialbackAlter(params) {
  const url = '/type/update'
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
// 退料单-获取详情
export function materialbackInfo(params) {
  const url = '/type/getById/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

// 退料单-删除
export function delMaterialback(params) {
  const url = '/type/del/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx')
    },
    method: 'delete'
  })
}
// 退货入库单-获取列表
export function getReturnsList(data) {
  const url = '/type/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: {
      category: '产线'
    }
  })
}

// 退货入库单-新增
export function returnsAdd(params) {
  const url = '/type/add'
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
// 退货入库单-修改
export function returnsAlter(params) {
  const url = '/type/update'
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
// 退货入库单-获取详情
export function returnsInfo(params) {
  const url = '/type/getById/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

// 退货入库单-删除
export function delReturns(params) {
  const url = '/type/del/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx')
    },
    method: 'delete'
  })
}
// 生产入库-获取列表
export function getMaterialbackList(data) {
  const url = '/type/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: {
      category: '产线'
    }
  })
}

// 生产入库-新增
export function materialbackAdd(params) {
  const url = '/type/add'
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
// 生产入库-修改
export function materialbackAlter(params) {
  const url = '/type/update'
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
// 生产入库-获取详情
export function materialbackInfo(params) {
  const url = '/type/getById/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

// 生产入库-删除
export function delMaterialback(params) {
  const url = '/type/del/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx')
    },
    method: 'delete'
  })
}
// 商品上架-获取列表
export function getShelvesList(data) {
  const url = '/type/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: {
      category: '产线'
    }
  })
}

// 商品上架-新增
export function shelvesAdd(params) {
  const url = '/type/add'
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
// 商品上架-修改
export function shelvesAlter(params) {
  const url = '/type/update'
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
// 商品上架-获取详情
export function shelvesInfo(params) {
  const url = '/type/getById/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

// 商品上架-删除
export function delShelves(params) {
  const url = '/type/del/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx')
    },
    method: 'delete'
  })
}
// 商品移架-获取列表
export function getMovingframeList(data) {
  const url = '/type/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: {
      category: '产线'
    }
  })
}

// 商品移架-新增
export function movingframeAdd(params) {
  const url = '/type/add'
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
// 商品移架-修改
export function movingframeAlter(params) {
  const url = '/type/update'
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
// 商品移架-获取详情
export function movingframeInfo(params) {
  const url = '/type/getById/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

// 商品移架-删除
export function delMovingframe(params) {
  const url = '/type/del/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx')
    },
    method: 'delete'
  })
}

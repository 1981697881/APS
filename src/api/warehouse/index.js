import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 入库统计-获取列表
export function getLibraryStatisticsList(data, query) {
  const url = '/putOrder/list/' + data.pageNum + '/' + data.pageSize
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
// 入库统计-获取详情
export function libraryStatisticsInfo(data) {
  const url = '/putOrder/list/' + data.pageNum + '/' + data.pageSize + '/' + data.id
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'get'
  })
}
// 导出入库统计
export function exportLibraryStatistics(data) {
  const url = '/excel/export/putOrder'
  return request({
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    responseType: 'blob',
    url: url,
    method: 'post',
    data: data
  })
}
// 出库统计-获取列表
export function getOutboundStatisticsList(data, query) {
  const url = '/outOrder/list/' + data.pageNum + '/' + data.pageSize
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
// 出库统计-获取详情
export function outboundStatisticsInfo(data) {
  const url = '/outOrder/getById/' + data.pageNum + '/' + data.pageSize + '/' + data.id
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'get'
  })
}
// 导出出库统计
export function exportOutboundStatistics(data) {
  const url = '/excel/export/outOrder'
  return request({
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    responseType: 'blob',
    url: url,
    method: 'post',
    data: data
  })
}
// 库存调整-获取列表
export function getAdjustList(data, query) {
  const url = '/adjust/list/' + data.pageNum + '/' + data.pageSize
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
// 导出库存调整
export function exportAdjust(data) {
  const url = '/excel/export/adjust'
  return request({
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    responseType: 'blob',
    url: url,
    method: 'post',
    data: data
  })
}
// 移库-获取列表
export function getMovingframeList(data, query) {
  const url = '/warehouseMove/list/' + data.pageNum + '/' + data.pageSize
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
// 导出移库
export function exportMovingframe(data) {
  const url = '/excel/export/warehouseMove'
  return request({
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    responseType: 'blob',
    url: url,
    method: 'post',
    data: data
  })
}
// 库位看板-获取列表
export function getLocationBoardList(data, query) {
  const url = '/position/board'
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
// 库位看板-导出
export function exportLocationBoard(data) {
  const url = '/excel/export/position'
  return request({
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    responseType: 'blob',
    url: url,
    method: 'post',
    data: data
  })
}
// 采购入库计划-获取列表
export function getProcurementList(data, query) {
  const url = '/purchase-order/list/' + data.pageNum + '/' + data.pageSize
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
// 采购入库计划-同步采购入库单
export function syncPOInfoQuery(params) {
  const url = '/Admin/POInfoQuery/sync'
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
// 出货计划-获取列表
export function getRecipientsList(data, query) {
  const url = '/ship-order/list/' + data.pageNum + '/' + data.pageSize
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
// 出货计划-出货单
export function syncShipInfo(params) {
  const url = '/Admin/ShipInfo/sync'
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


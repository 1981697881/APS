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

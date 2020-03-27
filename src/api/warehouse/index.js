import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 入库统计-获取列表
export function getLibraryStatisticsList(data) {
  const url = '/putOrder/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
  })
}
// 生产资源-获取详情
export function libraryStatisticsInfo(data) {
  const url = '/putOrder/list/' + data.pageNum + '/' + data.pageSize + '/' + data.id
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
    },
    method: 'get'
  })
}
// 出库统计-获取列表
export function getOutboundStatisticsList(data) {
  const url = '/outOrder/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
  })
}
// 出库统计-获取详情
export function outboundStatisticsInfo(data) {
  const url = '/outOrder/getById/' + data.pageNum + '/' + data.pageSize + '/' + data.id
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
    },
    method: 'get'
  })
}
// 库存调整-获取列表
export function getAdjustList(data) {
  const url = '/adjust/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
  })
}
// 移库-获取列表
export function getMovingframeList(data) {
  const url = '/warehouseMove/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
  })
}

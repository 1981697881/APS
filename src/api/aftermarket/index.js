import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 销售计划-获取列表
export function getSalesList(params, query) {
  const url = '/sale-order/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: 'APS' + url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 获取销售单详情
export function getSalesInfo(params) {
  const url = '/sale-order/getOrderByOrderNum'
  return request({
    url: 'APS' + url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'get',
    params: {
      orderNum: params
    }
  })
}
// 确认单据
export function notarizeList(params) {
  const url = '/sale-order/confirm'
  return request({
    url: 'APS' + url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 订单同步
export function salesListSync(params) {
  const url = '/Admin/SOInfo/sync'
  return request({
    url: 'APS' + url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 销售计划-导出
export function exportSales(data) {
  const url = '/excel/export/saleOrder'
  return request({
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    responseType: 'blob',
    url: 'APS' + url,
    method: 'post',
    data: data
  })
}
// 班次管理-获取列表
export function getShiftList(params, query) {
  const url = '/order-of-work/list'
  return request({
    url: 'APS' + url,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'POST',
    data: query
  })
}

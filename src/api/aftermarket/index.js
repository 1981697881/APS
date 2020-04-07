import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 销售计划-获取列表
export function getSalesList(params, query) {
  const url = '/sale-order/list/' + params.pageNum + '/' + params.pageSize
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
// 获取销售单详情
export function getSalesInfo(params) {
  const url = '/sale-order/getOrderByOrderNum'
  return request({
    url: url,
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
  const url = '/sale-order/confirm/'
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
// 订单同步
export function salesListSync(params) {
  const url = '/Admin/SOInfo/sync'
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

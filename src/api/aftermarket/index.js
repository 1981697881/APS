import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 销售计划-获取列表
export function getSalesList(params) {
  const url = '/sale-order/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
// 获取销售单详情
export function getSalesInfo(params) {
  const url = '/sale-order/getOrderByOrderNum'
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
    },
    method: 'get',
    params: {
      orderNum: params
    }
  })
}
// 确认单据
export function notarizeList(params) {
  const url = '/sale-order/confirm/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
    },
    method: 'post',
  })
}

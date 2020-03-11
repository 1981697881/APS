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

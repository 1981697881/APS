import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'
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
// 班次詳情-获取列表
export function getShiftInfoList(params, query) {
  const url = '/order-of-work/list/' + params.pageNum + '/' + params.pageSize
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

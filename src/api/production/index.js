import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 生产排程-获取成品列表
export function getSchedulingList(params, query) {
  const url = '/task-scheduling/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 生产排程-获取半成品列表
export function getSemiList(params, query) {
  const url = '/task-scheduling/semiList'
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 生产排程-预览
export function schedulingPreview(params) {
  const url = '/task-scheduling/getProdRes'
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 生产排程-保存
export function schedulingSave(params) {
  const url = '/Admin/Schedule/insertOrder'
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 生产排程-修改
export function schedulingAlter(params) {
  const url = '/task-scheduling/update'
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'put',
    data: params
  })
}
// 生产排程-汇报
export function updateProductNum(params) {
  const url = '/task-scheduling/updateProductNum'
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'put',
    data: params
  })
}
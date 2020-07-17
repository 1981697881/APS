import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'
// 班次管理-获取列表
export function getShiftList(params, query) {
  const url = '/order-of-work/list'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'POST',
    data: query
  })
}
// 班次詳情-获取列表
export function getShiftInfoList(params) {
  const url = '/order-of-work/getById/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'GET',
  })
}
// 班次-新增
export function shiftAdd(params) {
  const url = '/order-of-work/add'
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
// 排班-职员绑定班次
export function empBind(params) {
  const url = '/employee-oow/empBind'
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
// 排班-职员绑定班次
export function empRemByEid(params) {
  const url = '/employee-oow/empRemByEid'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'delete',
    data: params
  })
}
// 班次-修改
export function shiftAlter(params) {
  const url = '/order-of-work/update'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'put',
    data: params
  })
}
// 班次-删除
export function delShift(params) {
  const url = '/order-of-work/del/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'delete'
  })
}
// 班次管理-获取员工排班列表
export function getShiftClerkList(params) {
  const url = '/employee-oow/getById/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx')
    },
    method: 'GET',
  })
}
// 班次管理-获取员工排班列表
export function getSalaryList(params) {
  const url = '/attend-manage/list'
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

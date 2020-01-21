import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 用户权限管理-获取用户组
export function getUsersTree(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}
// 用户权限管理-获取列表
export function getUsersList(data) {
  const url = '/Admin/user/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
// 用户权限管理-新增
export function addUsers(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}
// 用户权限管理-删除
export function delUsers(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}
// 用户权限管理-禁用
export function disableUsers(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}
// 用户权限管理-启用
export function enableUsers(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}
// 用户权限管理-获取详情信息
export function getUsersInfo(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}
// 用户权限管理-职员下拉
export function getClerk(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}

// 日志管理-获取列表
export function journalList(data) {
  const url = '/operation-log/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('rx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
// 日志管理-清除
export function journalClean(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}

// 看板管理-获取列表
export function getBoardList(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}
// 看板管理-获取详情
export function getBoardInfo(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}
// 看板管理-新增
export function boardAdd(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}
// 看板管理-删除
export function delBoard(params) {
  return request({
    url: '/table/list',
    headers: {
      'authorization': getToken('rx')
    },
    method: 'get',
    params
  })
}


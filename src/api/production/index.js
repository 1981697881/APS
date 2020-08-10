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
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 生产排程-获取未排程列表
export function getUnSchedulingList(params, query) {
  const url = '/sale-order/unscheduledList/' + params.pageNum + '/' + params.pageSize
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
// 生产排程-获取半成品列表
export function getSemiList(params, query) {
  const url = '/task-scheduling/semiList'
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
// 生产排程-预览
export function schedulingPreview(params) {
  const url = '/task-scheduling/getProdRes'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
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
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 库存生产排程-保存
export function schedulingInventory(params) {
  const url = '/task-scheduling/inventoryScheduling'
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
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
      'authorization': getToken('apsrx'),
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
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'put',
    data: params
  })
}
// 生产排程-录入批号
export function updateLotNo(params) {
  const url = '/task-scheduling/submitLotNo'
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
// 生产排程-结束
export function schedulingStop(params) {
  const url = '/task-scheduling/stop/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'post',
  })
}
// 生产排程-删除
export function schedulingDel(params) {
  const url = '/task-scheduling/delete/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'delete',
  })
}
// 生产排程-标签打印
export function schedulingPrint(params) {
  const url = '/barcode/barcodeTaskScheduling'
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
// 生产排程-效率表
export function efficiency(params, query) {
  const url = '/report-form/efficiency/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: query
  })
}
// 半成品-导出
export function exportSemiSchedulin(data) {
  const url = '/excel/export/semiTaskScheduling'
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
// 库存排产-获取列表
export function getStorageSchedulingList(data, query) {
  const url = '/inv-detail/lessList/' + data.pageNum + '/' + data.pageSize
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
// 生产看板
export function productBoard(params) {
  const url = '/infoBoard/productLine/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('apsrx'),
    },
    method: 'get'
  })
}

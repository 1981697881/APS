import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth' // get token from cookie
export function login(data) {
  return request({
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    },
    url: 'APS' + '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(fid) {
  return request({
    url: 'APS' + '/back/system/user/selectUserInfoById.do',
    method: 'post',
    params: { fid }
  })
}

export function logout(data) {
  return request({
    url: 'APS' + '/back/system/user/login_out.do',
    method: 'post',
  })
}
// 修改密码
export function changePassword(data) {
  return request({
    headers: {
      'Content-Type': 'application/json',
      'authorization': getToken('apsrx'),
    },
    url: 'APS' + '/user/changePass',
    method: 'post',
    data
  })
}

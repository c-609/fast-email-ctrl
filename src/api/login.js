import request from 'axios'
export function loginObj (username,password) {
    return request({
      url: '/login',
      method: 'post',
      params:{username,password}
    })
}
export function logOut() {
  return request({
    url: '/logout',
    method: 'post',
  })
}
export function getUser(){
  return request({
    url:'/config/user',
    method: 'get'
  })
}

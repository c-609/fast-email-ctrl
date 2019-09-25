import request from 'axios'

// 获取所有用户
export function getUserList(){
  return request({
    url: '/upms/user/',
    method: 'get'
  })
}

//添加用户
export function addUser (username,password,status,rids) {
  const data = {
    "username": username,
    "password": password,
    "status": status,
  }
  return request({
    url: '/upms/user/add',
    method: 'post',
    params: {data,rids},
    transformRequest: [function(){
      return JSON.stringify(data)
    }],
    headers: {
      'Content-Type' : 'application/json;'
    }
  })
  // return request({
  //   url: '/upms/user/add',
  //   method: 'post',
  //   params:{username,password,rids}
  // })
}

//删除用户
export function deleteUser(uid){
  return request({
    url: '/upms/user/delete',
    method: 'post',
    params: {uid}
  })
}

export function updateUser(id, username,password,status,roleIds){
    const data = {
      "id": id,
      "username": username,
      "password": password,
      "status": status,
    }
    return request({
      url: '/upms/user/update',
      method: 'post',
      params: {data,roleIds},
      transformRequest: [function(){
        return JSON.stringify(data)
      }],
      headers: {
        'Content-Type' : 'application/json;'
      }
    })
}

// 根据用户id 获取用户拥有的权限
export function getUserMenuTree (uid) {
  return request ({
    url: '/upms/user/menuTree',
    method: 'post',
    params: {uid}
  })
}

//根据部门id获取用户列表
export function getListByDeptId (deptId) {
  return request ({
    url: '/upms/user/getListByDeptId',
    method: 'get',
    params: {deptId}
  })
}



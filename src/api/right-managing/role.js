import request from 'axios'

//获取所有角色
export function getRoleList (size,current) {
    return request({
      url: '/manage/role/page',
      method: 'get',
      params:{size,current}
    })
}

export function getRightTree(){
  return request({
    url: '/config/allmenuTree',
    method: 'get'
  })
}

// 添加角色
export function addRole(name,roleName,status,level,levelName,operatorId){
  const data = {
    "name": name,
    "roleName": roleName,
    "status":status,
    "level":level,
    "levelName":levelName,
    "operatorId":operatorId
  }
  return request({
    url: '/manage/role',
    method: 'post',
    params: data,
    transformRequest: [function(){
      return JSON.stringify(data)
    }],
    headers: {
      'Content-Type' : 'application/json;'
    }
  })
}

//更新角色
export function updateRole(id,name,roleName,status,level,levelName,operatorId){
  const data = {
    "id":id,
    "roleName": roleName,
    "name": name,
    "status":status,
    "level":level,
    "levelName":levelName,
    "operatorId":operatorId
  }
  return request({
    url: '/manage/role',
    method: 'put',
    params: data,
    transformRequest: [function(){
      return JSON.stringify(data)
    }],
    headers: {
      'Content-Type' : 'application/json;'
    }
  })
}

//为角色的部门授权
export function updateRoleDept(rid,deptIds) {
  return request({
    url: '/upms/role/deptAuthForRole',
    method: 'post',
    params: {rid,deptIds}
  })
}

// 根据id删除角色
export function deleteRole(roleId) {
  return request({
    url: '/manage/role',
    method: 'delete',
    params: {roleId}
  })
}

//更新角色权限
export function updateRoleRight(rid, mids){
  return request({
    url: '/upms/role/auth',
    method: 'post',
    params: {rid, mids}
  })
}

export function getRoleRight(rid){
  return request({
    url: '/config/menuIdByRid',
    method: 'post',
    params: {rid}
  })
}

export function getRole () {
  return request({
    url: '/upms/role/',
    method: 'get',
  })
}

//根据角色id获取部门列表
export function getRoleDept (roleId) {
  return request({
    url: '/config/findDeptsByRoleid',
    method: 'get',
    params: {roleId}
  })
}
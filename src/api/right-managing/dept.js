import request from 'axios'

//获取部门树
export function getDeptTree(){
  return request({
    url: '/manage/dept/tree',
    method: 'get',
  })
}

//根据部门id获取部门信息
export function getDeptInfo(id){
  return request({
    url: '/upms/dept/'+id,
    method:'get',
  })
}

export function addDept(name,parentId,sort){
  const data = {
    "name": name,
    "parentId": parentId
  }
  return request({
    url: '/upms/dept/dept_add',
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

export function deleteDept(id){
  return request({
    url: '/upms/dept/dept_delete',
    method: 'post',
    params: {id}
  })
}

export function updateDept(id,name,parentId){
  const data = {
    "id": id,
    "name": name,
    "parentId": parentId
  }
  return request({
    url: '/upms/dept/dept_update',
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
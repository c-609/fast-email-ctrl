import request from 'axios'

//获取部门树
export function getDeptTree(){
  return request({
    url: '/manage/dept/tree',
    method: 'get',
  })
}



export function addDept(name,parentId,operatorId){
  const data = {
    "name": name,
    "parentId": parentId,
    "operatorId":operatorId
  }
  return request({
    url: '/manage/dept',
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

export function deleteDept(deptId){
  return request({
    url: '/manage/dept',
    method: 'delete',
    params: {deptId}
  })
}

export function updateDept(id,name,parentId,operatorId){
  const data = {
    "id": id,
    "name": name,
    "parentId": parentId,
    "operatorId":operatorId
  }
  return request({
    url: '/manage/dept',
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

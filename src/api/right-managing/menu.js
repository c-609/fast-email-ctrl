import request from 'axios'
export function getMenu () {
    return request({
      url: '/upms/menu',
      method: 'get',
    })
}

export function getMenuTree(){
  return request({
    url: '/upms/menu/tree',
    method: 'get'
  })
}

export function getMenuList(){
  return request({
    url:' /upms/menu/list',
    method: 'get'
  })
}

export function addMenu(parentId, url, name, path){
  return request({
    url: '/upms/menu/add',
    method: 'post',
    params: { parentId, url, name, path }
  })
}

export function deleteMenu(mid){
  return request({
    url: '/upms/menu/delete',
    method: 'post',
    params:{mid}
  })
}

export function updateMenu(id, name, component, path){
  return request({
    url: '/upms/menu/update',
    method: 'post',
    params: {id, name, component, path}
  })
}
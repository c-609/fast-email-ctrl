import request from 'axios'

// 获取分页用户
export function getPageUser(size, current) {
    return request({
        url: '/manage/user/page',
        method: 'get',
        params: { size, current }
    })
}
//添加用户
export function addUser(username, password, name, phone, age, email, gender, identityEntities) {
    const data = {
        "username": username,
        "password": password,
        "name": name,
        "phone": phone,
        "age": age,
        "email": email,
        "gender": gender,
        "identityEntities": identityEntities,
    }
    return request({
        url: '/manage/user',
        method: 'post',
        params: data,
        transformRequest: [function() {
            return JSON.stringify(data)
        }],
        headers: {
            'Content-Type': 'application/json;'
        }
    })
}

//编辑用户
export function updateUser(userId, name, phone, gender, age, email, identityEntities) {
    const data = {
        "userId": userId,
        "name": name,
        "phone": phone,
        "gender": gender,
        "age": age,
        "email": email,
        "identityEntities": identityEntities,
    }
    return request({
        url: '/manage/user',
        method: 'put',
        params: data,
        transformRequest: [function() {
            return JSON.stringify(data)
        }],
        headers: {
            'Content-Type': 'application/json;'
        }
    })
}
//删除用户
export function deleteUser(userId) {
    return request({
        url: '/manage/user',
        method: 'delete',
        params: { userId }
    })
}

// 根据用户id 获取用户拥有的权限
export function getUserMenuTree(uid) {
    return request({
        url: '/upms/user/menuTree',
        method: 'post',
        params: { uid }
    })
}

//根据部门id获取用户列表
export function getListByDeptId(deptId) {
    return request({
        url: '/upms/user/getListByDeptId',
        method: 'get',
        params: { deptId }
    })
}
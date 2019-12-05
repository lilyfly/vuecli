import request from '@/utils/request'

export function getList(data) {
    return request({
        url: '/school/list',
        method: 'post',
        data
    })
}

export function updateList(data) {
    return request({
        url: '/school/updateList',
        method: 'post',
        data
    })
}

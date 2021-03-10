import { post, get } from './http'
import { loginData } from './mock'
import { IloginParams } from '../types'



function getCaptcha(data: object) {
    return post('/api/catcha', data)
}

function getLogin<T extends IloginParams>(data: T) {
    // return post('/api/login', data)
    return loginData<T>(data)
}

export { getCaptcha, getLogin }


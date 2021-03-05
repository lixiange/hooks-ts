import { post, get } from './http'
import { loginData } from './mock'
import { IloginParams } from '../page/login'

function getCaptcha(data: object) {
    return post('/api/catcha', data)
}

function getLogin(data: IloginParams) {
    // return post('/api/login', data)
    return loginData(data)
}

export { getCaptcha, getLogin }

import { IloginParams } from '../page/login'

const loginData = (data: IloginParams) => {
    let res = new Promise((res, rej) => {
        setTimeout(() => {
            if (data.username && data.username === 'admin') {
                if (data.password && data.password === '123456') {
                    res({ code: 200, data: '登录成功' })

                } else {
                    rej({ code: 400, data: '密码错误' })

                }
            } else {
                rej({ code: 400, data: '用户名错误' })
            }

        }, 2000);
    })
    return res
}


export { loginData }
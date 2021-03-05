import { GET_UESR_INFO } from '../constants'

export const setUserInfo = (res: object) => {
    return {
        type: GET_UESR_INFO,
        value: res
    }
}

import { CHANGE_NUMBER_STATUS } from '../constants'


export const changeNumberStatus = (data: number) => {
    return {
        type: CHANGE_NUMBER_STATUS,
        data
    }
}
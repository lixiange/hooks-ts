import {
    put,
    take,
    takeEvery,
    fork,
    call,
    cancel,
    join,
    select,
    race,
    delay,
    takeLeading,
} from "redux-saga/effects";
import * as constants from '../constants'


function* getUserInfo() {

}
function* userSaga() {
    yield takeLeading(constants.GET_UESR_INFO, getUserInfo)
}
export default userSaga
/**
 * 用户信息类型
 */

export interface ResponseData<T = any> {
    code: number;
    data: T;

}
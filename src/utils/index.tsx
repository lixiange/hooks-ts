
/**
 * @function
 * @param length 生成验证码的长度
 */
const getRandom = (length: number = 4): string => {
    let str = '';
    for (let i = 0; i < length; i++) {
        str += Math.floor(Math.random() * 10)
    }
    return str;
}

export { getRandom }
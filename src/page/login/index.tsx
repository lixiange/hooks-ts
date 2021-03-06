import React, { useCallback, useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { StoreState } from '../../store'
import { setUserInfo } from '../../store/actions'
import { useInput } from '../../hooks'
import './style.scss'
import { Button, Input, notification } from 'antd'
import { UserOutlined, LockOutlined, PictureOutlined } from '@ant-design/icons'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { getLogin, getCaptcha } from '../../request/api'
import { ResponseData, Ilogin, IgetCaptcha } from '../../types'
import sh from '../../assets/img/sh.png'
import codesp from '../../assets/img/code.webp'

type MapStateToProps = Readonly<ReturnType<typeof mapStateToProps>>
type MapDispatchToProps = Readonly<ReturnType<typeof mapDispatchToProps>>
type Iprops = MapDispatchToProps & MapStateToProps & RouteComponentProps

const Login: React.FC<Iprops> = props => {
    const history = useHistory()
    const username = useInput("")
    const password = useInput("")
    const code = useInput("")
    const usernameRef = useRef<any>(null);
    const passwordRef = useRef<any>(null)
    const codeRef = useRef<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        const useinfo = localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo') as string) : null;
        if (useinfo) {
            props.history.replace('/home')
        } else {
            usernameRef.current.focus()
        }
    }, [props.history])


    const handleSubmit = useCallback(async () => {
        try {
            setLoading(true)
            let res = await getLogin({ username: username.val, password: password.val, code: code.val }) as ResponseData<Ilogin>
            setLoading(false)
            localStorage.setItem('userinfo', JSON.stringify({ sername: username.val, password: password.val }))
            props.setUserInfoMy({ username: username.val, password: password.val })
            notification.open({
                message: 'SUCCESS',
                description:
                    res.data,
                duration: 1,
                onClose: () => { history.push('/home') }
            });

        } catch (error) {
            notification.open({
                message: 'Fail',
                description:
                    error.data,
                duration: 1,
            });
        }
    }, [code.val, history, password.val, props, username.val])

    const pressEnter = useCallback((inputType: string) => {
        switch (inputType) {
            case 'username':
                passwordRef.current.focus()
                return;
            case "password":
                codeRef.current.focus()
                return;
            case "code":
                handleSubmit()

        }
    }, [handleSubmit])

    return <section className='login-page'>
        <a
            rel="noopener noreferrer"
            className="login-right"
            href="https://github.com/2662419405"
            target="_blank"
        >
            <img
                src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
                alt="github"
            />
        </a>
        <div className='wrap'>
            <div>
                <div className="logo-wrap">
                    <img
                        alt="logo"
                        className="logo"
                        src={sh}
                    />
                </div>
                <Input.Group>
                    <Input
                        maxLength={32}
                        placeholder='username/admin'
                        prefix={<UserOutlined />}
                        ref={usernameRef}
                        {...username}
                        autoComplete='off'
                        onPressEnter={() => { pressEnter('username') }}
                    />
                    <Input
                        maxLength={32}
                        placeholder='password/123456'
                        prefix={<LockOutlined />}
                        ref={passwordRef}
                        {...password}
                        autoComplete='off'
                        type='password'
                        onPressEnter={() => { pressEnter('password') }}

                    />
                    <Input
                        {...code}
                        prefix={<PictureOutlined />}
                        maxLength={4}
                        autoComplete='off'
                        ref={codeRef}

                        placeholder='??????????????????'
                        suffix={
                            <img
                                alt="code"
                                className="captcha"
                                src={codesp}
                            />
                        }
                        onPressEnter={() => { pressEnter('code') }}
                    />
                </Input.Group>
                <Button
                    size='large'
                    className='weitiao-btn'
                    block={true}
                    type='primary'
                    loading={loading}
                    onClick={handleSubmit}
                >
                    {loading ? '????????????' : '??????'}
                </Button>
            </div>
        </div>

    </section>
}

const mapStateToProps = (state: StoreState) => {
    return {

    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        setUserInfoMy: (res: object) => {
            dispatch(setUserInfo(res))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
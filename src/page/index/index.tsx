import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import { StoreState } from '../../store'
import { Menu, Dropdown, Button } from 'antd'
import './style.scss'
import { useHistory, RouteComponentProps } from 'react-router-dom'

interface PortalProps extends RouteComponentProps {
  username: string
}

const Protal: React.FC<PortalProps> = (props) => {
  const history = useHistory()
  const [state, setState] = useState(0)
  const add = (type: number) => {
    setState((pre) => pre + 1)
  }
  console.log(props.history)

  useEffect(() => {
    //js中对象应该有的特征：有自己的属性和方法
    //js中的基本数据类型不是对象，能调用属性和方法是因为是包装对象，基本数据类型运行时会经历三个步骤：
    //1。new 一个对应包装类的实例2、调用对应包装类的属性或者方法3、销毁实例
  }, [])

  const loginOut = () => {

    localStorage.removeItem('userinfo')
    history.push('/')
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={() => { loginOut() }}>退出登1录</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={() => { loginOut() }}>退出1登录</div>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className="home-page">

      <div className='top_admin'>
        <Dropdown overlay={menu} arrow>
          <Button>
            {props.username}

          </Button>
        </Dropdown>

      </div>
      <div className="title">React-admin</div>
      <p>标准TS + Hooks分层结构，react16、router4、antd4、webpack4、ES6+、TS、Hooks</p>
      <p>后台管理系统模块，后台管理系统模块1</p>
    </div>
  )
}
const mapStateToProps = (state: StoreState) => {
  return {
    username: state.User.userinfo.username,

  }
}
export default connect(mapStateToProps, null)(Protal)
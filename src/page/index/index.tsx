import React, { useState } from "react";
import { connect } from 'react-redux'
import { StoreState } from '../../store'
import { Menu, Dropdown, Button } from 'antd'
import './style.scss'
import { useHistory } from 'react-router-dom'

interface PortalProps {
  username: string
}

const Protal: React.FC<PortalProps> = (props) => {
  const history = useHistory()
  const [state, setState] = useState(0)

  const add = (type: number) => {
    setState((pre) => pre + 1)
  }

  const loginOut = () => {
    localStorage.removeItem('userinfo')
    history.push('/')
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={() => { loginOut() }}>退出登录</div>
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
      <p>后台管理系统模块</p>
    </div>
  )
}
const mapStateToProps = (state: StoreState) => {
  return {
    username: state.User.userinfo.username,

  }
}
export default connect(mapStateToProps, null)(Protal)
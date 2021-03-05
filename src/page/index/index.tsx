import React, { useState } from "react";
import { connect } from 'react-redux'
import { StoreState } from '../../store'

interface PortalProps {
  username: string
}

const Protal: React.FC<PortalProps> = (props) => {
  const [state, setState] = useState(0)
  console.log(props)

  const add = (type: number) => {
    setState((pre) => pre + 1)
  }
  return <div>
    {props.username}
  </div>
}
const mapStateToProps = (state: StoreState) => {
  return {
    username: state.User.userinfo.username,

  }
}
export default connect(mapStateToProps, null)(Protal)

import React, { Suspense, useCallback, useEffect } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loading } from './components'
import { UserStateProps } from './store/reducers/user'
import { ErrorBoundary } from './components'
import { StoreState } from './store'
import { setUserInfo } from './store/actions';
import { userInfo } from 'node:os';
const Login = React.lazy(() => import('./page/login'))
const Index = React.lazy(() => import('./page/index'))

interface Iprops extends UserStateProps {
  setUserInfoMy: any;

}
const Routers: React.FC<Iprops> = (props) => {
  useEffect(() => {
    console.log(props.userinfo)
    const userinfo = localStorage.getItem('userinfo')
    if (userinfo && !props.userinfo.username) {
      props.setUserInfoMy({ username: 'admin', password: '123456' })
    }
  }, [])
  const onEnter = useCallback((Component, props) => {
    let userinfo = localStorage.getItem('userinfo');
    console.log(userinfo)
    if (userinfo) {
      return <Component {...props} />
    }
    return <Redirect to='/'></Redirect>
  }, [])
  return <HashRouter>
    <Suspense fallback={<Loading />}>
      <ErrorBoundary >
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path='/home' render={(props) => onEnter(Index, props)} />
        </Switch>
      </ErrorBoundary>

    </Suspense>

  </HashRouter>
}

const mapStateToProps = (state: StoreState) => ({
  userinfo: state.User.userinfo
})
const mapDispatchToProps = (dispatch: any) => ({
  setUserInfoMy(res: object) {
    dispatch(setUserInfo(res))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Routers)
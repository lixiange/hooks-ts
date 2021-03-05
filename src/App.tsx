
import React, { Suspense, useCallback, useEffect } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loading } from './components'
import { UserStateProps } from './store/reducers/user'
import { ErrorBoundary } from './components'
import { StoreState } from './store'
import { setUserInfo } from './store/actions';
const Login = React.lazy(() => import('./page/login'))
const Index = React.lazy(() => import('./page/index'))

interface Iprops extends UserStateProps {
  setUserInfoMy: any;

}
const Routers: React.FC<Iprops> = (props) => {
  useEffect(() => {

  })
  const onEnter = useCallback((Component, props) => {
    return <Component {...props} />
  }, [])
  console.log(props)
  return <HashRouter>
    <Suspense fallback={<Loading />}>
      <ErrorBoundary >
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path='/home' render={(props) => onEnter(Index, props)} />
          <Redirect to='/'></Redirect>
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
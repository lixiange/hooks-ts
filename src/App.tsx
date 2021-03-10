
import React, { Suspense, useCallback, useEffect } from 'react'
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loading } from './components'
import { UserStateProps } from './store/reducers/user'
import { ErrorBoundary } from './components'
import { StoreState } from './store'
import { setUserInfo } from './store/actions';
import { layoutRouteList } from './router/utils'
import { IRoute } from './router/config'
import config from './config'

const Login = React.lazy(() => import('./page/login'))
const Index = React.lazy(() => import('./page/index'))
const Home = React.lazy(() => import('./page/home'))

interface Iprops extends UserStateProps {
  setUserInfoMy: any;

}
const Routers: React.FC<Iprops> = (props) => {
  useEffect(() => {
    const userinfo = localStorage.getItem('userinfo')
    if (userinfo && !props.userinfo.username) {
      props.setUserInfoMy({ username: 'admin', password: '123456' })
    }
  }, [props])
  const onEnter = useCallback((Component, props) => {
    let userinfo = localStorage.getItem('userinfo');
    if (userinfo) {
      return <Component {...props} />
    }
    return <Redirect to='/'></Redirect>
  }, [])

  useEffect(() => {
    console.log(layoutRouteList)
    let result = layoutRouteList.map((route: IRoute) => (
      <Route key={config.BASENAME + route.path} path={route.path} component={route.component}>

      </Route>
    ))
    console.log(result)
  }, [])

  return <HashRouter>
    <Suspense fallback={<Loading />}>
      <ErrorBoundary >
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path='/index' render={(props) => onEnter(Index, props)} />
          <Route exact path='/home' render={(props) => onEnter(Home, props)} />
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
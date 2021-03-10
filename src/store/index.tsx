import { createStore, compose, applyMiddleware } from 'redux'
import reducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import { UserStateProps } from './reducers/user'
import { HomeListProps } from './reducers/home'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware();
export interface StoreState {
    User: UserStateProps,
    Home: HomeListProps
}
export default createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
import { createStore, compose, applyMiddleware } from 'redux'
import reducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import { UserStateProps } from './reducers/user'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware();
export interface StoreState {
    User: UserStateProps
}
export default createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
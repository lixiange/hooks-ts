/**
 * 子组件有任何报错都会传递到此
 * 用于页面异步加载出错时显示
 * 此组件只能用class的方式，因为hooks不支持getDerivedStateFromError和componentDidCatch
 */

import React from 'react';
import { WarningOutlined } from '@ant-design/icons'

interface IState {
    hasError: boolean;
}
interface Iprops {
    // location: Location;
    children: JSX.Element
}

class ErrorBoundary extends React.PureComponent<Iprops, IState>{
    constructor(props: Iprops) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFromError() {
        return { hasError: true }
    }
    componentDidUpdate(prevP: Iprops) {

    }
    componentDidCatch(error: any) {
        console.log(error)
    }

    render() {
        if (this.state.hasError) {
            return <div className="error-boundary">
                <WarningOutlined className="error-icon" />
                <div>加载出错,请刷新页面</div>
            </div>
        }
        return this.props.children
    }
}
export default ErrorBoundary
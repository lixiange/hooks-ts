import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { changeNumberStatus } from '../../store/actions'
import { StoreState } from '../../store'
import { RouteComponentProps } from 'react-router-dom'
import './style.scss'
import Img from '../../assets/img/code.webp'


interface defaultProps {
    name: string

}
type User = {
    name: string,
    age: number
}
type MapStateToProps = Readonly<ReturnType<typeof mapStateToProps>>
type MapDispatchToProps = Readonly<ReturnType<typeof mapDispatchToProps>>
type Iprops = defaultProps & MapStateToProps & MapDispatchToProps & RouteComponentProps

const Home: React.FC<Iprops> = props => {
    const [user, setUser] = useState('')

    useEffect(() => {
        //兼顾中西，西文在前，中文在后
    })
    return <div >

    </div>
}


const mapStateToProps = (state: StoreState) => {
    return {
        data: state.Home.data
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        changeNumber: function (data: number) {
            dispatch(changeNumberStatus(data))
        }
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
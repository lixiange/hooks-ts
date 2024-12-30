import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { changeNumberStatus } from '../../store/actions'
import { StoreState } from '../../store'
import { RouteComponentProps } from 'react-router-dom'
import './style.scss'


interface defaultProps {
    name: string

}
type User = {
    name: string,
    age: number,
    hobby: string,
}
type MapStateToProps = Readonly<ReturnType<typeof mapStateToProps>>
type MapDispatchToProps = Readonly<ReturnType<typeof mapDispatchToProps>>
type Iprops = defaultProps & MapStateToProps & MapDispatchToProps & RouteComponentProps

const Home: React.FC<Iprops> = props => {
    const [user, setUser] = useState('')
    const [Index, setIndex] = useState(0)

    const test: User = {
        name: '123',
        age: 12,
        hobby: '123'
    }

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

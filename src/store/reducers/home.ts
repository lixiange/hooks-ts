import { CHANGE_NUMBER_STATUS } from '../constants'

interface HomeInfoProps {
    number: number
}

export interface HomeListProps {
    data: HomeInfoProps
}

interface ActionTypes {
    type: 'string',
    value: any
}

const initState: HomeListProps = {
    data: {
        number: 0
    }
}

export default function reducer(state = initState, action: ActionTypes) {
    switch (action.type) {
        case CHANGE_NUMBER_STATUS:
            const obj: HomeListProps = state;
            obj.data.number = action.value
            return obj;
        default:
            return state
    }

}
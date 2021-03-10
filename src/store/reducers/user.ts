import { GET_UESR_INFO } from '../constants'

interface UserInfoProps {
    provider: string;
    uid: number | undefined;
    username: string;
    password: string;
    loginName: string;
    avatarUrl: string;
    email: string;
    role: string;
    token: string | undefined;
    bio: string;
    location: string;
    createdAt: string;
}
export interface UserStateProps {
    userinfo: UserInfoProps
}
export const defaultState: UserStateProps = {
    userinfo: {
        provider: "",
        uid: undefined,
        createdAt: "",
        bio: "",
        username: "",
        password: "",
        loginName: "",
        avatarUrl: "",
        email: "",
        role: "",
        token: undefined,
        location: ""
    }
}
interface Iactions {
    type: string;
    value: any;
}
export default function GetUserInfo(state = defaultState, action: Iactions): UserStateProps {
    switch (action.type) {
        case GET_UESR_INFO:

            const obj: UserStateProps = state
            return { userinfo: { ...obj.userinfo, ...action.value } }
        default:
            return state;
    };

}


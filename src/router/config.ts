import React from 'react'

export interface IRouteMeta {
    title: string;
    icon?: string
}

export interface IRouteBase {
    path: string; //路由路径
    component?: any; //路由组件
    redirect?: string; //302跳转
    meta: IRouteMeta; //路由信息
    auth?: boolean /// 是否校验权限, false 为不校验, 不存在该属性或者为true 为校验, 子路由会继承父路由的 auth 属性
}
export interface IRoute extends IRouteBase {
    children?: IRoute[]
}

const routes: IRoute[] = [
    {
        path: '/system',
        component: React.lazy(() => import('../page/home')),
        meta: {
            title: '系统路由',
        },
        redirect: '/system/login',
        children: [
            {
                path: '/system/login',
                component: React.lazy(() => import('../page/home')),
                meta: {
                    title: '登录',
                },
            },
            {
                path: '/system/register',
                component: React.lazy(() => import('../page/home')),
                meta: {
                    title: '注册',
                },
            },
        ]
    },
    {
        path: '/',
        component: React.lazy(() => import('../page/home')),
        meta: {
            title: '系统',
        },
        redirect: '/dashborad/intro',
        children: [
            {
                path: '/dashborad',
                meta: {
                    title: '首页',
                    icon: 'dashborad',
                },
                redirect: '/dashborad/intro',
                children: [
                    {
                        path: '/dashborad/intro',
                        component: React.lazy(() => import('../page/home')),
                        meta: {
                            title: '系统介绍',
                            icon: 'read',
                        },
                    },
                ],
            },

            // 以下菜单为系统权限管理
            {
                path: '/auth',
                meta: {
                    title: '权限管理',
                    icon: 'setting',
                },
                redirect: '/auth/menu',
                children: [
                    {
                        path: '/auth/menu',
                        meta: {
                            title: '菜单管理',
                            icon: 'menu',
                        },
                        component: React.lazy(() => import('../page/index')),
                    },
                    {
                        path: '/auth/role',
                        meta: {
                            title: '角色管理',
                            icon: 'team',
                        },
                        component: React.lazy(() => import('../page/login')),
                    },
                    {
                        path: '/auth/user',
                        meta: {
                            title: '用户管理',
                            icon: 'user',
                        },
                        component: React.lazy(() => import('../page/login')),
                    },
                ],
            }
        ]
    }
]

export default routes
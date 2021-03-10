import routes, { IRoute } from './config'
import config from '../config'

export function flattenRoute(routeList: IRoute[], deep: boolean, auth: boolean): IRoute[] {
    const result: IRoute[] = [];
    for (let i = 0; i < routeList.length; i += 1) {
        const route = routeList[i]
        result.push({
            ...route,
            auth: typeof route.auth !== 'undefined' ? route.auth : auth
        });
        if (route.children && deep) {
            result.push(...flattenRoute(route.children, deep, auth))
        }
    }
    return result
}

function getLayoutRouteList(): IRoute[] {
    return flattenRoute(routes, false, false)
}

function getBusinessRouteList(): IRoute[] {
    const routeList = routes.filter(route => route.path === '/');
    if (routeList.length > 0) {
        return flattenRoute(routeList, true, true)
    }
    return []
}
function getSystenRouteList(): IRoute[] {
    const routeList = routes.filter(route => route.path === '/system')
    if (routeList.length > 0) {
        return flattenRoute(routeList, true, false)
    }
    return []
}
export const layoutRouteList = getLayoutRouteList();
export const businessRouteList = getBusinessRouteList();
export const systemRouteList = getSystenRouteList();

function findRoutesByPaths(pathList: string[], routeList: IRoute[], basename?: string): IRoute[] {
    return routeList.filter((child: IRoute) => pathList.indexOf((basename || '') + child.path) !== -1)
}
export function getPageTitle(routeList: IRoute[]): string {
    const route = routeList.find(child => child.path === window.location.pathname);
    return route ? route.meta.title : ''
}

export function getPagePathList(pathname?: string): string[] {
    return (pathname || window.location.pathname).split('/').filter(Boolean).map((value, index, array) => '/'.concat(array.slice(0, index + 1).join('/')))
}
export function getBreadcrumbs(): IRoute[] {
    return findRoutesByPaths(getPagePathList(), businessRouteList, config.BASENAME)
}
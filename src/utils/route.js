export function flatRoutes(routes) {
    const result = []
    routes.forEach(route => {
        if (route.children) {
            result.push(...flatRoutes(route.children))
        } else {
            result.push(route)
        }
    })
    return result
}
export function hasRoutePermission(current, permissionList) {
    if (!current || !permissionList || !permissionList.length) {
        return false
    }
    return permissionList.find(i => i.path === current)
}
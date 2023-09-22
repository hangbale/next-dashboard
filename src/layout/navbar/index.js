import { Menu } from 'antd';
import { useRouter } from 'next/router';
import { navbarItems } from '@/config';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';


function flat(list, dest) {
    list.forEach(element => {
        let t = element.label
        element.label = (
            <Link href={element.path}>{t}</Link>
        )
        dest.push(element)
        if(list.children) {
            flat(list.children, dest)
        }
    });
}

function filterRoutes(permissionList, routes, dest) {
    routes.forEach(item => {
        if(permissionList.find(i => i.key === item.key)) {
            if(item.children) {
                item.children = filterRoutes(permissionList, item.children, [])
            }
            dest.push(item)
        }
    })
}




function getCurrent(pathname, list) {
    let e = list.find(item => item.path === pathname)
    return e ? e.key : 'home'
}

export default function Navbar(props) {
    const router = useRouter();
    let {pathname} = router
    let [current, setCurrent] = useState([])
    let filteredNavbarItems = useRef([])
    let navbarItemsList = useRef([])
   
    useEffect(function() {
        if(props.userInfo) {
            let permissionList = props.userInfo.routes
            let f = []
            filterRoutes(permissionList, navbarItems, f)
            filteredNavbarItems.current = f
            let n = []
            flat(f, n)
            navbarItemsList.current = n
            setCurrent([getCurrent(pathname, n)])
        }
    }, [props.userInfo])

    useEffect(function() {
        setCurrent([getCurrent(pathname, navbarItemsList.current)])
    }, [pathname])

    return (
        <div style={{
            padding: '0 24px',
            background: '#001529'
        }}>
            <Menu
            className="main-top-nav"
            mode="horizontal"
            theme='dark'
            selectedKeys={current}
            items={filteredNavbarItems.current} />
        </div>
  
    )
}
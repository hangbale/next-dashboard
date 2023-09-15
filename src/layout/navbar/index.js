import { Menu } from 'antd';
import { useRouter } from 'next/router';
import { navbarItems } from '@/config';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function flat(list, dest) {
    list.forEach(element => {
        element.label = (
            <Link href={element.path}>{element.label}</Link>
        )
        dest.push(element)
        if(list.children) {
            flat(list.children, dest)
        }
    });
}
let navbarItemsList = []
flat(navbarItems, navbarItemsList)


function getCurrent(pathname) {

    let e = navbarItemsList.find(item => item.path === pathname)

    return e ? e.key : 'home'
}

export default function Navbar(props) {
    const router = useRouter();
    let {pathname} = router
    let [current, setCurrent] = useState(getCurrent(pathname))
    useEffect(function() {
        setCurrent(getCurrent(pathname))
    }, [pathname])
    return (
        <Menu  mode="horizontal" selectedKeys={[current]} items={navbarItems} />
    )
}
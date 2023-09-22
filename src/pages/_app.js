import { useEffect, useState, useRef } from 'react';
import '@/styles/globals.css'
import { ConfigProvider, Skeleton, Result, Button } from 'antd';
import themeConfig from '@/theme-config';
import Navbar from '@/layout/navbar';
import { fetchUserInfo } from '@/api';
import { useRouter } from 'next/router';
import { flatRoutes, hasRoutePermission } from '@/utils/route';
export default function App({ Component, pageProps }) {
  const router = useRouter();
  let [userInfo, setUserInfo] = useState(null)
  let [hasPermission, setHasPermission] = useState(false)
  let permissionList = useRef([])

  useEffect(function() {
    fetchUserInfo().then(function(res) {
      if(res) {
        res.routes = [
          {
            label: '首页',
            key: 'home',
              path: '/'
          },
          {
              label: '作业',
              key: 'job',
              path: '/job'
          },
          {
              label: '水印',
              key: 'watermark',
              path: '/job/detail'
          },
          {
              label: '订单',
              key: 'order',
              path: '/order'
          },
        ]
        setUserInfo(res)
        let f = flatRoutes(res.routes)
        permissionList.current = f
        setHasPermission(hasRoutePermission(router.pathname, f))
      }
    })
    // 路由守卫
    router.events.on('routeChangeStart', (url) => {
      console.log('routeChangeStart', url);
      setHasPermission(hasRoutePermission(url, permissionList.current))
    });
 
  }, [])
  return (
    <ConfigProvider theme={themeConfig}>
      {
        !userInfo ? <Skeleton active /> : (
          <div
            className='main-wrapper'
          >
            <Navbar userInfo={userInfo}/>
            {
              hasPermission ? (
                <div className='main-content'>
                  <Component {...pageProps} />
                </div>
              ) : (
                <Result
                  status="403"
                  title="403"
                  subTitle="您没有该页面的权限"
                />
              )
            }
            
          </div>
        )
      }
      
    </ConfigProvider>
  )

}

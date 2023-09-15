import '@/styles/globals.css'
import { ConfigProvider, Menu } from 'antd';
import themeConfig from '@/theme-config';
import Navbar from '@/layout/navbar';

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider theme={themeConfig}>
      <>
        <Navbar/>
        <Component {...pageProps} />
      </>
      
    </ConfigProvider>
  )

}

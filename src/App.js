import './App.css';
import React, {Suspense, lazy} from 'react';
import Header from './component/header';
import Footer from './component/footer';
import Loading from './/component/loading';
import 'antd/dist/antd.css'
import {
    Switch,
    Route,
} from 'react-router-dom';

const Home = lazy(() => import('./view/home'));
const History = lazy(() => import('./view/history'));
const Map = lazy(() => import('./view/map'));
const About = lazy(() => import('./view/about'));
const Login = lazy(() => import('./view/login.js'));
const Register = lazy(() => import('./view/register.js'))
const Beacon = lazy(() => import('./view/beacon'));
const Device = lazy(() => import('./view/device'));
const MadeMap= lazy(() => import('./view/madeMap'));
const DoneMap= lazy(() => import('./view/doneMap'));

function App() {
    return (
        <>
            <Header/>
            <main>
                <Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route path="/" exact component={Home}/>     {/*这里是上传地图 */}
                        <Route path='/history' component={History}/> {/*这里是未绘制的地图 */}
                        <Route path="/madeMap" exact component={MadeMap}/> {/*这里是绘制地图 */}
                        <Route path="/doneMap" exact component={DoneMap}/> {/*这里是绘制好的地图 */}
                        <Route path="/map" component={Map}/>              {/*这里是实时定位 */}
                        <Route path="/beacon" exact component={Beacon}/>    {/*这里是实时信标管理 */}
                        <Route path="/device" exact component={Device}/>     {/*这里是实时设备管理 */}
                        <Route path="/about" component={About}/>             {/*这里是实时关于 */}
                    
                        <Route path="/register" component={Register}/>     {/*这里是不显示的注册 */}
                        <Route path="/login" component={Login}/>            {/*这里是不显示的登录 */}
                    </Switch>
                </Suspense>
            </main>
            <Footer/>
        </>
    );
}

export default App;

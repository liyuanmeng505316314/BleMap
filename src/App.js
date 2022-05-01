import './App.css';
import React ,{Suspense,lazy}from 'react';
import Header from './component/header';
import Footer from './component/footer';
import Loading from './/component/loading';
import 'antd/dist/antd.css'
import {
    Switch,
    Route,
  } from 'react-router-dom';
  const Home =lazy(()=>import('./view/home'));
  const History =lazy(()=>import('./view/history'));
  const Map =lazy(()=>import('./view/map'));
  const About =lazy(()=>import('./view/about'));
  const Login=lazy(()=>import('./view/login.js'));
  const Register=lazy(()=>import('./view/register.js'))

function App() {
  return (
    <>
     <Header/>
     <main>
     <Suspense fallback={<Loading/>} >
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path='/history' component= {History}  />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/map" component={Map} />
          <Route path="/register" component={Register} />
        </Switch>
      </Suspense>
      </main>
     <Footer/>
     </>
  );
}

export default App;

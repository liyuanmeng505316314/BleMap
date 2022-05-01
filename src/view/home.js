import React from 'react';
import { observer } from 'mobx-react';
// import {useStore } from '../store';
import  Uploader  from '../component/upload';
import Tips from '../component/tips'

const Home=observer(()=>{
    // const {AuthStore,UserStore} =useStore();
    return(
        <>
        <Tips>请先登录再上传 ！！！</Tips>
        <Uploader />
        </>
    )
})



export default Home;

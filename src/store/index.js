import React, {createContext,useContext} from 'react';
// import {AuthStore} from './auth'; 以前的AuthStore是类
import AuthStore from './auth';
import UserStore from './user';
import ImageStore from './image'
import HistoryStore from './history'

const context = createContext({
    HistoryStore,
    AuthStore,
    UserStore,
    ImageStore 
}); //context是createContext函数的返回值，该函数的传参是个对象  

window.stores = {
    AuthStore,
    UserStore,
    ImageStore,
    HistoryStore,
    // ImageStore,
    // HistoryStore
  };

//这里好奇怪，有点像是，用对象封装了一个对象，用函数导出了一个函数

export const useStore =()=> useContext(context) //导出了一个函数，该函数的内容是执行另一个函数 userStore

//每个功能组的核心都是index，index相当于每个功能的引用中心，内部通常不含解决需求的代码，但作用是引入其他解决需求的代码

//auth.js创建的是类，而不是对象，在index里面才创建为对象的。对象是类的实例，相当于对象的设计图，如果创建了类，想使用对象里的方法，必须先得构建出类的实例，即对象
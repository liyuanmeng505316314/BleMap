import { message } from 'antd';
import { observable,action,makeObservable} from 'mobx'
import {Auth} from '../model'

// 这个AuthStore存储的是，用户临时的登录信息，以及部分的操作逻辑，我觉得属于VM层的内容
class UserStore{  // AuthStore是一个对象，Auth也是一个对象，两个对象都有自己的属性和方法，而AuthStore的工具方法，是来自Auth对象的工具方法，并且对其进行了修饰
    constructor(){
        makeObservable(this)
    };

    @observable currentUser=null;

    @action pullUser(){
        this.currentUser=Auth.getCurrentUser()
    }
    @action resetUser(){
        this.currentUser=null;
    }

}
export default new UserStore();





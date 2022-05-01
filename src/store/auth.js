import { message } from 'antd';
import { observable,action,makeObservable} from 'mobx'
import HistoryStore from './history'
import {Auth} from '../model'
import UserStore from './user'
import ImageStore from './image'

// 这个AuthStore存储的是，用户临时的登录信息，以及部分的操作逻辑，我觉得属于VM层的内容
class AuthStore{  // AuthStore是一个对象，Auth也是一个对象，两个对象都有自己的属性和方法，而AuthStore的工具方法，是来自Auth对象的工具方法，并且对其进行了修饰
    constructor(){
        makeObservable(this)
    };
    @observable values={
        username:'',
        password:'',
    };
  @action setUsername(username){
      this.values.username=username;
  };
  @action setPassword(password){
      this.values.password=password;
  };
  @action login(){ //登录逻辑
    return new Promise((resolve,reject)=>{  // promise是一个ES6自带的构造函数，会生成一个Promise对象，传进去的参数是一个箭头函数。定义如果事件成功执行什么，事件失败执行什么
      Auth.login(this.values.username,this.values.password) //成功之后可以做一些事情，那就是用then和catch，如果事件成功就执行then代码，如果事件失败就执行catch代码
       .then(user=>{
            UserStore.pullUser();
            resolve(user)})
        .catch(err=>{
            UserStore.resetUser();
            reject(err)});
        })
  };

  @action register(){ //注册逻辑
    return new Promise((resolve,reject)=>{
        Auth.register(this.values.username,this.values.password)
        .then(user=>{
            message.success('注册成功，正准备跳转到登录页面')
            UserStore.pullUser();
            resolve(user);
            })
        .catch(err=>{
            message.success('注册失败，请您稍后再试')
            UserStore.resetUser();
            reject(err);
            })
        })
  };
  @action logOut(){
      console.log('注销');
      HistoryStore.reset();
      UserStore.resetUser();
      ImageStore.reset();
      this.values.password='';
      this.values.username='';
      Auth.logOut();
  }
}
export default new  AuthStore();





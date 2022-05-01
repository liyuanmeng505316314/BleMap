import { observable, action, makeObservable } from 'mobx';
import { Uploader } from '../model';
import { message } from 'antd';


class HistoryStore {
   constructor(){
     makeObservable(this)
   };

  @observable list = [];
  @observable isLoading = false;
  @observable hasMore = true;
  @observable page = 0;
  limit = 10;

  @action append(newList) { // 再旧的用户的列表上，添加新的列表，就像新上传了图片，列表就要多添加一条记录了
    this.list = this.list.concat(newList);
    console.log(newList)
  }


  @action find() {
    console.log('执行了History的find')
    this.isLoading = true;
    Uploader.find({page: this.page, limit: this.limit})
      .then(newList => {
        console.log('执行了第Uploader的find')
        this.append(newList);
        console.log('打印newlist'+newList)
        this.page++;
        if(newList.length < this.limit){
          this.hasMore = false;
        }
        console.log('Uploader.find执行完成')
      }).catch(error => {
        message.error('加载数据失败');
      }).finally(() => {
        this.isLoading = false;
      });
  }

  @action reset() { //用户注销
    this.list = [];
    this.isLoading = false;
    this.hasMore = true;
    this.page = 0;
  }

}


export default new HistoryStore();

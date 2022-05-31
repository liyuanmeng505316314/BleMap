import {observable, action, makeObservable} from 'mobx';
import {Uploader,ShowDevice} from '../model';
import {message} from 'antd';


class HistoryStore {
    constructor() {
        makeObservable(this)
    };

    @observable list = [];
    @observable isLoading = false;
    @observable hasMore = true;
    @observable page = 0;
    @observable values = {
        mapUrl: '',
        beaconName: '',
    };
    limit = 10;

    @action append(newList) { // 再旧的用户的列表上，添加新的列表，就像新上传了图片，列表就要多添加一条记录了
        this.list = this.list.concat(newList);
        console.log(newList)
    }
    @action setMapUrl(mapUrl){
        this.values.mapUrl  = mapUrl
        console.log('成功执行了setMapUrl')
    }

    @action setBeaconName( beaconName){
        this.values.beaconName = beaconName
        console.log('成功执行了setBeaconName')
    }

    @action addBeacon(){  // 这个MVC中的 store 是去添加beacon属性
        return new Promise((resolve, reject) => {  
            Uploader.addBeacon( this.values.mapUrl, this.values.beaconName) 
                .then(user => {
                    console.log('数据传输给了model层，但是我觉得成功一半了，所以在store这里打个log')
                    console.log(user)
                    resolve(user)
                })
                .catch(err => {
                    console.log('数据传输给了model层，还是失败了，所以在store这里打个log')
                    reject(err)
                })
                .finally(()=>{
                    window.location.reload()
                })
        })
    }

    @action find() {  // 这个MVC中的 store 是去找不含beacon属性的图片
        console.log('store find image')
        this.isLoading = true;
        Uploader.find({page: this.page, limit: this.limit})
            .then(newList => {
                console.log('执行了第Uploader的find')
                this.append(newList);
                console.log('打印newlist' + newList)
                this.page++;
                if (newList.length < this.limit) {
                    this.hasMore = false;
                }
                console.log('Uploader.find执行完成')
            }).catch(error => {
            message.error('加载数据失败',error);
        }).finally(() => {
            this.isLoading = false;
        });
    }
    @action findDeviceInMap() {  
        console.log('store find image')
        this.isLoading = true;
        ShowDevice.find({page: this.page, limit: this.limit})
            .then(newList => {
                console.log('执行了第Uploader的find')
                this.append(newList);
                console.log('打印newlist' + newList)
                this.page++;
                if (newList.length < this.limit) {
                    this.hasMore = false;
                }
                console.log('Uploader.find执行完成')
            }).catch(error => {
            message.error('加载数据失败',error);
        }).finally(() => {
            this.isLoading = false;
        });
    }


    @action findBeacon() { // 这个MVC中的 store 是去找含beacon属性的图片
        console.log('store find image')
        this.isLoading = true;
        Uploader.findBeacon({page: this.page, limit: this.limit})
            .then(newList => {
                console.log('执行了第Uploader的find')
                this.append(newList);
                console.log('打印newlist' + newList)
                this.page++;
                if (newList.length < this.limit) {
                    this.hasMore = false;
                }
                console.log('Uploader.find执行完成')
            }).catch(error => {
            message.error('加载数据失败',error);
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

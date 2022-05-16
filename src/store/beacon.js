import {observable, action, makeObservable} from 'mobx';
import {Beacon} from '../model';
import {message} from 'antd';


class BeaconStore {
    constructor() {
        makeObservable(this)
    };

    @observable list = [];
    @observable isLoading = false;
    @observable hasMore = true;
    @observable page = 0;
    @observable values = {
        beaconID: '',
        beaconName: '',
    };
    limit = 10;

    @action append(newList) { // 再旧的用户的列表上，添加新的列表，就像新上传了图片，列表就要多添加一条记录了
        this.list = this.list.concat(newList);
        console.log(newList)
    }

    @action setBeaconID( beaconID){
        this.values.beaconID=beaconID
    }
    @action setBeaconName( beaconName){
        this.values.beaconName=beaconName
    }
    @action addBeacon(){
        return new Promise((resolve, reject) => {  
            Beacon.add(this.values.beaconID,  this.values.beaconName) 
                .then(user => {
                    resolve(user)
                })
                .catch(err => {
                    reject(err)
                }).finally(() => {
                    window.location.reload()
                });
        })
    }

    @action find() {
        this.isLoading = true;
        Beacon.find({page: this.page, limit: this.limit})
            .then(newList => {
                console.log('执行了beacon的find')
                this.append(newList);
                this.page++;
                if (newList.length < this.limit) {
                    this.hasMore = false;
                }
                console.log('beacon.find执行完成')
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


export default new BeaconStore();
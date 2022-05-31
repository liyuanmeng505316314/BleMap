import {observable, action, makeObservable} from 'mobx';
import {Device} from '../model';
import {message} from 'antd';

class  DeviceStore {
    constructor() {
        makeObservable(this)
    };

    @observable list = [];
    @observable isLoading = false;
    @observable hasMore = true;
    @observable page = 0;
    @observable values = {
        deviceID: '',
        deviceName: '',
    };
    limit = 10;

    @action append(newList) { 
        this.list = this.list.concat(newList);
        console.log(newList)
    }

    @action setDeviceID(deviceID){
        this.values.deviceID  =deviceID
        console.log('成功执行了setDeviceID')
    }

    @action setDeviceName(deviceName){
        this.values.deviceName=deviceName
        console.log('成功执行了setDeviceName')
    }
    
    @action addDevice(){
        return new Promise((resolve, reject) => {  
            Device.add( this.values.deviceID, this.values.deviceName) 
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
        Device.find({page: this.page, limit: this.limit})
            .then(newList => {
                console.log('执行了第device的find')
                this.append(newList);
                this.page++;
                if (newList.length < this.limit) {
                    this.hasMore = false;
                }
                console.log('device.find执行完成')
            }).catch(error => {
            message.error('加载数据失败',error);
        }).finally(() => {
            this.isLoading = false;
        });
    }

    @action reset() { 
        this.list = [];
        this.isLoading = false;
        this.hasMore = true;
        this.page = 0;
    }

}

export default new DeviceStore();
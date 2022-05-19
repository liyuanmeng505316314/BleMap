import AV, {Query, User} from 'leancloud-storage'

AV.init({ //安装规范对AV初始化
    appId: "34eLG26lSun8CGKdE28ayYJY-gzGzoHsz",
    appKey: "5y1j3cbdC3DUo6joCdq6iKkU",
    serverURL: "https://34elg26l.lc-cn-n1-shared.com",
})

//封装一个Auth对象，待会再导出去，让其他页面也能使用，Auth对象

//这个对象是负责登录注册的
const Auth = { //Auth是个对象，封装了几个工具方法
    //register现在有问题，_a 不识别，报错
    register(username, password) {  //register是一个工具方法，用来管理注册的一系列行为
        var user = new AV.User(); //User是AV里封装好的类，哪里直接用
        user.setUsername(username); //user对象是刚构造好的对象，里面有包自带的工具方法，通过这些工具方法可以实现后端的功能
        user.setPassword(password);
        return new Promise((resolve, reject) => {
            user.signUp().then(signUpUser => resolve(signUpUser), error => reject(error))
        })
    },
    login(username, password) { // login函数现在暂时是能行
        return new Promise((resolve, reject) => {
            User.logIn(username, password).then(loginUser => resolve(loginUser), error => reject(error))
        })
    },
    logOut() {
        User.logOut();//忘记大小写是Out
    },
    getCurrentUser() {
        return User.current();
    },
}

//这个对象负责地图上传和查找的，同时也负责绘制地图
//给地图添加信标，去信标哪个数据库区找信标，然后显示一个地图有哪些信标，最后显示信标旁边的设备（这个要去信标的数据库去拿数据）
const Uploader = {
    
    add(filename, file) {
        const item = new AV.Object('image')
        var avFile = new AV.File(filename, file);
        item.set('title', filename);
        item.set('owner', AV.User.current());
        item.set('url', avFile);
        return new Promise((resolve, reject) => {
            item.save().then((serverFile => resolve(serverFile)), error => reject(error))
        })
    },addBeacon(mapUrl,beaconName){
        console.log(mapUrl)
        const todo = AV.Object.createWithoutData('image', mapUrl);
        todo.set('beacon', beaconName);
        todo.save();
    },
    find({page = 0, limit = 10}) {
        console.log('执行了model的find')
        const query = new AV.Query('image');
        query.include('owner');
        query.doesNotExist('beacon');
        query.limit(limit);   // 用来设置返回结果的数量
        query.skip(page * limit); // 用来设置跳过的数据，skip和limit结合实现翻页功能
        query.descending('createdAt');  //查询结果的排序
        query.equalTo('owner', AV.User.current());  //查询的条件
        return new Promise((resolve, reject) => {
            query.find()
                .then(results => {
                    console.log('执行了query的find');
                    resolve(results)
                })
                .catch(error => {
                    console.log('query的find失败');
                    reject(error)
                })
        });
    },findBeacon({page = 0, limit = 10}){
        console.log('执行了model种的find信标')
        const query = new AV.Query('image');
        query.include('owner');
        query.exists('beacon');
        query.limit(limit);   // 用来设置返回结果的数量
        query.skip(page * limit); // 用来设置跳过的数据，skip和limit结合实现翻页功能
        query.descending('createdAt');  //查询结果的排序
        query.equalTo('owner', AV.User.current());  //查询的条件
        return new Promise((resolve, reject) => {
            query.find()
                .then(results => {
                    console.log('执行了query的find');
                    resolve(results)
                })
                .catch(error => {
                    console.log('query的find失败');
                    reject(error)
                })
        });
    }
}

//这个对象是负责设备上传的查找的
const Device = {
    add(deviceID, deviceIMEI) {
        const item = new AV.Object('Device')
        item.set('deviceID', deviceID);
        item.set('deviceIMEI', deviceIMEI);
        item.set('owner', AV.User.current());
        return new Promise((resolve, reject) => {
            item.save().then(results => resolve(results), error => reject(error))
        })
    },
    find({page = 0, limit = 10}) {
        console.log('执行了model的find')
        const query = new AV.Query('Device');
        query.limit(limit);
        query.skip(page * limit);
        query.descending('createdAt');
        return new Promise((resolve, reject) => {
            query.find()
                .then(results => {
                    console.log('执行了query的find');
                    resolve(results)
                })
                .catch(error => {
                    console.log('query的find失败');
                    reject(error)
                })
        });
    }
}

//这个对象是负责信标上传和查找的
const Beacon = {
    add(beaconID, beaconName) {
        const item = new AV.Object('Beacon')
        item.set('beaconID', beaconID);
        item.set('beaconName', beaconName);
        item.set('owner', AV.User.current());
        return new Promise((resolve, reject) => {
            item.save().then((serverFile => resolve(serverFile)), error => reject(error))
        })
    },
    find({page = 0, limit = 10}) {
        const todo = AV.Object.createWithoutData('image', '626ff4dee12bbd613358b459');
        todo.destroy();
        console.log('执行了model的find')
        const query = new AV.Query('Beacon');
        query.limit(limit);
        query.skip(page * limit);
        query.descending('createdAt');
        return new Promise((resolve, reject) => {
            query.find()
                .then(results => {
                    console.log('执行了query的find');
                    resolve(results)
                })
                .catch(error => {
                    console.log('query的find失败');
                    reject(error)
                })
        });
    }
}

const Map = {
    add(beaconID, beaconName) {
        const item = new AV.Object('Map')
        item.set('beaconID', beaconID);
        item.set('beaconName', beaconName);
        item.set('owner', AV.User.current());
        return new Promise((resolve, reject) => {
            item.save().then((serverFile => resolve(serverFile)), error => reject(error))
        })
    },
    find({page = 0, limit = 10}) {
        console.log('执行了model的find')
        const query = new AV.Query('Beacon');
        query.limit(limit);
        query.skip(page * limit);
        query.descending('createdAt');
        return new Promise((resolve, reject) => {
            query.find()
                .then(results => {
                    console.log('执行了query的find');
                    resolve(results)
                })
                .catch(error => {
                    console.log('query的find失败');
                    reject(error)
                })
        });
    }
}


// eslint-disable-next-line import/no-anonymous-default-export
export {Auth, Uploader,Device,Beacon,Map}; //把Auth对象导出去





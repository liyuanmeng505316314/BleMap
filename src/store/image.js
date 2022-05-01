import { message } from 'antd';
import { observable,action,makeObservable} from 'mobx'
import {Uploader} from '../model'

// 这个ImageStore存储的是，用户上传的图片信息，以及部分的操作逻辑，我觉得属于VM层的内容
class ImageStore{  // ImageStore是一个对象，UpLoader也是一个对象，两个对象都有自己的属性和方法，而UpLoader的工具方法，是来自Auth对象的工具方法，并且对其进行了修饰
    constructor(){
        makeObservable(this)
    };

    @observable fileName='';

    @observable file=null;

    @observable isUploading=false;

    @observable serverFile=null;

    @action setFileName(newfileName){
        this.fileName=newfileName;
    };
    @action setFile(newFile){
        this.file=newFile;
    };
    
    @action upLoad(){
        this.isUploading=true;
        this.serverFile=null;
        return new Promise((resolve,reject)=>{
            Uploader.add(this.fileName,this.file)
            .then(serverFile=>{
                this.serverFile=serverFile
                console.log('上传成功')
                resolve(serverFile)
            })
            .catch(error=>{
                console.log('上传失败')
                reject(error)
            })
        }) 
    }
    @action reset(){
       this.isUploading=false;
       this.serverFile=null;
    }

}
export default new ImageStore();
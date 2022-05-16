import React, {useRef} from "react";
import {useStore} from "../store";
import {observer, useLocalStore} from "mobx-react"
import {Upload, message, Spin, Switch, Alert} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import styled from 'styled-components';

const Image = styled.img`
  max-width: 300px;
`
const Result = styled.div`
  margin-top: 30px;
  border: 2px dashed #ccc;
  padding: 20px;
`

const H1 = styled.h1`
  margin: 20px 0;
  text-align: center;
`

const {Dragger} = Upload;

const Component = observer(() => {
    // console.log('1') 
    const {ImageStore, UserStore} = useStore()
    const ref1 = useRef();
    const ref2 = useRef();
    const store = useLocalStore(() => ({
        width: null,
        setWidth(w) {
            store.width = w;
        },
        get widthStr() {
            return store.width ? `/w/${store.width}` : '';
        },
        height: null,
        setHeight(h) {
            store.height = h;
        },
        get heightStr() {
            return store.height ? `/h/${store.height}` : '';
        },
        get fullStr() {
            return ImageStore.serverFile.attributes.url.attributes.url + `?imageView2/0` + store.widthStr + store.heightStr;
        }
    }))

    const bindWidthChange = () => {
        store.setWidth(ref1.current.value)
    }
    const bindHeightChange = () => {
        store.setHeight(ref2.current.value)
    }


    //  console.log('2')
    const props = {
        // showUploadList: false,
        beforeUpload: file => {
            // console.log('3') 这里出现了错误，原因是beforeUpload的L不用大写，当前页面出bug了就在当前一面一步一步的执行下去
            ImageStore.setFile(file);
            ImageStore.setFileName(file.name);
            if (UserStore.currentUser == null) {
                message.warning('请先登录再上传')
                return false;
            }
            ;
            // if(!(/(jpg$)|(svg+xml$)|(jpeg$)|(png$)|(bmp$)/ig.test(file.type))){
            //     message.error('请上传svg、jpg、jpeg、bmp、png格式的图片')
            //     return false;
            // };

            if (file.size >= 1024000) {
                message.error('请上传大小不超过1024KB的图片')
                return false;
            }
            ImageStore
                .upLoad()
                .then((serverFile) => {
                    console.log(serverFile);
                    message.success('上传成功');
                    console.log('上传成功')
                })
                .catch((error) => {
                    console.log(error);
                    message.error('上传失败');
                    ;console.log('上传失败')
                })
                .finally(() => {
                    ImageStore.isUploading = false;
                    console.log('上传完成')
                })
            return false;
        }
    }


    // console.log('4')    


    return (
        <>
            <Spin tip="上传中" spinning={ImageStore.isUploading}>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">
                        点击或者拖拽上传地图
                    </p>
                    <p className="ant-upload-hint">
                        仅支持jpg、jpeg、bmp、svg、png格式的图片，同时不超过1024KB大小
                    </p>
                </Dragger>
            </Spin>
            {
                ImageStore.serverFile ? <Result>
                        <H1>上传结果</H1>
                        <div>
                            <dl>
                                <dt>地图线上地址</dt>
                                <dd><a target='_self'
                                       href={ImageStore.serverFile.attributes.url.attributes.url}>{ImageStore.serverFile.attributes.url.attributes.url}</a>
                                </dd>
                                <dt>文件名</dt>
                                <dd>{ImageStore.fileName}</dd>
                                <dt>地图预览</dt>
                                <dd>
                                    <Image alt='加载失败' src={ImageStore.serverFile.attributes.url.attributes.url}/>
                                </dd>
                                <dt>更多尺寸</dt>
                                <dd>
                                    <input ref={ref1} onChange={bindWidthChange} placeholder="最大宽度（可选）"/>
                                    <input ref={ref2} onChange={bindHeightChange} placeholder="最大高度（可选）"/>
                                </dd>
                                <dd>
                                    <a target="_blank" href={store.fullStr}>{store.fullStr}</a>
                                </dd>
                            </dl>
                        </div>
                    </Result>

                    : null
            }

        </>
    );
});

export default Component;
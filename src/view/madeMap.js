import {Form, Input, Button, message} from 'antd';
import React from 'react';
import styled from 'styled-components';
import {useStore} from '../store';
import {useHistory} from 'react-router-dom';

const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  padding: 20px;
`
const Title = styled.h1`
  text-align: center;
  margin-bottom: 25px;
`

const Component = () => {
    const {HistoryStore} = useStore();
    const history = useHistory();

    const onFinish = (values) => {
        console.log('输入的values为', values);
        HistoryStore.setMapUrl(values.mapUrl);
        HistoryStore.setBeaconName(values.beaconName);
        HistoryStore.addBeacon()
            .then(() => {
                console.log('添加成功,跳转到doneMap页面')
            }).catch(() => {
                message.success('添加成功')
                console.log('1')
        }).finally(()=>{
            console.log('添加完成,跳转到doneMap页面')
            history.push('/doneMap')
         
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo)
       message.error('添加失败')
    };



    return (
        <Wrapper>
        <Title>绘制地图</Title>
    
        <Form name="basic" labelCol={{span: 4,}} wrapperCol={{span: 20,}} initialValues={{remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">

            <Form.Item label="地图ID" name="mapUrl" rules={[ { required: true, message: '设备ID!' , }]}>
                <Input />
            </Form.Item>
    
            <Form.Item label="信标名称" name="beaconName" rules={[ { required: true, message: '设备ID!' , }]}>
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{offset: 10,span: 30,}}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>

        </Form>
    </Wrapper>
    );
};

export default Component;
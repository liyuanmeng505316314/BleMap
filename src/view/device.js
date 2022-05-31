import {Form, Input, Button, message} from 'antd';
import React from 'react';
import styled from 'styled-components';
import {useStore} from '../store';
import List from '../component/devicelist'

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
    const {DeviceStore} = useStore();
    // , UserStore
    // const history = useHistory();
    const onFinish = (values) => {
        console.log('Success2:', values);
        DeviceStore.setDeviceID(values.deviceID);
        DeviceStore.setDeviceName(values.deviceIMEI);
        DeviceStore.addDevice()
            .then(() => {
                message.success('设备添加成功')
            }).catch(() => {
                message.error('设备添加失败')
        })

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };



    return (
        <>
         <Wrapper>
           <Title>添加设备</Title>

           <Form name="basic" labelCol={{span: 4,}} wrapperCol={{span: 20,}} initialValues={{remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">

            <Form.Item label="设备Name" name="deviceID" rules={[ { required: true, message: '设备ID!' , } ]}>
               <Input />
            </Form.Item>

            <Form.Item label="设备IMEI" name="deviceIMEI" rules={[ { required: true, message: '设备IMEI!' , } ]}>
               <Input />
            </Form.Item>

            <Form.Item wrapperCol={{offset: 10,span: 30,}}>
               <Button type="primary" htmlType="submit">提交</Button>
            </Form.Item>
           </Form>
         </Wrapper>
         <List/>
        </>
    );
};

export default Component;


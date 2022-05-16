import {Form, Input, Button, message} from 'antd';
import React from 'react';
import styled from 'styled-components';
import {useStore} from '../store';
import List from '../component/beaconlist'

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
    const {BeaconStore} = useStore();
    const onFinish = (values) => {
        console.log('输入的values的值为:', values);
        BeaconStore.setBeaconID(values.beaconID);
        BeaconStore.setBeaconName(values.beaconID);
        BeaconStore.addBeacon()
            .then(() => {
                message.success('添加成功')
            }).catch((e) => {
            console.log(e)
            message.error('添加失败')
        })

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
        <Wrapper>
           <Title>添加信标</Title>

           <Form name="basic" labelCol={{span: 4,}} wrapperCol={{span: 20,}} initialValues={{remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">

            <Form.Item label="信标ID" name="beaconID" rules={[ { required: true, message: '信标ID!' , } ]}>
               <Input />
            </Form.Item>

            <Form.Item label="信标name" name="beaconName" rules={[ { required: true, message: '信标Name!' , } ]}>
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
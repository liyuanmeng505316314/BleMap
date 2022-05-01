import { Form, Input, Button,message} from 'antd';
import React from 'react';
import styled from 'styled-components';
import {useStore } from '../store';
import { useHistory } from 'react-router-dom';


const Wrapper=styled.div`
max-width:600px;
margin:30px auto;
box-shadow:2px 2px 2px 3px rgba(0,0,0,0.3);
border-radius:6px;
padding:20px;
`
const Title=styled.h1`
text-align:center;
margin-bottom:25px;
`

const Component = () => {
const { AuthStore,UserStore } = useStore();
const history = useHistory();
  const onFinish = (values) => {
        console.log('Success2:', values);
        AuthStore.setUsername(values.username);
        AuthStore.setPassword(values.password);
        AuthStore.login()
          .then(() => {
            console.log('登录成功,跳转到首页')
            console.log(UserStore.currentUser)
            history.push('/')
          }).catch((e)=>{
            console.log(e)  
            console.log('登录失败')
          })

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

   const validateUsername=(rule,value)=>{ // 注意，正则表达式的W是大写的！
      if(/\W/.test(value)) return Promise.reject('只能是字母数字下划线');
      if(value.lenth<4 || value.lenth>10) return Promise.reject('字符长度只能是4-10位');
      return Promise.resolve()
   };

  return (
    <Wrapper>
     <Title>
       登录
     </Title>

    <Form
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 20,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },{
            validator:validateUsername
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },{
            min:4,
            message:'最小4个字符'

          },{
            max:10,
            message:'最大10个字符'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* 没有用的cheackbox栏 */}
      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 30,
        }}
      >
        <Button type="primary" htmlType="submit">
        提交
        </Button>
      </Form.Item>
    </Form>
    </Wrapper>
  );
};

export default Component;
import { Form, Input, Button,message } from 'antd';
import React from 'react';
import styled from 'styled-components';
import {useStore } from '../store';  // 引入useStore，user是对Auth的进一步封装，通过他，我们的V层，可以与M层交互
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
  const {AuthStore} = useStore(); // 我怀疑userStore是以一个构造函数，而不用new 用{AuthStore}
  const history = useHistory();


  const onFinish = values => {
    console.log('Success2:', values);
    AuthStore.setUsername(values.username);
    AuthStore.setPassword(values.password);
    AuthStore.register()
      .then(() => {
        console.log('注册成功,跳转到首页')
        history.push('/')
      }).catch((e)=>{
        console.log(e)
        console.log('注册失败')
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

  //  const validateConfirm = ({getFieldValue}) => ({
  //     validator(rule,value){
  //        if(getFieldValue('password')===value) return Promise.resolve
  //        return Promise.reject('两次密码不一致')
  //    }
  //  });

  return (
    <Wrapper>
     <Title>
       注册
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

       {/* 确认密码  */}
 
       {/* 不知道为什么，加了confirm就不行，我也不懂为什么 */}

      {/* <Form.Item
        label="确认密码"
        name="confirm"
        rules={[
          {
            required: true,
            message: '请确认密码！',
          },
          validateConfirm 
        ]}
      >
        <Input.Password />
      </Form.Item> */}

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
        <Button type="primary" htmlType="submit" >
        提交
        </Button>
      </Form.Item>
    </Form>
    </Wrapper>
  );
};

export default Component;
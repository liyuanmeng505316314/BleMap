import React,{useState, useEffect} from 'react';
import imgUrl from './beauty.jpg'
import styled from 'styled-components'
import {NavLink}  from 'react-router-dom';
import { Button } from 'antd';
import { useStore } from '../store';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';


const Header = styled.header`
display:flex;
align-items:center;
background-color:#02101f;
font-size:20px;
`;

const Div=styled.h1`
display:inline-block;
color:white;
margin-left:30px;
margin-right:90px;
`
const Logo = styled.img`
width: 100px;
height: auto;
display:inline-block;
`
const StyledLink=styled(NavLink)`
color:#fff;
margin-left:60px;
&.active{
    border-bottom:1px solid white;
}
`
const StyledButton=styled(Button)`
margin-left:40px;
`
const H3=styled.h3`
color:#fff;
margin-top:12px;
margin-left:40px;
`


const  Component = observer(() => {
   const {AuthStore,UserStore} =useStore();
   const history = useHistory();
   
   const handleLogOut=()=>{
    UserStore.resetUser()
    AuthStore.logOut()
    console.log('注销，清除当前用户信息')
   };
   const handleLogin=()=>{
       history.push('/login')
      console.log('跳转到登录页面')
   };
   const handleRegister=()=>{
    history.push('/register')
    console.log('跳转到注册页面')   
   };
    return(
        <Header>    
        <Div>BLE室内定位系统的研制</Div>
        <Logo src={imgUrl} alt='beauty' /> 
        <nav>
            <StyledLink to="/" exact style={{textDecoration:'none'}}  activeClassName="active" > 上传地图</StyledLink>
            <StyledLink to="/map" exact style={{textDecoration:'none'}}  activeClassName="active" > 地图</StyledLink>
            <StyledLink to="/history" style={{textDecoration:'none'}}   activeClassName="active">地图历史</StyledLink>
            <StyledLink to="/about2" style={{textDecoration:'none'}}  activeClassName="active">地图设置</StyledLink>
            <StyledLink to="/about3" style={{textDecoration:'none'}}  activeClassName="active">信标管理</StyledLink>
            <StyledLink to="/about4" style={{textDecoration:'none'}}  activeClassName="active">设备管理</StyledLink>
            <StyledLink to="/about" style={{textDecoration:'none'}}  activeClassName="active">关于我</StyledLink>
        </nav>
        <>{
         UserStore.currentUser? 
        <>
        <H3>{AuthStore.values.username}</H3>
        <StyledButton  type="primary" onClick={handleLogOut}> 注销 </StyledButton>
        </>: <>       
        <StyledButton  type="primary" onClick={handleLogin}> 登录</StyledButton>
        <StyledButton  type="primary" onClick={handleRegister}> 注册  </StyledButton>
        </>
        }
        </>
        </Header>
    )
});

export default Component;

// 这里出现第一个bug，
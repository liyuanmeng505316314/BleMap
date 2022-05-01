import React from "react";
import { observer } from "mobx-react";
import { useStore } from "../store";
import styled from "styled-components";

const Tips=styled.div`
background: orange;
color:#fff;
padding:10px;
margin:30px 0;
font-size:14px;
border-radius:5px;
`

const Component= observer(({children})=>{
        const {UserStore} =useStore();
        return(
           <>
           {
               UserStore.currentUser ? null:<Tips>{children}</Tips>
           }
           </>
         )
        }
)

export default  Component
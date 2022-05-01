import React from 'react';
import styled from 'styled-components'

const FooterStyled=styled.footer`
padding:10px 100px;
text-align:center;
font-size:12px;
color:#aaa;
`;
    


function Footer(){
    return(
        <FooterStyled>
        <h1>Footer</h1>
        </FooterStyled>
    )
}

export default Footer;
import React from 'react';
import styled from 'styled-components'

const FooterStyled = styled.footer`
  padding: 10px 100px;
  text-align: center;
  font-size: 12px;
  color: #aaa;
`;


function Footer() {
    return (
        <FooterStyled>
            <h1>基于BLE的室内定位系统</h1>
            <p>
                该系统的分为三层集架构，分别由python、leadcloud、JavaScript组成，实现了自定义室内地图以及将数据库中的定位信息转化为室内地图中的位置信息，并显示出来
            </p>
        </FooterStyled>
    )
}

export default Footer;
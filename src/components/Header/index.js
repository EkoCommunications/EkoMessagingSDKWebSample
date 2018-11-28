import React from "react";
import { Icon, Dropdown, Menu } from "antd";
import styled from "styled-components";

const HeaderContainer = styled.div`
  height: 50px;
  background: #28cb72;
  border-bottom: 1px solid #d4dadf;
  box-shadow: 0 1px 1px 0 rgba(116, 129, 141, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const Title = styled.div`
  padding-left: 30px;
  h1 {
    font-size: 18px;
    color: white;
    margin: 0;
  }
`;

const Setting = styled(Dropdown)`
  display: inline-block;
  padding: 10px;
  margin-left: 15px;
  height: 100%;
  border-left: 1px solid white;
  display: flex;
  align-items: center;
  color: white;
`;

const DisplayName = styled.div`
  span {
    font-size: 16px;
  }
  height: 100%;
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  font-size: 20px;
  cursor: pointer;
`;

const menu = (
  <Menu>
    <Menu.Item onClick={() => {}}>Change Display Name</Menu.Item>
    <Menu.Divider />
    <Menu.Item disabled>Version 1.4.0</Menu.Item>
  </Menu>
);

const Header = props => (
  <HeaderContainer>
    <Title>
      <h1>eko-sdk Sample App</h1>
    </Title>
    <DisplayName>
      <span>{props.displayName}</span>
      <Setting overlay={menu} placement="bottomRight" trigger={["click"]}>
        <StyledIcon type="setting" />
      </Setting>
    </DisplayName>
  </HeaderContainer>
);

export default Header;

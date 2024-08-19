import React from "react";
import styled from "styled-components";
import { Dropdown, Menu } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { authlogout } from "../../Store/Authentication";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authlogout());
    navigate("/");
    toast.success("Logout Successful");
  };

  const menu = (
    <StyledMenu>
      <Menu.Item key="0" onClick={handleLogout}>
        <span>Logout</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={() => navigate("/profile")}>
        <span>Profile</span>
      </Menu.Item>
    </StyledMenu>
  );

  return (
    <HeaderWrapper>
      <RightDiv>
        <Text>
          <Name>Nitin Kumar</Name>
          <EmpId>Emp ID: 587</EmpId>
        </Text>
        <Dropdown overlay={menu} trigger={["click"]}>
          <AvatarDiv
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
            <AvatarP>N</AvatarP>
            <CaretDownOutlined onClick={() => console.log("clicked")} />
          </AvatarDiv>
        </Dropdown>
      </RightDiv>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  height: 60px;
  p {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const RightDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const AvatarP = styled.p`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const AvatarDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const StyledMenu = styled(Menu)`
  background: rgb(255, 255, 255);
  width: 150px;
  padding: 10px 5px;
  border-radius: 7px;
  box-shadow: rgba(61, 107, 192, 0.5) 0px 2px 8px;
  transition: 0.5s ease-out;

  .ant-dropdown-menu-item {
    font-size: 16px;
    font-weight: 500;
    &:hover {
      background-color: rgba(61, 107, 192, 0.1);
    }
  }

  .ant-dropdown-menu-item-divider {
    background-color: rgb(1 7 19 / 32%) !important  ;
  }
`;

const Name = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

const EmpId = styled.span`
  font-size: 14px;
  color: #616161;
`;

import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import styled from "styled-components";
import Header from "../components/header/Header";
import SideBar from "../components/sideBar/SideBar";

const Layout = () => {
  return (
    <LayoutWrapper>
      <SideNavWrapper>
        <SideBar />
      </SideNavWrapper>
      <MainWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </MainWrapper>
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  display: flex;
  font-family: "Poppins", sans-serif;
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const SideNavWrapper = styled.div`
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 20px;
  color: rgb(0, 0, 0);
`;

const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(20, 93, 160, 0.09);
  position: relative;
  transition: 0.4s ease-out;
`;

const HeaderWrapper = styled.div`
  height: 60px;
  padding: 20px;
  box-shadow: rgb(0 0 0 / 7%) 0px 10px 20px;
  top: 0;
  z-index: 1;
`;

const OutletWrapper = styled.div`
  // height: calc(100vh - 60px);
  overflow: auto;
`;

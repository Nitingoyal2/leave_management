import React, { useState } from "react";
import styled from "styled-components";
import {
  Dashboard,
  Logo,
  Department,
  Leave,
  LeaveType,
  Employee,
  Next,
  Back,
} from "../../Utils/images";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isDepartmentOpen, setDepartmentOpen] = useState(false);
  const [isLeaveTypeOpen, setLeaveTypeOpen] = useState(false);
  const [isEmployeeOpen, setEmployeeOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleDepartment = () => {
    if (isSidebarOpen) {
      setDepartmentOpen(!isDepartmentOpen);
      setLeaveTypeOpen(false);
      setEmployeeOpen(false);
    } else {
      setSidebarOpen(true);
      setLeaveTypeOpen(false);
      setEmployeeOpen(false);
    }
  };

  const toggleLeaveType = () => {
    if (isSidebarOpen) {
      setLeaveTypeOpen(!isLeaveTypeOpen);
      setDepartmentOpen(false);
      setEmployeeOpen(false);
    } else {
      setSidebarOpen(true);
      setDepartmentOpen(false);
      setEmployeeOpen(false);
    }
  };

  const toggleEmployee = () => {
    if (isSidebarOpen) {
      setEmployeeOpen(!isEmployeeOpen);
      setDepartmentOpen(false);
      setLeaveTypeOpen(false);
    } else {
      setSidebarOpen(true);
      setDepartmentOpen(false);
      setLeaveTypeOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setDepartmentOpen(false);
    setLeaveTypeOpen(false);
    setEmployeeOpen(false);
  };
  return (
    <SideNavWrapper isOpen={isSidebarOpen}>
      <div className="top-section">
        <img src={Logo} alt="Logo" className="logo-img" />
        <ToggleButton onClick={toggleSidebar} isOpen={isSidebarOpen}>
          {isSidebarOpen ? (
            <img src={Back} alt="Logo" className="toggle-icon" />
          ) : (
            <img src={Next} alt="Logo" className="toggle-icon" />
          )}
        </ToggleButton>
      </div>
      <div>
        <MenuItem isOpen={isSidebarOpen} onClick={toggleDepartment}>
          <Link to="/dashboard" className="menu-content">
            <Tooltip title="Dashboard" placement="top">
              <img
                src={Dashboard}
                alt="dashboard-icon"
                className="menu-icons"
              />
            </Tooltip>
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>
        </MenuItem>
        <MenuItem onClick={toggleDepartment} isOpen={isSidebarOpen}>
          <div className="menu-content">
            <Tooltip title="Department" placement="top">
              <img
                src={Department}
                alt="department-icon"
                className="menu-icons"
              />
            </Tooltip>
            {isSidebarOpen && <span>Department</span>}
          </div>
          {isSidebarOpen && (
            <>
              {isDepartmentOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
            </>
          )}
        </MenuItem>
        {isDepartmentOpen && isSidebarOpen && (
          <SubMenu>
            <SubMenuItem>
              <span>Add Department</span>
            </SubMenuItem>
            <SubMenuItem>
              <span>Department List</span>
            </SubMenuItem>
          </SubMenu>
        )}
        <MenuItem onClick={toggleLeaveType} isOpen={isSidebarOpen}>
          <div className="menu-content">
            <Tooltip title="Leave Type" placement="top">
              <img
                src={LeaveType}
                alt="leave-type-icon"
                className="menu-icons"
              />
            </Tooltip>
            {isSidebarOpen && <span>Leave Type</span>}
          </div>
          {isSidebarOpen && (
            <>{isLeaveTypeOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}</>
          )}
        </MenuItem>
        {isLeaveTypeOpen && isSidebarOpen && (
          <SubMenu>
            <SubMenuItem>
              <span>Add Leave Type </span>
            </SubMenuItem>
            <SubMenuItem>
              <span>Leave Type List</span>
            </SubMenuItem>
          </SubMenu>
        )}
        <MenuItem onClick={toggleEmployee} isOpen={isSidebarOpen}>
          <div className="menu-content">
            <Tooltip title="Employee" placement="top">
              <img src={Employee} alt="employee-icon" className="menu-icons" />
            </Tooltip>
            {isSidebarOpen && <span>Employee</span>}
          </div>
          {isSidebarOpen && (
            <>{isEmployeeOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}</>
          )}
        </MenuItem>
        {isEmployeeOpen && isSidebarOpen && (
          <SubMenu>
            <SubMenuItem>
              <span>Add Employee</span>
            </SubMenuItem>
            <SubMenuItem>
              <span>Employee List</span>
            </SubMenuItem>
          </SubMenu>
        )}
  
        <MenuItem isOpen={isSidebarOpen} onClick={toggleDepartment}>
          <div className="menu-content">
            <Tooltip title="Leave" placement="top">
              <img src={Leave} alt="leave-icon" className="menu-icons" />
            </Tooltip>
            {isSidebarOpen && <span>Leave</span>}
          </div>
        </MenuItem>
      </div>
    </SideNavWrapper>
  );
};

export default SideBar;

const SideNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  width: ${({ isOpen }) => (isOpen ? "200px" : "80px")};
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  align-items: ${({ isOpen }) => (isOpen ? "stretch" : "center")};
  justify-content: ${({ isOpen }) => (isOpen ? "flex-start" : "flex-start")};
  gap: 20px;
  .top-section {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .logo-img {
      width: ${({ isOpen }) => (isOpen ? "100px" : "60px")};
      height: ${({ isOpen }) => (isOpen ? "100px" : "60px")};
      object-fit: cover;
    }
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
  cursor: pointer;

  .menu-content {
    display: flex;
    align-items: center;
    margin: 5px 0px;

    span {
      margin-left: 10px;
      font-size: 18px;
      font-weight: bold;
    }
  }

  .menu-icons {
    width: 30px;
    height: 30px;
    margin: 0px;
    svg {
      font-size: 16px;
    }
  }
`;

const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  margin: 5px 0px;
`;

const SubMenuItem = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;
  font-size: 14px;

  span {
    margin: 5px 0px;
    margin-left: 8px;
    font-size: 18px;
    font-weight: bold;
  }
`;

const ToggleButton = styled.button`
  z-index: 2;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
  font-size: 20px;
  outline: none;
  display: flex;
  align-items: center;
  position: absolute;
  top: 10px;
  left: ${({ isOpen }) => (isOpen ? "220px" : "100px")};
  width: 40px;
  height: 40px;
  justify-content: center;
  transition: left 0.3s ease-in-out;
  .toggle-icon {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }
`;

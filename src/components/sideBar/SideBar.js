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
  DepartmentAdd,
  DepartmentList,
  LeaveTypeAdd,
  LeaveTypeList,
  EmployeeAdd,
  EmployeeList,
  leaveList,
} from "../../Utils/images";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState("");
  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const toggleMenu = (menuName) => {
    setSidebarOpen(true);
    setOpenMenu((prevMenu) => (prevMenu === menuName ? "" : menuName));
    setActiveMenu(menuName);
    setActiveSubMenu("");
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
    setOpenMenu("");
  };

  const handleNavigation = (path, menuName, subMenuName) => {
    navigate(path);
    if (menuName) setActiveMenu(menuName);
    if (subMenuName) setActiveSubMenu(subMenuName);
  };

  return (
    <SideNavWrapper isOpen={isSidebarOpen}>
      <div className="top-section">
        <img src={Logo} alt="Logo" className="logo-img" />
        <ToggleButton onClick={toggleSidebar} isOpen={isSidebarOpen}>
          <img
            src={isSidebarOpen ? Back : Next}
            alt="toggle-icon"
            className="toggle-icon"
          />
        </ToggleButton>
      </div>
      <div>
        <MenuItem
          isOpen={isSidebarOpen}
          isActive={activeMenu === "dashboard"}
          onClick={() => handleNavigation("/dashboard", "dashboard")}
        >
          <div className="menu-content">
            <Tooltip title="Dashboard" placement="top">
              <img
                src={Dashboard}
                alt="dashboard-icon"
                className="menu-icons"
              />
            </Tooltip>
            {isSidebarOpen && <span>Dashboard</span>}
          </div>
        </MenuItem>

        <MenuItem
          isOpen={isSidebarOpen}
          isActive={activeMenu === "department"}
          onClick={() => toggleMenu("department")}
        >
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
              {openMenu === "department" ? (
                <CaretUpOutlined />
              ) : (
                <CaretDownOutlined />
              )}
            </>
          )}
        </MenuItem>
        {openMenu === "department" && isSidebarOpen && (
          <SubMenu>
            <SubMenuItem
              isActive={activeSubMenu === "departmentAdd"}
              onClick={() =>
                handleNavigation(
                  "/departmentAdd",
                  "department",
                  "departmentAdd"
                )
              }
            >
              <img
                src={DepartmentAdd}
                alt="department-add"
                className="menu-icons"
              />
              <span>Add Department</span>
            </SubMenuItem>
            <SubMenuItem
              isActive={activeSubMenu === "departmentList"}
              onClick={() =>
                handleNavigation(
                  "/departmentList",
                  "department",
                  "departmentList"
                )
              }
            >
              <img
                src={DepartmentList}
                alt="department-list"
                className="menu-icons"
              />
              <span>Department List</span>
            </SubMenuItem>
          </SubMenu>
        )}

        <MenuItem
          isOpen={isSidebarOpen}
          isActive={activeMenu === "leaveType"}
          onClick={() => toggleMenu("leaveType")}
        >
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
            <>
              {openMenu === "leaveType" ? (
                <CaretUpOutlined />
              ) : (
                <CaretDownOutlined />
              )}
            </>
          )}
        </MenuItem>
        {openMenu === "leaveType" && isSidebarOpen && (
          <SubMenu>
            <SubMenuItem
              isActive={activeSubMenu === "leaveTypeAdd"}
              onClick={() =>
                handleNavigation("/leaveTypeAdd", "leaveType", "leaveTypeAdd")
              }
            >
              <img
                src={LeaveTypeAdd}
                alt="leave-type-add"
                className="menu-icons"
              />
              <span>Add Leave Type</span>
            </SubMenuItem>
            <SubMenuItem
              isActive={activeSubMenu === "leaveTypeList"}
              onClick={() =>
                handleNavigation("/leaveTypeList", "leaveType", "leaveTypeList")
              }
            >
              <img
                src={LeaveTypeList}
                alt="leave-type-list"
                className="menu-icons"
              />
              <span>Leave Type List</span>
            </SubMenuItem>
          </SubMenu>
        )}

        <MenuItem
          isOpen={isSidebarOpen}
          isActive={activeMenu === "employee"}
          onClick={() => toggleMenu("employee")}
        >
          <div className="menu-content">
            <Tooltip title="Employee" placement="top">
              <img src={Employee} alt="employee-icon" className="menu-icons" />
            </Tooltip>
            {isSidebarOpen && <span>Employee</span>}
          </div>
          {isSidebarOpen && (
            <>
              {openMenu === "employee" ? (
                <CaretUpOutlined />
              ) : (
                <CaretDownOutlined />
              )}
            </>
          )}
        </MenuItem>
        {openMenu === "employee" && isSidebarOpen && (
          <SubMenu>
            <SubMenuItem
              isActive={activeSubMenu === "employeeAdd"}
              onClick={() =>
                handleNavigation("/employeeAdd", "employee", "employeeAdd")
              }
            >
              <img
                src={EmployeeAdd}
                alt="employee-add"
                className="menu-icons"
              />
              <span>Add Employee</span>
            </SubMenuItem>
            <SubMenuItem
              isActive={activeSubMenu === "employeeList"}
              onClick={() =>
                handleNavigation("/employeeList", "employee", "employeeList")
              }
            >
              <img
                src={EmployeeList}
                alt="employee-list"
                className="menu-icons"
              />
              <span>Employee List</span>
            </SubMenuItem>
          </SubMenu>
        )}

        <MenuItem
          isOpen={isSidebarOpen}
          isActive={activeMenu === "leave"}
          onClick={() => toggleMenu("leave")}
        >
          <div className="menu-content">
            <Tooltip title="Leave" placement="top">
              <img src={Leave} alt="leave-icon" className="menu-icons" />
            </Tooltip>
            {isSidebarOpen && <span>Leave</span>}
          </div>
          {isSidebarOpen && (
            <>
              {openMenu === "leave" ? (
                <CaretUpOutlined />
              ) : (
                <CaretDownOutlined />
              )}
            </>
          )}
        </MenuItem>
        {openMenu === "leave" && isSidebarOpen && (
          <SubMenu>
            <SubMenuItem
              isActive={activeSubMenu === "leaveList"}
              onClick={() =>
                handleNavigation("/leaveList", "leave", "leaveList")
              }
            >
              <img
                src={leaveList}
                alt="leave-list-icon"
                className="menu-icons"
              />
              <span>Leave List</span>
            </SubMenuItem>
            <SubMenuItem
              isActive={activeSubMenu === "leavePending"}
              onClick={() =>
                handleNavigation("/leavePending", "leave", "leavePending")
              }
            >
              <img
                src={leaveList}
                alt="leave-pending-icon"
                className="menu-icons"
              />
              <span>Leave Pending</span>
            </SubMenuItem>
            <SubMenuItem
              isActive={activeSubMenu === "leaveApproved"}
              onClick={() =>
                handleNavigation("/leaveApproved", "leave", "leaveApproved")
              }
            >
              <img
                src={leaveList}
                alt="leave-approved-icon"
                className="menu-icons"
              />
              <span>Leave Approved</span>
            </SubMenuItem>
            <SubMenuItem
              isActive={activeSubMenu === "leaveRejected"}
              onClick={() =>
                handleNavigation("/leaveRejected", "leave", "leaveRejected")
              }
            >
              <img
                src={leaveList}
                alt="leave-reject-icon"
                className="menu-icons"
              />
              <span>Leave Rejected</span>
            </SubMenuItem>
          </SubMenu>
        )}
      </div>
    </SideNavWrapper>
  );
};
export default SideBar;

const SideNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  width: ${({ isOpen }) => (isOpen ? "220px" : "80px")};
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
  padding: 2px;
  border-radius: 5px;
  background-color: ${({ isActive }) => (isActive ? "#f0f0f0" : "transparent")};
  border-left: ${({ isActive }) =>
    isActive ? " 5px solid #26a69a " : "transparent"};
  &:hover {
    background-color: #f0f0f0;
  }

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
  cursor: pointer;
`;

const SubMenuItem = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
  font-size: 14px;
  border-radius: 5px;
  padding: 2px;
  background-color: ${({ isActive }) => (isActive ? "#f0f0f0" : "transparent")};
  border-left: ${({ isActive }) =>
    isActive ? " 5px solid #26a69a " : "transparent"};
  &:hover {
    background-color: #e0e0e0;
  }

  span {
    margin-left: 5px;
    font-size: 18px;
    font-weight: bold;
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
  left: ${({ isOpen }) => (isOpen ? "240px" : "100px")};
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

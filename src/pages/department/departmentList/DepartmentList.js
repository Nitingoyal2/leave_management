import React, { useState } from "react";
import styled from "styled-components";
import { Table, Input, Space, Button, Tooltip } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Delete, Edit } from "../../../Utils/images";

const DepartmentList = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const [data, setData] = useState([
    {
      key: "1",
      deptName: "HR",
      deptDetails: "Handles employee relations and benefits",
      createdOn: "2024-01-01",
      deptStatus: true,
    },
    {
      key: "2",
      deptName: "Finance",
      deptDetails: "Manages company finances and budgeting",
      createdOn: "2024-02-01",
      deptStatus: false,
    },
    // Add more sample data as needed
  ]);

  const columns = [
    {
      title: "Department Name",
      dataIndex: "deptName",
      key: "deptName",
    },
    {
      title: "Department Details",
      dataIndex: "deptDetails",
      key: "deptDetails",
      render: (text) => (
        <Tooltip title={text}>
          <DepartmentDetails>{text}</DepartmentDetails>
        </Tooltip>
      ),
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (text) => formatDate(text),
    },
    {
      title: "Department Status",
      dataIndex: "deptStatus",
      key: "deptStatus",
      render: (text, record) => (
        <StatusTag isActive={record.deptStatus}>
          {record.deptStatus ? "Active" : "Inactive"}
        </StatusTag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="actionDiv">
          <span>
            <img src={Edit} alt="edit" className="action-icon" />
          </span>
          <span>
            <img src={Delete} alt="delete" className="action-icon" />
          </span>
        </div>
      ),
    },
  ];

  const handleSearch = (value) => {
    const filteredData = data.filter((item) =>
      item.deptName.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <DepartmentWrapper>
      <Header>
        <Title>Department List</Title>
        <Breadcrumb>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem>Department</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem isLast> Department List</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <SearchBar>
        <Input
          type="search"
          placeholder="Search department"
          onKeyDown={(e) => e.key === "Enter" && handleSearch(e.target.value)}
          style={{ width: 200 }}
        />
      </SearchBar>
      <Table columns={columns} dataSource={data} />
    </DepartmentWrapper>
  );
};

export default DepartmentList;

const DepartmentWrapper = styled.div`
  padding: 20px;
  .actionDiv {
    display: flex;
    gap: 5px;
    .action-icon {
      width: 20px;
      height: 20px;
      cursor: pointer;
      object-fit: cover;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const Breadcrumb = styled.div`
  font-size: 18px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 5px;
  .breadcrumb-icon {
    font-size: 10px;
  }
`;
const BreadcrumbItem = styled.span`
  color: ${(props) => (props.isLast ? "#888" : "#2c7aba7d")};
`;

const SearchBar = styled.div`
  margin-bottom: 10px;
`;

const StatusTag = styled.span`
  background-color: ${(props) => (props.isActive ? "#66bb6a" : "#ef5350")};
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-block;
  text-align: center;
`;

const DepartmentDetails = styled.span`
  display: inline-block;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  cursor: pointer;
`;

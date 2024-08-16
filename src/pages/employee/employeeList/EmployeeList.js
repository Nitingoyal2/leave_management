import React, { useState } from "react";
import styled from "styled-components";
import { Table, Input, Space, Button, Tooltip, Avatar } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Delete, Edit } from "../../../Utils/images";
import DeleteModal from "../../../components/modal/deleteModal/DeleteModal";

const EmployeeList = () => {
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const [data, setData] = useState([
    {
      key: "1",
      avatar: "https://via.placeholder.com/150",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      mobile: "1234567890",
      address: "123 Main St, Anytown, USA",
      role: "Manager",
      createdOn: "2024-01-01",
    },
    {
      key: "2",
      avatar: "https://via.placeholder.com/150",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      mobile: "0987654321",
      address: "456 Elm St, Anytown, USA",
      role: "Employee",
      createdOn: "2024-02-01",
    },
  ]);

  const columns = [
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      width: 250,
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar} />
          <div>
            <div>
              {record.firstName} {record.lastName}
            </div>
            <div style={{ color: "#888" }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      width: 150,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
      render: (text) => (
        <Tooltip title={text}>
          <EmployeeAddress>{text}</EmployeeAddress>
        </Tooltip>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 120,
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
      width: 150,
      render: (text) => formatDate(text),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <div className="actionDiv">
          <span>
            <img
              src={Edit}
              alt="edit"
              className="action-icon"
              aria-label="Edit"
            />
          </span>
          <span>
            <img
              src={Delete}
              alt="delete"
              className="action-icon"
              aria-label="Delete"
              onClick={() => handleDelete(record)}
            />
          </span>
        </div>
      ),
    },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredData = data.filter((item) =>
    `${item.firstName} ${item.lastName}`.toLowerCase().includes(searchText)
  );

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setData(data.filter((item) => item.key !== selectedItem.key));
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  return (
    <EmployeeWrapper>
      <Header>
        <Title>Employee List</Title>
        <Breadcrumb>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem>Employee</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem isLast>Employee List</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <SearchBar>
        <Input
          type="search"
          placeholder="Search employee"
          onChange={handleSearch}
          style={{ width: 200 }}
        />
      </SearchBar>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: filteredData.length,
          pageSizeOptions: ["10", "20", "50"],
          showSizeChanger: true,
        }}
        scroll={{ x: 500, y: 500 }}
        onChange={handleTableChange}
      />
      <DeleteModal
        visible={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        itemName={selectedItem?.firstName + " " + selectedItem?.lastName}
      />
    </EmployeeWrapper>
  );
};

export default EmployeeList;

const EmployeeWrapper = styled.div`
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

const EmployeeAddress = styled.div`
  display: inline-block;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  cursor: pointer;
`;

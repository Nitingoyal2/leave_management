import React, { useState } from "react";
import styled from "styled-components";
import { Table, Input, Space, Button, Tooltip, Avatar } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Delete, Edit } from "../../../Utils/images";
import DeleteModal from "../../../components/modal/deleteModal/DeleteModal";

const LeavePending = () => {
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
      employeeName: "John Doe",
      leaveType: "Sick Leave",
      applicationDate: "2024-08-01",
      totalDays: 3,
      hrStatus: "Pending",
      billingStatus: "Pending",
      leadStatus: "Pending",
    },
    {
      key: "2",
      avatar: "https://via.placeholder.com/150",
      employeeName: "Jane Smith",
      leaveType: "Vacation",
      applicationDate: "2024-08-05",
      totalDays: 5,
      hrStatus: "Pending",
      billingStatus: "Pending",
      leadStatus: "Pending",
    },
  ]);

  const columns = [
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      width: 130,
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar} />
          <div>
            <div>{record.employeeName}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
      width: 130,
    },
    {
      title: "Application Date",
      dataIndex: "applicationDate",
      key: "applicationDate",
      width: 130,
      render: (text) => formatDate(text),
    },
    {
      title: "Total Days",
      dataIndex: "totalDays",
      key: "totalDays",
      width: 100,
    },
    {
      title: "HR Status",
      dataIndex: "hrStatus",
      key: "hrStatus",
      width: 130,
      render: (status) => <StatusCell>{status}</StatusCell>,
    },
    {
      title: "Billing Management Status",
      dataIndex: "billingStatus",
      key: "billingStatus",
      width: 180,
      render: (status) => <StatusCell>{status}</StatusCell>,
    },
    {
      title: "Lead Status",
      dataIndex: "leadStatus",
      key: "leadStatus",
      width: 100,
      render: (status) => <StatusCell>{status}</StatusCell>,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <div className="actionDiv">
          <span>
            <img src={Edit} alt="edit" className="action-icon" />
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
    item.employeeName.toLowerCase().includes(searchText)
  );

  console.log(filteredData, "filteredData");
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleDelete = (item) => {
    console.log(item, "select");
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
    <LeaveWrapper>
      <Header>
        <Title>Leave Pending </Title>
        <Breadcrumb>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem>Leave</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem isLast>Leave Pending</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <SearchBar>
        <Input
          type="search"
          placeholder="Search leave"
          onKeyDown={(e) => e.key === "Enter" && handleSearch(e.target.value)}
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
        scroll={{ x: 1300, y: 500 }}
        onChange={handleTableChange}
      />
      <DeleteModal
        visible={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        itemName={selectedItem?.employeeName}
      />
    </LeaveWrapper>
  );
};

export default LeavePending;

const LeaveWrapper = styled.div`
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

const StatusCell = styled.div`
  background-color: #fdd835;
  display: inline-block;
  text-align: center;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
`;

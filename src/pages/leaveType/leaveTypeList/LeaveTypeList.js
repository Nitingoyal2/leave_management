import React, { useState } from "react";
import styled from "styled-components";
import { Table, Input, Tooltip } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Delete, Edit } from "../../../Utils/images";
import DeleteModal from "../../../components/modal/deleteModal/DeleteModal";
import StatusModal from "../../../components/modal/statusModal/StatusModal";
import LeaveTypeEditModal from "../../../components/modal/leaveTypeEditmodal/ListTypeEditModal";

const LeaveTypeList = () => {
  const [data, setData] = useState([
    {
      key: "1",
      leaveTypeName: "Annual Leave",
      leaveTypeDetails: "Paid time off for vacations",
      createdOn: "2024-03-01",
      leaveTypeStatus: true,
    },
    {
      key: "2",
      leaveTypeName: "Sick Leave",
      leaveTypeDetails: "Leave granted for illness",
      createdOn: "2024-04-01",
      leaveTypeStatus: false,
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedLeaveTyeForEdit, setSelectedLeaveTyeForEdit] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleStatusClick = (record) => {
    setSelectedItem(record);
    setSelectedStatus(record.leaveTypeStatus);
    setStatusModalVisible(true);
  };

  const confirmStatusChange = () => {
    if (selectedItem) {
      const updatedData = data.map((item) =>
        item.key === selectedItem.key
          ? { ...item, leaveTypeStatus: !selectedStatus }
          : item
      );
      setData(updatedData);
      setStatusModalVisible(false);
    }
  };

  const cancelStatusChange = () => {
    setSelectedItem(null);
    setStatusModalVisible(false);
  };

  const columns = [
    {
      title: "Leave Type Name",
      dataIndex: "leaveTypeName",
      key: "leaveTypeName",
    },
    {
      title: "Leave Type Details",
      dataIndex: "leaveTypeDetails",
      key: "leaveTypeDetails",
      render: (text) => (
        <Tooltip title={text}>
          <LeaveTypeDetails>{text}</LeaveTypeDetails>
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
      title: "Leave Type Status",
      dataIndex: "leaveTypeStatus",
      key: "leaveTypeStatus",
      render: (text, record) => (
        <StatusTag
          isActive={record.leaveTypeStatus}
          onClick={() => handleStatusClick(record)}
        >
          {record.leaveTypeStatus ? "Active" : "Inactive"}
        </StatusTag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="actionDiv">
          <span>
            <img src={Edit} alt="edit" className="action-icon" onClick={() => handleEdit(record)}/>
          </span>
          <span>
            <img
              src={Delete}
              alt="delete"
              className="action-icon"
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
    item.leaveTypeName.toLowerCase().includes(searchText)
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

  const handleEdit = (record) => {
    setSelectedLeaveTyeForEdit(record);
    setEditModalVisible(true);
  };

  const confirmEdit = (updatedDept) => {
    const updatedData = data.map((dept) =>
      dept.key === selectedLeaveTyeForEdit.key
        ? { ...dept, ...updatedDept }
        : dept
    );
    setData(updatedData);
    setEditModalVisible(false);
  };

  return (
    <LeaveTypeWrapper>
      <Header>
        <Title>Leave Type List</Title>
        <Breadcrumb>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem>Leave Type</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem isLast>Leave Type List</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <SearchBar>
        <Input
          type="search"
          placeholder="Search leave type"
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
        scroll={{ x: true, y: 500 }}
        onChange={handleTableChange}
      />
      <DeleteModal
        visible={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        itemName={selectedItem?.leaveTypeName}
      />
      <StatusModal
        visible={statusModalVisible}
        onConfirm={confirmStatusChange}
        onCancel={cancelStatusChange}
        itemName={selectedItem?.leaveTypeName}
      />
      <LeaveTypeEditModal
        visible={editModalVisible}
        onConfirm={confirmEdit}
        onCancel={() => setEditModalVisible(false)}
        department={selectedLeaveTyeForEdit}
      />
    </LeaveTypeWrapper>
  );
};

export default LeaveTypeList;

const LeaveTypeWrapper = styled.div`
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

const LeaveTypeDetails = styled.span`
  display: inline-block;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  cursor: pointer;
`;

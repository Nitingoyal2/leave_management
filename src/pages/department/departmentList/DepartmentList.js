import React, { useState } from "react";
import styled from "styled-components";
import { Table, Input, Tooltip } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Delete, Edit } from "../../../Utils/images";
import DeleteModal from "../../../components/modal/deleteModal/DeleteModal";
import StatusModal from "../../../components/modal/statusModal/StatusModal";

const DepartmentList = () => {
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
    {
      key: "3",
      deptName: "IT",
      deptDetails: "Handles IT infrastructure and support",
      createdOn: "2024-03-01",
      deptStatus: true,
    },
    {
      key: "4",
      deptName: "Marketing",
      deptDetails: "Manages marketing strategies and campaigns",
      createdOn: "2024-04-01",
      deptStatus: true,
    },
    {
      key: "5",
      deptName: "Sales",
      deptDetails: "Handles sales operations and client relationships",
      createdOn: "2024-05-01",
      deptStatus: false,
    },
    {
      key: "6",
      deptName: "Operations",
      deptDetails: "Oversees daily business operations",
      createdOn: "2024-06-01",
      deptStatus: true,
    },
    {
      key: "7",
      deptName: "Legal",
      deptDetails: "Handles legal matters and compliance",
      createdOn: "2024-07-01",
      deptStatus: false,
    },
    {
      key: "8",
      deptName: "R&D",
      deptDetails: "Focuses on research and development",
      createdOn: "2024-08-01",
      deptStatus: true,
    },
    {
      key: "9",
      deptName: "Customer Service",
      deptDetails: "Manages customer inquiries and support",
      createdOn: "2024-09-01",
      deptStatus: true,
    },
    {
      key: "10",
      deptName: "Admin",
      deptDetails: "Handles administrative tasks",
      createdOn: "2024-10-01",
      deptStatus: false,
    },
    {
      key: "11",
      deptName: "Procurement",
      deptDetails: "Handles purchasing and supply chain management",
      createdOn: "2024-11-01",
      deptStatus: true,
    },
    {
      key: "12",
      deptName: "Product",
      deptDetails: "Oversees product development and management",
      createdOn: "2024-12-01",
      deptStatus: true,
    },
    {
      key: "13",
      deptName: "Engineering",
      deptDetails: "Manages engineering and technical projects",
      createdOn: "2024-01-15",
      deptStatus: true,
    },
    {
      key: "14",
      deptName: "Design",
      deptDetails: "Handles design and user experience",
      createdOn: "2024-02-15",
      deptStatus: false,
    },
    {
      key: "15",
      deptName: "Logistics",
      deptDetails: "Manages logistics and supply chain operations",
      createdOn: "2024-03-15",
      deptStatus: true,
    },
    {
      key: "16",
      deptName: "Quality Assurance",
      deptDetails: "Ensures product quality and compliance",
      createdOn: "2024-04-15",
      deptStatus: false,
    },
    {
      key: "17",
      deptName: "Training",
      deptDetails: "Handles employee training and development",
      createdOn: "2024-05-15",
      deptStatus: true,
    },
    {
      key: "18",
      deptName: "Support",
      deptDetails: "Provides technical and customer support",
      createdOn: "2024-06-15",
      deptStatus: true,
    },
    {
      key: "19",
      deptName: "Strategy",
      deptDetails: "Oversees strategic planning and execution",
      createdOn: "2024-07-15",
      deptStatus: false,
    },
    {
      key: "20",
      deptName: "Compliance",
      deptDetails: "Ensures regulatory and policy compliance",
      createdOn: "2024-08-15",
      deptStatus: true,
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleStatusClick = (record) => {
    setSelectedDept(record);
    setSelectedStatus(record.deptStatus);
    setStatusModalVisible(true);
  };

  const confirmStatusChange = () => {
    if (selectedDept) {
      const updatedData = data.map((dept) =>
        dept.key === selectedDept.key
          ? { ...dept, deptStatus: !selectedStatus }
          : dept
      );
      setData(updatedData);
      setStatusModalVisible(false);
    }
  };

  const cancelStatusChange = () => {
    setSelectedDept(null);
    setStatusModalVisible(false);
  };

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
        <StatusTag
          isActive={record.deptStatus}
          onClick={() => handleStatusClick(record)}
        >
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
    item.deptName.toLowerCase().includes(searchText)
  );
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleDelete = (record) => {
    setSelectedDept(record);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (selectedDept) {
      console.log(`Deleting department: ${selectedDept.deptName}`);
      setData(data.filter((item) => item.key !== selectedDept.key));
      setSelectedDept(null);
      setDeleteModalVisible(false);
    }
  };

  const cancelDelete = () => {
    setSelectedDept(null);
    setDeleteModalVisible(false);
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
        visible={deleteModalVisible}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        itemName={selectedDept?.deptName}
      />
      <StatusModal
        visible={statusModalVisible}
        onConfirm={confirmStatusChange}
        onCancel={cancelStatusChange}
        itemName={selectedDept?.deptName}
      />
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
  cursor: pointer;
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

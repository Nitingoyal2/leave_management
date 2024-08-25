import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TotalLeave, Rejected, Pending, Approve } from "../../Utils/images";
import { Employee } from "../../Utils/images";
import { Select, Table } from "antd";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import {
  getDepartmentList,
  getEmployeeList,
  getLeaveCount,
} from "../../Services/Collection";
import { toast } from "react-toastify";
const { Option } = Select;

const Dashboard = () => {
  const [selectedRole, setSelectedRole] = useState("All");
  const [staffList, setStaffList] = useState([]);
  const [leaveCount, setLeaveCount] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [roles, setRoles] = useState([]);

  const fetchData = async () => {
    try {
      let params = new URLSearchParams();
      params.append("role", selectedRole);
      params.append("page", currentPage);
      params.append("limit", itemsPerPage);
      const res = await getEmployeeList(params);
      if (res?.status === 200) {
        setStaffList(res?.data);
      } else {
        let message =
          res?.response?.data?.message ||
          res?.message ||
          res?.error ||
          "Something went wrong";
        setStaffList([]);
        toast.error(message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
    }
  };

  const fetchGetLeaveCount = async () => {
    try {
      const res = await getLeaveCount();
      if (res?.status === 200) {
        setLeaveCount(res?.data);
        setTotalItems(res?.data.total);
      } else {
        let message =
          res?.response?.data?.message ||
          res?.message ||
          res?.error ||
          "Something went wrong";
        setLeaveCount({});
        setTotalItems(0);
        toast.error(message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
    }
  };

  const fetchDepartmentList = async () => {
    try {
      const res = await getDepartmentList();
      if (res?.status === 200) {
        setRoles(res.data);
      } else {
        let message =
          res?.response?.data?.message ||
          res?.message ||
          res?.error ||
          "Something went wrong";
        setLeaveCount({});
        setTotalItems(0);
        toast.error(message);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
    fetchGetLeaveCount();
    fetchDepartmentList();
  }, [selectedRole, currentPage, itemsPerPage]);

  const handleRoleChange = (value) => {
    setSelectedRole(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const filteredStaffList =
    selectedRole === "All"
      ? staffList
      : staffList.filter((staff) => staff.role === selectedRole);

  const data = [
    { name: "Total Leave", value: leaveCount?.totalLeaves },
    { name: "Rejected Leave", value: leaveCount?.rejectedLeaves },
    { name: "Approved Leave", value: leaveCount?.approvedLeaves },
    { name: "Pending Leave", value: leaveCount?.pendingLeaves },
  ];

  const COLORS = ["#8884d8", "#ff6f61", "#4caf50", "#ffc107"];

  const columns = [
    {
      title: "Avatar",
      dataIndex: "profile_img",
      key: "avatar",
      render: (text, record) => (
        <Avatar src={record.profile_img || Employee} alt="Avatar" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <StaffName>{`${record.first_name} ${record.last_name}`}</StaffName>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  const paginationConfig = {
    current: currentPage,
    pageSize: itemsPerPage,
    total: totalItems,
    onChange: handlePageChange,
    onShowSizeChange: (current, size) => {
      handleItemsPerPageChange(size);
    },
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "15", "20"],
    showTotal: (total, range) =>
      `Showing ${range[0]}-${range[1]} of ${total} items`,
  };

  return (
    <DashboardWrapper>
      <Title>Dashboard</Title>

      <>
        <MetricsContainer>
          <Metric>
            <MetricImage src={TotalLeave} alt="Total Leave" />
            <MetricValue>{leaveCount?.totalLeaves}</MetricValue>
            <MetricTitle>Total Leave</MetricTitle>
          </Metric>
          <Metric>
            <MetricImage src={Rejected} alt="Rejected" />
            <MetricValue>{leaveCount?.rejectedLeaves}</MetricValue>
            <MetricTitle>Rejected Leave</MetricTitle>
          </Metric>
          <Metric>
            <MetricImage src={Approve} alt="Approved" />
            <MetricValue>{leaveCount?.approvedLeaves}</MetricValue>
            <MetricTitle>Approved Leave</MetricTitle>
          </Metric>
          <Metric>
            <MetricImage src={Pending} alt="Pending" />
            <MetricValue>{leaveCount?.pendingLeaves}</MetricValue>
            <MetricTitle>Pending Leave</MetricTitle>
          </Metric>
        </MetricsContainer>

        <ChartSection>
          <ChartTitle>Leave Statistics</ChartTitle>
          <PieChart width={400} height={400} className="pie-chart">
            <Pie
              data={data}
              dataKey="value"
              outerRadius={150}
              innerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ChartSection>

        <TeamSection>
          <TeamTitle>Team Overview</TeamTitle>
          <StaffSection>
            <div className="staff-header">
              <StaffTitle>Staff List</StaffTitle>
              <FilterDropdown onChange={handleRoleChange} />
            </div>
            <Table
              dataSource={filteredStaffList}
              columns={columns}
              rowKey="email"
              pagination={paginationConfig}
            />
          </StaffSection>
        </TeamSection>
      </>
    </DashboardWrapper>
  );
};

const FilterDropdown = ({ roles, onChange }) => {
  return (
    <Select
      defaultValue="all"
      style={{ width: 200 }}
      onChange={onChange}
      showSearch
      placeholder="Select a role"
      optionFilterProp="children"
      onSearch={(value) => console.log(value)}
    >
      <Option value="all">All Roles</Option>
      {roles?.map((item) => (
        <Option key={item.id} value={item.name}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
};

export default Dashboard;

const DashboardWrapper = styled.div`
  /* Custom Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  padding: 20px;
  .staff-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const MetricsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px; /* Gap between items */
`;

const Metric = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MetricTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #555;
  margin: 10px 0px;
`;

const MetricValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const MetricImage = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`;

const TeamSection = styled.div`
  margin-top: 30px;
`;

const TeamTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const StaffSection = styled.div`
  margin-top: 10px;
`;

const StaffTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const StaffName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const ChartSection = styled.div`
  margin-top: 30px;
  .pie-chart {
    margin: 0 auto;
  }
`;

const ChartTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

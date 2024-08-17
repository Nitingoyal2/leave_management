import React, { useState } from "react";
import styled from "styled-components";
import { TotalLeave, Rejected, Pending, Approve } from "../../Utils/images";
import { Employee } from "../../Utils/images";
import { Select } from "antd";
import {   Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
const { Option } = Select;

const Dashboard = () => {
  const [selectedRole, setSelectedRole] = useState("All");

  const staffList = [
    {
      name: "Staff Member 1",
      email: "staff1@example.com",
      role: "Web",
      avatar: Employee,
    },
    {
      name: "Staff Member 2",
      email: "staff2@example.com",
      role: "Web",
      avatar: Employee,
    },
    {
      name: "Staff Member 3",
      email: "staff3@example.com",
      role: "Web",
      avatar: Employee,
    },
    {
      name: "Staff Member 4",
      email: "staff4@example.com",
      role: "Web",
      avatar: Employee,
    },
    {
      name: "Staff Member 5",
      email: "staff5@example.com",
      role: "Web",
      avatar: Employee,
    },
    {
      name: "Staff Member 6",
      email: "staff6@example.com",
      role: "Backend",
      avatar: Employee,
    },
    {
      name: "Staff Member 7",
      email: "staff7@example.com",
      role: "Backend",
      avatar: Employee,
    },
    {
      name: "Staff Member 8",
      email: "staff8@example.com",
      role: "Backend",
      avatar: Employee,
    },
    {
      name: "Staff Member 9",
      email: "staff9@example.com",
      role: "Backend",
      avatar: Employee,
    },
    {
      name: "Staff Member 10",
      email: "staff10@example.com",
      role: "Backend",
      avatar: Employee,
    },
    {
      name: "Staff Member 11",
      email: "staff11@example.com",
      role: "Python",
      avatar: Employee,
    },
    {
      name: "Staff Member 12",
      email: "staff12@example.com",
      role: "Python",
      avatar: Employee,
    },
    {
      name: "Staff Member 13",
      email: "staff13@example.com",
      role: "Python",
      avatar: Employee,
    },
    {
      name: "Staff Member 14",
      email: "staff14@example.com",
      role: "Python",
      avatar: Employee,
    },
    {
      name: "Staff Member 15",
      email: "staff15@example.com",
      role: "Python",
      avatar: Employee,
    },
    {
      name: "Staff Member 16",
      email: "staff16@example.com",
      role: "iOS",
      avatar: Employee,
    },
    {
      name: "Staff Member 17",
      email: "staff17@example.com",
      role: "iOS",
      avatar: Employee,
    },
    {
      name: "Staff Member 18",
      email: "staff18@example.com",
      role: "iOS",
      avatar: Employee,
    },
    {
      name: "Staff Member 19",
      email: "staff19@example.com",
      role: "iOS",
      avatar: Employee,
    },
    {
      name: "Staff Member 20",
      email: "staff20@example.com",
      role: "iOS",
      avatar: Employee,
    },
  ];

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  const filteredStaffList =
    selectedRole === "All"
      ? staffList
      : staffList.filter((staff) => staff.role === selectedRole);
  const data = [
    { name: "Total Leave", value: 123 },
    { name: "Rejected Leave", value: 45 },
    { name: "Approved Leave", value: 67 },
    { name: "Pending Leave", value: 12 },
  ];

  const COLORS = ["#8884d8", "#ff6f61", "#4caf50", "#ffc107"];
  return (
    <DashboardWrapper>
      <Title>Dashboard</Title>
      <MetricsContainer>
        <Metric>
          <MetricImage src={TotalLeave} alt="Total Leave" />
          <MetricValue>123</MetricValue>
          <MetricTitle>Total Leave</MetricTitle>
        </Metric>
        <Metric>
          <MetricImage src={Rejected} alt="Rejected" />
          <MetricValue>45</MetricValue>
          <MetricTitle>Rejected Leave</MetricTitle>
        </Metric>
        <Metric>
          <MetricImage src={Approve} alt="Approved" />
          <MetricValue>67</MetricValue>
          <MetricTitle>Approved Leave</MetricTitle>
        </Metric>
        <Metric>
          <MetricImage src={Pending} alt="Pending" />
          <MetricValue>12</MetricValue>
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
          <StaffList>{generateStaffList(filteredStaffList)}</StaffList>
        </StaffSection>
      </TeamSection>
    </DashboardWrapper>
  );
};

const FilterDropdown = ({ onChange }) => {
  return (
    <Select defaultValue="All" style={{ width: 200 }} onChange={onChange}>
      <Option value="All">All Roles</Option>
      <Option value="Web">Web</Option>
      <Option value="Backend">Backend</Option>
      <Option value="Python">Python</Option>
      <Option value="iOS">iOS</Option>
    </Select>
  );
};

const generateStaffList = (staffList) => {
  return staffList.map((staff, index) => (
    <StaffItem key={`staff-${index}`}>
      <Avatar src={staff.avatar} alt={`Staff ${index + 1}`} />
      <StaffDetails>
        <StaffName>{staff.name}</StaffName>
        <StaffEmail>{staff.email}</StaffEmail>
      </StaffDetails>
      <StaffRole>{staff.role}</StaffRole>
    </StaffItem>
  ));
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

const StaffList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StaffItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const StaffDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0px 20px;
`;

const StaffName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const StaffEmail = styled.div`
  font-size: 14px;
  color: #555;
`;

const StaffRole = styled.div`
  font-size: 14px;
  color: #777;
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

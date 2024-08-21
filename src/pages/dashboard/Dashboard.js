import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  TotalLeave,
  Rejected,
  Pending,
  Approve,
  Empty,
} from "../../Utils/images";
import { Employee } from "../../Utils/images";
import { Select } from "antd";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { getEmployeeList, getLeaveCount } from "../../Services/Collection";
import { toast } from "react-toastify";
import MainLoader from "../../components/MainLoader";
import { Pagination } from 'antd';
const { Option } = Select;

const Dashboard = () => {
  const [selectedRole, setSelectedRole] = useState("All");
  const [staffList, setStaffList] = useState([]);
  const [leaveCount, setLeaveCount] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(10);

  const fetchData = async () => {
    setLoading(true);
    setError(false); 
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
        setError(true); 
        toast.error(message);
      }
    } catch (error) {
      setError(true); 
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchGetLeaveCount = async () => {
    setLoading(true);
    setError(false); 
    try {
      const res = await getLeaveCount();
      if (res?.status === 200) {
        setLeaveCount(res?.data);
      } else {
        let message =
          res?.response?.data?.message ||
          res?.message ||
          res?.error ||
          "Something went wrong";
        setLeaveCount({});
        setError(true); 
        toast.error(message);
      }
    } catch (error) {
      setError(true); 
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchGetLeaveCount();
  }, [selectedRole, currentPage, itemsPerPage]);

  const handleRoleChange = (value) => {
    setSelectedRole(value);
    setCurrentPage(1); 
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const filteredStaffList =
    selectedRole === "All"
      ? staffList
      : staffList.filter((staff) => staff.role === selectedRole);

  const data = [
    { name: "Total Leave", value: leaveCount?.total },
    { name: "Rejected Leave", value: leaveCount?.rejected },
    { name: "Approved Leave", value: leaveCount?.approved },
    { name: "Pending Leave", value: leaveCount?.pending },
  ];

  const COLORS = ["#8884d8", "#ff6f61", "#4caf50", "#ffc107"];

  return (
    <DashboardWrapper>
      <Title>Dashboard</Title>

      {loading ? (
        <LoaderWrapper>
        <MainLoader />
      </LoaderWrapper>
      ) : error || staffList.length === 0 ? (
        <NoDataFound>
          <NoDataIconWrapper>
            <img src={Empty} alt="No Data" />
          </NoDataIconWrapper>
          <NoDataText>No Data Found</NoDataText>
        </NoDataFound>
      ) : (
        <>
          <MetricsContainer>
            <Metric>
              <MetricImage src={TotalLeave} alt="Total Leave" />
              <MetricValue>{leaveCount?.total}</MetricValue>
              <MetricTitle>Total Leave</MetricTitle>
            </Metric>
            <Metric>
              <MetricImage src={Rejected} alt="Rejected" />
              <MetricValue>{leaveCount?.rejected}</MetricValue>
              <MetricTitle>Rejected Leave</MetricTitle>
            </Metric>
            <Metric>
              <MetricImage src={Approve} alt="Approved" />
              <MetricValue>{leaveCount?.approved}</MetricValue>
              <MetricTitle>Approved Leave</MetricTitle>
            </Metric>
            <Metric>
              <MetricImage src={Pending} alt="Pending" />
              <MetricValue>{leaveCount?.pending}</MetricValue>
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
              <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={staffList.length}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </StaffSection>
          </TeamSection>
        </>
      )}
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
      <Avatar src={staff.profile_img || Employee} alt={`Staff ${index + 1}`} />
      <StaffDetails>
        <StaffName>
          {staff.first_name} {staff.last_name}
        </StaffName>
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

const NoDataFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #888;
`;

const NoDataIconWrapper = styled.div`
  margin-bottom: 10px;
  img {
    width: 50px;
    height: 50px;
  }
`;

const NoDataText = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const LoaderWrapper = styled.div`
  margin-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  .loader {
    height: 50px;
    width: 40px;
  }
`;

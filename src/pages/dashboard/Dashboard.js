import React from "react";
import styled from "styled-components";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Title>Dashboard</Title>
      <MetricsContainer>
        <Metric>
          <MetricTitle>Total Leave</MetricTitle>
          <MetricValue>123</MetricValue>
        </Metric>
        <Metric>
          <MetricTitle>Rejected</MetricTitle>
          <MetricValue>45</MetricValue>
        </Metric>
        <Metric>
          <MetricTitle>Approved</MetricTitle>
          <MetricValue>67</MetricValue>
        </Metric>
        <Metric>
          <MetricTitle>Pending</MetricTitle>
          <MetricValue>12</MetricValue>
        </Metric>
      </MetricsContainer>
    </DashboardWrapper>
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
    background: #555; /
  }

  padding: 20px;
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
  font-weight: 500;
  color: #555;
  margin-bottom: 10px;
`;

const MetricValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

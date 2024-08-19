import React from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RightOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import { Select } from "antd";

const { Option } = Select;
const NewLeave = () => {
  const validationSchema = Yup.object({
    leaveType: Yup.string().required("Leave type is required"),
    numberOfDays: Yup.number()
      .min(1, "Number of days must be at least 1")
      .required("Number of days is required"),
    startDate: Yup.date()
      .min(new Date(), "Start date cannot be in the past")
      .required("Start date is required"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "End date cannot be before start date")
      .required("End date is required"),
    leaveDescription: Yup.string().required("Leave description is required"),
  });

  const initialValues = {
    leaveType: "",
    numberOfDays: "",
    startDate: "",
    endDate: "",
    leaveDescription: "",
  };

  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  return (
    <LeaveWrapper>
      <Header>
        <Title>New Leave</Title>
        <Breadcrumb>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem>Leave</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem isLast>New Leave</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <StyledForm>
            <div className="form-row">
              <FormGroup>
                <Label htmlFor="leaveType">Leave Type</Label>
                <Select
                  value={values.leaveType}
                  onChange={(value) => setFieldValue("leaveType", value)}
                  placeholder="Select role"
                  style={{ width: "100%" }}
                >
                  <Option value="">Select leave type</Option>
                  <Option value="sick">Sick Leave</Option>
                  <Option value="casual">Casual Leave</Option>
                  <Option value="maternity">Maternity Leave</Option>
                </Select>

                <ErrorMsg name="leaveType" component="div" />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="numberOfDays">Number of Days</Label>
                <StyledField
                  type="number"
                  id="numberOfDays"
                  name="numberOfDays"
                  placeholder="Enter number of days"
                />
                <ErrorMsg name="numberOfDays" component="div" />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="startDate">Start Date</Label>
                <StyledField type="date" id="startDate" name="startDate" />
                <ErrorMsg name="startDate" component="div" />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="endDate">End Date</Label>
                <StyledField type="date" id="endDate" name="endDate" />
                <ErrorMsg name="endDate" component="div" />
              </FormGroup>
            </div>

            <FormGroup>
              <Label htmlFor="leaveDescription">Leave Description</Label>
              <ReactQuill
                theme="snow"
                value={values.leaveDescription}
                onChange={(content) =>
                  setFieldValue("leaveDescription", content)
                }
              />
              <ErrorMsg name="leaveDescription" component="div" />
            </FormGroup>

            <Button type="submit">Apply Leave</Button>
          </StyledForm>
        )}
      </Formik>
    </LeaveWrapper>
  );
};

export default NewLeave;

const LeaveWrapper = styled.div`
  padding: 20px;
  p {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }
  .form-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
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

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #555;
  margin-bottom: 5px;
`;

const StyledField = styled(Field)`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ErrorMsg = styled(ErrorMessage)`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #26a69a;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #80cbc4;
  }
`;

import React from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { RightOutlined } from "@ant-design/icons";

const AddLeaveType = () => {
  const validationSchema = Yup.object({
    leaveTypeName: Yup.string()
      .max(50, "Leave type name must be 50 characters or less")
      .required("Leave type name is required"),
    leaveTypeDescription: Yup.string().required(
      "Leave type description is required"
    ),
    leaveTypeStatus: Yup.boolean(),
  });

  const initialValues = {
    leaveTypeName: "",
    leaveTypeDescription: "",
    leaveTypeStatus: false,
  };

  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  return (
    <LeaveTypeWrapper>
      <Header>
        <Title>Add Leave Type</Title>
        <Breadcrumb>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem>Leave Types</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem isLast>Add Leave Type</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <StyledForm>
            <FormGroup>
              <Label htmlFor="leaveTypeName">Leave Type Name</Label>
              <StyledField
                type="text"
                id="leaveTypeName"
                name="leaveTypeName"
                placeholder="Enter leave type name"
              />
              <ErrorMsg name="leaveTypeName" component="div" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="leaveTypeDescription">
                Leave Type Description
              </Label>
              <ReactQuill
                theme="snow"
                value={values.leaveTypeDescription}
                onChange={(content, delta, source, editor) => {
                  setFieldValue("leaveTypeDescription", editor.getHTML());
                }}
              />
              <ErrorMsg name="leaveTypeDescription" component="div" />
            </FormGroup>

            <FormGroup>
              <CheckboxContainer>
                <StyledField
                  type="checkbox"
                  id="leaveTypeStatus"
                  name="leaveTypeStatus"
                />
                <Label htmlFor="leaveTypeStatus" style={{ margin: "0px" }}>
                  Leave Type Status
                </Label>
              </CheckboxContainer>
            </FormGroup>

            <Button type="submit">Add Leave Type</Button>
          </StyledForm>
        )}
      </Formik>
    </LeaveTypeWrapper>
  );
};

export default AddLeaveType;

// Styled components
const LeaveTypeWrapper = styled.div`
  padding: 20px;
  p {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
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

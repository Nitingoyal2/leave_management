import React from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import {  RightOutlined } from "@ant-design/icons";

const CreateDepartment = () => {
  const validationSchema = Yup.object({
    deptName: Yup.string()
      .max(50, "Department name must be 50 characters or less")
      .required("Department name is required"),
    deptShortName: Yup.string()
      .max(10, "Short name must be 10 characters or less")
      .required("Short name is required"),
    deptDetails: Yup.string().required("Department details are required"),
    deptStatus: Yup.boolean(),
  });

  const initialValues = {
    deptName: "",
    deptShortName: "",
    deptDetails: "",
    deptStatus: false,
  };

  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  return (
    <DepartmentWrapper>
      <Header>
        <Title>Add Department</Title>
        <Breadcrumb>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem>Department</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem isLast>Add Department</BreadcrumbItem>
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
              <Label htmlFor="deptName">Department Name</Label>
              <StyledField
                type="text"
                id="deptName"
                name="deptName"
                placeholder="Enter department name"
              />
              <ErrorMsg name="deptName" component="div" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="deptShortName">Department Short Name</Label>
              <StyledField
                type="text"
                id="deptShortName"
                name="deptShortName"
                placeholder="Enter department short name"
              />
              <ErrorMsg name="deptShortName" component="div" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="deptDetails">Department Details</Label>
              <ReactQuill
                theme="snow"
                value={values.deptDetails}
                onChange={(content, delta, source, editor) => {
                  setFieldValue("deptDetails", editor.getHTML());
                }}
              />
              <ErrorMsg name="deptDetails" component="div" />
            </FormGroup>

            <FormGroup>
              <CheckboxContainer>
                <StyledField
                  type="checkbox"
                  id="deptStatus"
                  name="deptStatus"
                />
                <Label htmlFor="deptStatus" style={{ margin: "0px" }}>
                  Department Status
                </Label>
              </CheckboxContainer>
            </FormGroup>

            <Button type="submit">Add Department</Button>
          </StyledForm>
        )}
      </Formik>
    </DepartmentWrapper>
  );
};

export default CreateDepartment;


const DepartmentWrapper = styled.div`
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

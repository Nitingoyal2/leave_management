import React from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Select, Button, Upload } from "antd";
import { EditOutlined, RightOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

const AddEmployee = () => {
  const validationSchema = Yup.object({
    avatar: Yup.mixed().required("Avatar is required"),
    firstName: Yup.string()
      .max(50, "First name must be 50 characters or less")
      .required("First name is required"),
    lastName: Yup.string()
      .max(50, "Last name must be 50 characters or less")
      .required("Last name is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.date().required("Date of birth is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    role: Yup.string().required("Role is required"),
    address: Yup.string().required("Address is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    avatar: null,
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    role: "",
    address: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log("Form data:", values);
  };

  const handleFileChange = (file, setFieldValue) => {
    setFieldValue("avatar", file);
  };

  return (
    <EmployeeWrapper>
      <Header>
        <Title>Add Employee</Title>
        <Breadcrumb>
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem>Department</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem isLast>Add Employee</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <StyledForm onSubmit={handleSubmit}>
            <FormGroup className="avatar-row">
              <Label>Avatar</Label>
              <AvatarWrapper>
                {values.avatar ? (
                  <AvatarImage
                    src={URL.createObjectURL(values.avatar)}
                    alt="Avatar"
                  />
                ) : (
                  <AvatarPlaceholder>No Image</AvatarPlaceholder>
                )}
                <Upload
                  customRequest={({ file }) =>
                    handleFileChange(file, setFieldValue)
                  }
                  showUploadList={false}
                  accept="image/*"
                >
                  <UploadButton icon={<EditOutlined />} />
                </Upload>
              </AvatarWrapper>
              <ErrorMsg name="avatar" component="div" />
            </FormGroup>
            <div className="form-row">
              <FormGroup>
                <Label htmlFor="firstName">First Name</Label>
                <StyledField
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                />
                <ErrorMsg name="firstName" component="div" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="lastName">Last Name</Label>
                <StyledField
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                />
                <ErrorMsg name="lastName" component="div" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={values.gender}
                  onChange={(value) => setFieldValue("gender", value)}
                  placeholder="Select gender"
                  style={{ width: "100%" }}
                >
                  <Option value="">Select gender</Option>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="others">Other</Option>
                </Select>
                <ErrorMsg name="gender" component="div" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="dob">Date of Birth</Label>
                <StyledField type="date" id="dob" name="dob" />
                <ErrorMsg name="dob" component="div" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phone">Phone</Label>
                <StyledField
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter phone number"
                />
                <ErrorMsg name="phone" component="div" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <StyledField
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                />
                <ErrorMsg name="email" component="div" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="role">Role</Label>
                <Select
                  value={values.role}
                  onChange={(value) => setFieldValue("role", value)}
                  placeholder="Select role"
                  style={{ width: "100%" }}
                >
                  <Option value="">Select role</Option>
                  <Option value="admin">Admin</Option>
                  <Option value="manager">Manager</Option>
                  <Option value="employee">Employee</Option>
                </Select>
                <ErrorMsg name="role" component="div" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <StyledField
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                />
                <ErrorMsg name="password" component="div" />
              </FormGroup>
            </div>
            <FormGroup>
              <Label htmlFor="address">Address</Label>
              <ReactQuill
                theme="snow"
                value={values.address}
                onChange={(content) => setFieldValue("address", content)}
              />
              <ErrorMsg name="address" component="div" />
            </FormGroup>

            <SubmitButton type="submit">Add Employee</SubmitButton>
          </StyledForm>
        )}
      </Formik>
    </EmployeeWrapper>
  );
};

export default AddEmployee;

const EmployeeWrapper = styled.div`
  padding: 20px;
  overflow-y: auto;
  min-height: 100vh;
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

const SubmitButton = styled(Button).attrs({
  type: "primary",
  htmlType: "submit",
})`
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #26a69a;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #80cbc4;
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #f0f0f0;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const AvatarPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #888;
  font-size: 16px;
`;

const UploadButton = styled(Button)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  background: #007bff;
  color: #fff;
  border: none;
  &:hover {
    background-color: #0056b3;
  }
`;

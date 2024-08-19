import React from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Select, Button, Upload, DatePicker } from "antd";
import { EditOutlined, RightOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";

const { Option } = Select;

const ProfilePage = () => {
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
    dob: null,
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
    <ProfileWrapper>
      <Header>
        <Title>Profile Page</Title>
        <Breadcrumb>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <RightOutlined className="breadcrumb-icon" />
          <BreadcrumbItem isLast>Profile</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <StyledForm onSubmit={handleSubmit}>
            <AvatarSection>
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
            </AvatarSection>
            <FormGroup>
              <Label>First Name</Label>
              <StyledField
                type="text"
                name="firstName"
                placeholder="Enter first name"
              />
              <ErrorMsg name="firstName" component="div" />
            </FormGroup>
            <FormGroup>
              <Label>Last Name</Label>
              <StyledField
                type="text"
                name="lastName"
                placeholder="Enter last name"
              />
              <ErrorMsg name="lastName" component="div" />
            </FormGroup>
            <FormGroup>
              <Label>Gender</Label>
              <Select
                value={values.gender}
                onChange={(value) => setFieldValue("gender", value)}
                placeholder="Select gender"
                style={{ width: "100%" }}
              >
                <Option value="">Select gender</Option>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
              <ErrorMsg name="gender" component="div" />
            </FormGroup>
            <FormGroup>
              <Label>Date of Birth</Label>
              <DatePicker
                value={values.dob ? moment(values.dob) : null}
                onChange={(date, dateString) =>
                  setFieldValue("dob", dateString)
                }
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
              />
              <ErrorMsg name="dob" component="div" />
            </FormGroup>
            <FormGroup>
              <Label>Phone</Label>
              <StyledField
                type="text"
                name="phone"
                placeholder="Enter phone number"
              />
              <ErrorMsg name="phone" component="div" />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <StyledField
                type="email"
                name="email"
                placeholder="Enter email"
              />
              <ErrorMsg name="email" component="div" />
            </FormGroup>
            <FormGroup>
              <Label>Role</Label>
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
              <Label>Password</Label>
              <StyledField
                type="password"
                name="password"
                placeholder="Enter password"
              />
              <ErrorMsg name="password" component="div" />
            </FormGroup>
            <FormGroup>
              <Label>Address</Label>
              <ReactQuill
                theme="snow"
                value={values.address}
                onChange={(content) => setFieldValue("address", content)}
                style={{ height: 200 }}
              />
              <ErrorMsg name="address" component="div" />
            </FormGroup>
            <SubmitButton type="submit">Save Profile</SubmitButton>
          </StyledForm>
        )}
      </Formik>
    </ProfileWrapper>
  );
};

export default ProfilePage;

const ProfileWrapper = styled.div`
  padding: 40px;
  background: #f7f7f7;
  min-height: 100vh;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #333;
`;

const Breadcrumb = styled.div`
  font-size: 16px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
  .breadcrumb-icon {
    font-size: 12px;
    color: #888;
  }
`;

const BreadcrumbItem = styled.span`
  color: ${(props) => (props.isLast ? "#888" : "#007bff")};
  cursor: ${(props) => (props.isLast ? "default" : "pointer")};
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
  margin-bottom: 8px;
`;

const StyledField = styled(Field)`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: #fff;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ErrorMsg = styled(ErrorMessage)`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
`;

const SubmitButton = styled(Button).attrs({
  type: "primary",
  htmlType: "submit",
})`
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #e0e0e0;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const AvatarPlaceholder = styled.div`
  font-size: 16px;
  color: #999;
`;

const UploadButton = styled(Button)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #007bff;
  color: #fff;
  border: none;
  &:hover {
    background: #0056b3;
  }
`;

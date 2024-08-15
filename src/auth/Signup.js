import React, { useState } from "react";
import { Input, Button, Form as AntdForm, message } from "antd";
import { ErrorMessage, Field, Formik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import { AuthBacgroundImg } from "../Utils/images";
import Loader from "../components/Loader";
const Signup = () => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSignup = (values, { setSubmitting }) => {
    setLoading(true);
    console.log(values, "signup values");
    setSubmitting(false);
    setLoading(false);
  };

  return (
    <SignupWrapper>
      {loading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          {({ handleSubmit }) => (
            <StyledForm onFinish={handleSubmit}>
              <Title>Sign Up</Title>
              <FieldWrapper>
                <Field name="name">
                  {({ field }) => (
                    <Input {...field} placeholder="Enter your name" />
                  )}
                </Field>
                <ErrorMessage name="name" component={ErrorText} />
              </FieldWrapper>
              <FieldWrapper>
                <Field name="email">
                  {({ field }) => (
                    <Input {...field} placeholder="Enter your email" />
                  )}
                </Field>
                <ErrorMessage name="email" component={ErrorText} />
              </FieldWrapper>
              <FieldWrapper>
                <Field name="password">
                  {({ field }) => (
                    <Input.Password
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                    />
                  )}
                </Field>
                <ErrorMessage name="password" component={ErrorText} />
              </FieldWrapper>
              <FieldWrapper>
                <Field name="confirmPassword">
                  {({ field }) => (
                    <Input.Password
                      {...field}
                      type="password"
                      placeholder="Confirm your password"
                    />
                  )}
                </Field>
                <ErrorMessage name="confirmPassword" component={ErrorText} />
              </FieldWrapper>
              <StyledButton htmlType="submit">Sign Up</StyledButton>
              <LoginPrompt>
                If you have an account?{" "}
                <LoginLink onClick={() => console.log("login clicked")}>
                  Login
                </LoginLink>
              </LoginPrompt>
            </StyledForm>
          )}
        </Formik>
      )}
    </SignupWrapper>
  );
};

export default Signup;

const SignupWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  background-image: url(${AuthBacgroundImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .ant-input-affix-wrapper > input.ant-input {
    border: none !important;
  }
  .ant-input-affix-wrapper {
    height: 60px;
    display: flex;
    align-items: center;
    &:hover {
      border: 1px solid #4d6eac !important;
    }
    &:focus {
      border: 1px solid #4d6eac !important;
      outline: none !important;
      box-shadow: none !important;
    }
  }
`;

const StyledForm = styled(AntdForm)`
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  font-family: Jost;
  input {
    height: 60px;
    border-radius: 8px !important;
    outline: none;
    &:hover {
      border: 1px solid #4d6eac !important;
    }
    &:focus {
      border: 1px solid #4d6eac !important;
      outline: none !important;
      box-shadow: none !important;
    }
  }
`;

const FieldWrapper = styled.div`
  margin-bottom: 15px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const ErrorText = styled.div`
  color: #f5222d;
  font-size: 12px;
  margin-top: 5px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: none;
  background-color: #4d6eac;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  &:hover {
    border: none !important;
    background-color: #4d6eac !important;
    color: #fff !important;
  }
`;

const LoginPrompt = styled.p`
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
`;

const LoginLink = styled.span`
  color: #4d6eac;
  cursor: pointer;
`;

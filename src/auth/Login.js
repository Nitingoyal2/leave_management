import React, { useState } from "react";
import { Input, Button, Form as AntdForm, message } from "antd";
import { ErrorMessage, Field, Formik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { setAuthToken } from "../Store/authSlice";
// import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { AuthBacgroundImg } from "../Utils/images";

const Login = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    // empId: Yup.string().required("Employee ID required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    setLoading(true);
    console.log(values, "login values");
    setSubmitting(false);
    setLoading(false);
  };

  return (
    <LoginWrapper>
      {loading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleSubmit }) => (
            <StyledForm onFinish={handleSubmit}>
              <Title>Login </Title>
              <FieldWrapper>
                <Field name="email">
                  {({ field }) => (
                    <Input {...field} placeholder="Enter your email " />
                  )}
                </Field>
                <ErrorMessage name="email" component={ErrorText} />
              </FieldWrapper>
              {/* <FieldWrapper>
                <Field name="empId">
                  {({ field }) => (
                    <Input {...field} placeholder="Enter your Employee Id" />
                  )}
                </Field>
                <ErrorMessage name="empId" component={ErrorText} />
              </FieldWrapper> */}
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
              <StyledButton htmlType="submit">Login</StyledButton>
              {/* <SingupPrompt>
                Don't have an account?{" "}
                <SignupLink onClick={() => console.log("Go to Signup page")}>
                  SignUp
                </SignupLink>
              </SingupPrompt> */}
            </StyledForm>
          )}
        </Formik>
      )}
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
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

const SingupPrompt = styled.p`
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
`;

const SignupLink = styled.span`
  color: #4d6eac;
  cursor: pointer;
`;

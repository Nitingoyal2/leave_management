import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, BackgroundImg } from "../Utils/images";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { authlogin } from "../Store/Authentication";
import { toast } from "react-toastify";
import { AdminLogin } from "../Services/Collection";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    console.log(values, "values");
    const payload = {
      email: values?.email,
      password: values?.password,
    };
    console.log(payload, "payload");
    setLoading(true);
    try {
      let res = await AdminLogin(payload);
      console.log(res, "api response");
      if (res?.status === 200) {
        let filterData = {
          ...res?.data,
          token: res?.token,
        };
        toast.success("Login Successfully");
        navigate("/dashboard");
        dispatch(authlogin(filterData));
        setLoading(false);
      } else {
        let message =
          res?.response?.data?.message ||
          res?.message ||
          res?.error ||
          "Something went wrong";
        toast.error(message);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <LoginWrapper>
      <div className="flex-div">
        <div className="gradient-bg">
          <img src={BackgroundImg} alt="" />
        </div>
        <div className="inner-wrap">
          <img src={Logo} alt="" />
          <div className="inner-part">
            <div className="main-box">
              <div className="logo-div">
                <h4>Sign in your account</h4>
              </div>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({ values, setFieldValue }) => (
                  <StyledForm>
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
                      <Label htmlFor="password">Password</Label>
                      <div style={{ position: "relative" }}>
                        <StyledField
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Enter password"
                        />

                        <ErrorMsg name="password" component="div" />
                      </div>
                    </FormGroup>

                    <Button type="submit" disabled={loading}>
                      {loading ? "Loading..." : "Sign In"}
                    </Button>
                  </StyledForm>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default Login;

export const LoginWrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  width: 100%;
  height: 100vh;
  background: #ffffff;
  overflow: hidden;

  .flex-div {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .gradient-bg {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .inner-wrap {
      position: absolute;
      width: 551.98px;

      img {
        display: flex;
        margin: auto;
        width: 200px;
        height: 150px;
      }
    }

    .inner-part {
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.25);

      .main-box {
        padding: 40px;
        .logo-div {
          text-align: center;
          img {
            width: 150px;
            margin-bottom: 1rem;
          }

          h4 {
            margin-bottom: 1.5rem;
            color: #000;
            font-size: 25px;
            font-family: "Poppins";
          }
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    .inner-wrap {
      width: 95% !important;
    }
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
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
  width: 100%;
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

import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import styled from "styled-components";

const LeaveTypeEditModal = ({ visible, onConfirm, onCancel, department }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(department); 
  }, [department, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onConfirm(values);
    });
  };

  return (
    <StyledModal
      title="Edit Leave Type"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <StyledButton key="cancel" onClick={onCancel}>
          Cancel
        </StyledButton>,
        <StyledButton key="confirm" type="primary" onClick={handleOk}>
          Save
        </StyledButton>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="leaveTypeName"
          label="Leave Type Name"
          rules={[
            { required: true, message: "Please enter the Leave Type Name" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="leaveTypeDetails"
          label="Leave Type Details"
          rules={[
            { required: true, message: "Please enter the Leave Type Details" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </StyledModal>
  );
};

export default LeaveTypeEditModal;

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-footer {
    display: flex;
    justify-content: center;
    padding: 0;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 8px;
  margin: 0 4px;
  font-weight: bold;

  &:first-child {
    width: 100%;
    height: 40px;
    background-color: #f0f0f0;
    color: #000;
    border: 1px solid #d9d9d9;
    &:hover {
      background-color: #d9d9d9 !important;
      color: #000 !important;
      border: 1px solid #d9d9d9 !important;
    }
  }

  &:last-child {
    height: 40px;
    width: 100%;
    background-color: #ff4d4f;
    color: #fff;
    border: 1px solid #ff4d4f;
    &:hover {
      background-color: #f44336cf !important;
      color: #fff !important;
      border: 1px solid #ff4d4f !important;
    }
  }
`;

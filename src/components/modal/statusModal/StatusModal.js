import React from "react";
import { Modal, Button } from "antd";
import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";

const StatusModal = ({ visible, onConfirm, onCancel, itemName }) => {
  return (
    <StyledModal
      title={
        <StyledTitle>
          <CloseOutlined onClick={onCancel} style={{ fontSize: "20px" }} />
        </StyledTitle>
      }
      closable={false}
      visible={visible}
      onCancel={onCancel}
      centered
      width={350}
      footer={[
        <StyledButton key="cancel" onClick={onCancel}>
          Cancel
        </StyledButton>,
        <StyledButton key="confirm" type="primary" onClick={onConfirm}>
          Confirm
        </StyledButton>,
      ]}
    >
      <p>
        Are you sure you want to change the status of{" "}
        <strong>{itemName}</strong>?
      </p>
    </StyledModal>
  );
};

const DeleteModal = ({ visible, onConfirm, onCancel, itemName }) => {
  return (
    <StyledModal
      title={
        <StyledTitle>
          <CloseOutlined onClick={onCancel} style={{ fontSize: "20px" }} />
        </StyledTitle>
      }
      closable={false}
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Delete"
      cancelText="Cancel"
      centered
      width={350}
      footer={[
        <StyledButton key="cancel" onClick={onCancel}>
          Cancel
        </StyledButton>,
        <StyledButton key="confirm" type="primary" onClick={onConfirm}>
          Delete
        </StyledButton>,
      ]}
    >
      <p>
        Are you sure,You want to delete <br></br>
        {itemName}?
      </p>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-body {
  }

  .ant-modal-footer {
    display: flex;
    justify-content: center;
    padding: 0;
  }
  p {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin: 0px;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: flex-end;
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

export default StatusModal;

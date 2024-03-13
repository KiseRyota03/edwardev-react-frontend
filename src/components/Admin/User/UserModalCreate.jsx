import React, { useState } from "react";
import { Form, Input, Button, Modal, Divider, message, notification } from "antd";
import { callCreateUser } from "../../../services/api";
// import fetchUser from "./UserTable"

const UserModalCreate = (props) => {

  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async(values) => {
    const {fullName, password, email, phone} = values;
    setIsSubmit(true);
    const res = await callCreateUser(fullName, password, email, phone)
    if(res && res.data) {
        message.success("Tạo mới thành công");
        form.resetFields();
        props.setIsModalOpen(false);
        await props.fetchUser();
    } else {
        notification.error({
            message: "Đã có lỗi xảy ra",
            description: res.message
        })
    }
    setIsSubmit(false);
};

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={props.isModalOpen}
        onOk={() => {
          form.submit();
        }}
        onCancel={handleCancel}
        onText={"Tạo mới"}
        cancelText={"Hủy"}
      >
        <Divider />
        <Form
        form = {form}
        name = "basic"
        style = {{maxWidth:600}}
        onFinish = {onFinish}
        autoComplete="off"
        >
          <Form.Item
            messageVariables={{ another: "good" }}
            label="Tên hiển thị"
            labelCol={{ span: 24 }} //whole column
            name="fullName"
            rules={[{ required: true, message: "${another} is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            messageVariables={{ label: "good" }}
            label="Mật khẩu"
            labelCol={{ span: 24 }} //whole column
            name="password"
            rules={[{ required: true, message: "${label} is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            messageVariables={{ label: "good" }}
            label="Email"
            labelCol={{ span: 24 }} //whole column
            name="email"
            rules={[{ required: true, message: "${label} is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            messageVariables={{ label: "good" }}
            label="Phone"
            labelCol={{ span: 24 }} //whole column
            name="phone"
            rules={[{ required: true, message: "${label} is required" }]}
          >
            <Input />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default UserModalCreate;

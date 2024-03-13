import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal, Divider, message, notification } from "antd";
import { callUpdateUser } from "../../../services/api";
const UserModalUpdate = (props) => {
    const [form] = Form.useForm();

    const [isSubmit, setIsSubmit] = useState(false);
    
    useEffect(() => {
        form.setFieldsValue(props.dataUpdate)
    }, [props.dataUpdate]);


    console.log(props);
    const onFinish = async(values) => {
        const {_id, fullName, phone} = values;
        setIsSubmit(true);
        const res = await callUpdateUser(_id, fullName, phone)
        if(res && res.data) {
            message.success("Cập nhật thành công");
            props.setIsModalUpdateOpen(false);
            await props.fetchUser();
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            })
        }
        setIsSubmit(false);
    }

    const handleCancel = () => {
        props.setIsModalUpdateOpen(false);
    };



  return (
    <>
      <Modal
        title="Cập nhật người dùng"
        open={props.isModalUpdateOpen}
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
        <Form.Item hidden
            messageVariables={{ another: "good" }}
            label="ID"
            labelCol={{ span: 24 }} //whole column
            name="_id"
          >
            <Input />
          </Form.Item>

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
            label="Email"
            labelCol={{ span: 24 }} //whole column
            name="email"
          >
            <Input disabled/>
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

export default UserModalUpdate;

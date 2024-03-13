import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, theme } from 'antd';

// http://localhost:8080/api/v1/user?current=1&pageSize=2&fullName=/abc/i

const InputSearch = (props) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    
    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    // values gồm 3 giá trị: fullName, email, phone
    const onFinish = (values) => {
        let query = ``;
        if(values.fullName) {
            query += `&fullName=/${values.fullName}/i`
        }
        if(values.email) {
            query += `&fullName=/${values.email}/i`
        }
        if(values.phone) {
            query += `&fullName=/${values.phone}/i`
        }
        if(props) {
            props.handleSearch(query);
        }
        
    };

    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`fullName`}
                        label={`Name`}
                    >
                        <Input placeholder="Nhập tên" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`email`}
                        label={`Email`}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`phone`}
                        label={`Số điện thoại`}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        Clear
                    </Button>
                    {/* <a
                        style={{ fontSize: 12 }}
                        onClick={() => {
                            setExpand(!expand);
                        }}
                    >
                        {expand ? <UpOutlined /> : <DownOutlined />} Collapse
                    </a> */}
                </Col>
            </Row>
        </Form>
    );
};

// https://stackblitz.com/run?file=demo.tsx
// https://ant.design/components/form

// const InputSearch = () => {
//     return (
//         <div>
//             <Inu />
//         </div>
//     );
// };

export default InputSearch;
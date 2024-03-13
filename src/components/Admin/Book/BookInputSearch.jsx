import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, theme } from 'antd';

// http://localhost:8080/api/v1/user?current=1&pageSize=2&fullName=/abc/i

const BookInputSearch = (props) => {
    const { token } = theme.useToken();
    
    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    const onFinish = (values) => {
        console.log(values);
        let query = ``;
        if(values.mainText) {
            query += `&mainText=/${values.mainText}/i`
        }
        if(values.author) {
            query += `&author=/${values.author}/i`
        }
        if(values.category) {
            query += `&category=/${values.category}/i`
        }
        if(props) {
            props.handleSearch(query);
        }
        
    };
    const [form] = Form.useForm();


    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`mainText`}
                        label={`Tên sách`}
                    >
                        <Input placeholder="Tên sách" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`author`}
                        label={`Tác giả`}
                    >
                        <Input placeholder="Tác giả" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        name={`category`}
                        label={`Thể loại`}
                    >
                        <Input placeholder="Thể loại" />
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

export default BookInputSearch;
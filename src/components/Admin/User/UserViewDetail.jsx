import React, { useState } from "react";
import { Drawer, Descriptions, Button } from 'antd';
import moment from 'moment';

const UserViewDetail = (props) => {
    
    const onClose = () => {
        props.setOpenViewDetail(false);
        props.setDataViewDetail(null);
    }

    console.log(props.dataViewDetail);
  
    return (
    <>
  
    <Drawer
        title = "Xem chi tiết"
        width = {"50vw"}
        open = {props.openViewDetail}
        onClose={onClose}
    >

      <Descriptions title="User Info" bordered
      column={2}>
        <Descriptions.Item label="Id">{props.dataViewDetail?._id}</Descriptions.Item>
        <Descriptions.Item label="Telephone">{props.dataViewDetail?.phone}</Descriptions.Item>
        <Descriptions.Item label="Email">{props.dataViewDetail?.email}</Descriptions.Item>
        <Descriptions.Item label="Name">{props.dataViewDetail?.fullName}</Descriptions.Item>
        <Descriptions.Item label="role" span ={2}>
        {props.dataViewDetail?.role}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
        {moment(props.dataViewDetail?.createdAt).format('DD-MM-YYYY-HH:mm:ss')}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
        {moment(props.dataViewDetail?.updatedAt).format('DD-MM-YYYY-HH:mm:ss')}
        </Descriptions.Item>
        
      </Descriptions>

      </Drawer>
      
    </>
  );
};

export default UserViewDetail;

import { callFetchHistory } from "../../services/api";
import { useEffect,useState } from "react";
import React from 'react';
import { Space, Table, Tag } from 'antd';
import './history.scss'
import JSONView from 'react-json-view';

const History = () => {

    useEffect(() => {
        fetchHistory();
    }, [])

    
    const[listHistory, setListHistory] = useState([]);

    // nếu có searchFilter thì sẽ cập nhật query
    const fetchHistory = async() => {
       
        const res = await callFetchHistory();
        if(res && res.data) {
            console.log(res.data);
            setListHistory(res.data);
            // setTotal(res.data.meta.total);
        }
    }

    // const columns = [
    //     {
    //         title: 'ID',
    //         dataIndex: '_id',
    //         // sorter: true,
    //         render: (text, record, index) => {
    //             console.log(record);
    //             return (
    //                 <a href='#' onClick={() => {
    //                     setDataViewDetail(record); // chứa toàn bộ thông tin người dùng
    //                     setOpenViewDetail(true);
    //                 }}> {record._id} </a>
    //             )
    //         }
    //     },
    //     {
    //         title: 'Tên hiển thị',
    //         dataIndex: 'fullName',
    //         sorter: true,
    //     },
    //     {
    //         title: 'Email',
    //         dataIndex: 'email',
    //         sorter: true
    //     },
    //     {
    //         title: 'Số điện thoại',
    //         dataIndex: 'phone',
    //         sorter: true
    //     },
    //     {
    //         title: 'Action',
    //         render: (text, record, index) => {
    //             return (
    //                 <> 
    //                 <div style={{display: 'flex', justifyContent: 'space-around'}} >
    //                 <Popconfirm
    //                 placement='leftTop'
    //                 title={"Xác nhận xóa người dùng"}
    //                 description= {"Bạn có chắc chắn muốn xóa người dùng này không ?"}
    //                 okText= "Xác nhận"
    //                 onConfirm={()=> handleDeleteUser(record._id)}
    //                 cancelText= "Hủy"
    //                 >
                    
    //                 <Button 
    //                 icon = {<DeleteTwoTone />} style={{twoToneColor: 'red', cursor: 'pointer', border: 'none'}}/>
    //                 </Popconfirm>
                    
    //                 <Button 
    //                 onClick={() => {
    //                     setDataUpdate(record);
    //                     setIsModalUpdateOpen(true)
    //                 }}
    //                 icon = {<EditTwoTone />} style={{color: 'red', border: 'none'}}/>
    //                 </div>

    //                 </>
                    
    //             )
    //         },
    //     },
    // ];

const columns = [
    {
                title: 'ID',
                dataIndex: '_id',
                // sorter: true,
             
    },
  {
    title: 'Thời gian',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'Tổng số tiền',
    dataIndex: 'totalPrice',
    key: 'totalPrice ',
  },
  {
    title: 'Trạng thái',
    key: 'tags',
    dataIndex: 'tags',
    render: () => (
      <>
            <Tag color= 'green' >
              Thành công
            </Tag>

      </>
    ),
  },
  {
    title: 'Chi tiết',
    render: (record) => {
                   
                    return (
                          <JSONView src={record.detail} />

                    )
                }
  },

//   {
//     title: 'Chi tiết',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
];





    return (
        <div className="history-layout"> 

            <h2> Lịch sử đặt hàng</h2>
            <Table columns={columns} dataSource={listHistory} />
        </div>

    )
}

export default History
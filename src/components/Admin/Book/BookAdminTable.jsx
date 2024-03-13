import React,  { useState, useEffect } from 'react';
import { Table, Row, Col, Button, Popconfirm,message, notification } from 'antd';
import BookInputSearch from './BookInputSearch';
import { callDeleteBook, callDeleteUser, callFetchListBook } from '../../../services/api';
import BookViewDetail from './BookViewDetail';
import { CloudUploadOutlined, DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import BookModalCreate from './BookModalCreate';
// import UserImport from './data/UserImport';
import * as XLSX from 'xlsx';
import BookModalUpdate from './BookModalUpdate';

// https://stackblitz.com/run?file=demo.tsx
const BookAdminTable = () => {
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [isModalBookOpen, setIsModalBOpen] = useState(false);
    
    const[listBook, setListBook] = useState([]);
    const[current, setCurrent] = useState([1]);
    const[pageSize, setPageSize] = useState([2]);
    const[total, setTotal] = useState([0]);
    
    const [filter,setFilter] = useState(""); // tìm kiếm
    const [sortQuery, setSortQuery] = useState(""); // sort bảng

    const[dataViewDetail, setDataViewDetail] = useState([]);
    const[openViewDetail, setOpenViewDetail] = useState(false);

    const[dataUpdate, setDataUpdate] = useState([]);
    const[openModalUpdate, setOpenModalUpdate] = useState(false);

    // đặt lại giá trị current và pageSize mỗi khi chuyển trang
   useEffect(() => {
        fetchBook();
    }, [current, pageSize, filter, sortQuery])

    // nếu có searchFilter thì sẽ cập nhật query
    const fetchBook = async() => {
        let query = `current=${current}&pageSize=${pageSize}`;
        if(filter) {
            query += `${filter}`
        }
        if(sortQuery) {
            query +=`&${sortQuery}`
        }

        const res = await callFetchListBook(query);
        if(res && res.data) {
            setListBook(res.data.result);
            setTotal(res.data.meta.total);
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            // sorter: true,
            render: (text, record, index) => {
                console.log(record);
                return (
                    <a href='#' onClick={() => {
                        setDataViewDetail({record}); // chứa toàn bộ thông tin sách
                        setOpenViewDetail(true);
                    }}> {record._id} </a>
                )
            }
        },
        {
            title: 'Tên sách',
            dataIndex: 'mainText',
            sorter: true
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            sorter: true
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            sorter: true
        },
        {
            title: 'Giá hiển thị',
            dataIndex: 'price',
            sorter: true
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            sorter: true
        },
        
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <> 
                    <div style={{display: 'flex', justifyContent: 'space-around'}} >
                    <Popconfirm
                    placement='leftTop'
                    title={"Xác nhận xóa mặt hàng"}
                    description= {"Bạn có chắc chắn muốn xóa mặt hàng này không ?"}
                    okText= "Xác nhận"
                    onConfirm={()=> handleDeleteBook(record._id)}
                    cancelText= "Hủy"
                    >
                    
                    <Button 
                    icon = {<DeleteTwoTone />} style={{twoToneColor: 'red', cursor: 'pointer', border: 'none'}}/>
                    </Popconfirm>
                    
                    <Button 
                    onClick={() => {
                        setDataUpdate(record);
                        setOpenModalUpdate(true)
                    }}
                    icon = {<EditTwoTone />} style={{color: 'red', border: 'none'}}/>
                    </div>

                    </>
                    
                )
            },
        },
    ];

    const handleDeleteBook = async(_id) => {
        const res = await callDeleteBook(_id);
        if(res && res.data) {
            message.success("Xóa thành công");
            fetchBook();
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            })
        }
    }

    const onChange = (pagination, filters, sorter, extra) => {
        if(pagination.current != current){
            setCurrent(pagination.current);
        }
        if(pagination.pageSize != pageSize){
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
        if(sorter && sorter.field) {
            const sq = sorter.order === 'ascend'?`sort=${sorter.field}`: `sort =-${sorter.field}`;
            setSortQuery(sq);
        }
        // console.log('params', pagination, filters, sorter, extra);
    };

    // https://stackoverflow.com/questions/70871254/how-can-i-export-a-json-object-to-excel-using-nextjs-react
    const handleExportData = () => {
        const worksheet = XLSX.utils.json_to_sheet(listBook);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "DataSheet.xlsx");
    }

    const renderHeader = () => {
        return(
            <>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span> Table List User </span>
            <span style ={{display: 'flex', gap: 15 }}>
            <Button onClick={() => {
                handleExportData()
            }} type="primary" icon={<ExportOutlined />}>
            
            Export

            </Button>
            <Button onClick={() => setIsModalBookOpen(true)} type="primary" icon={<CloudUploadOutlined />}>
            Import
            </Button>
            <Button type="primary" icon={<PlusOutlined />} 
            onClick={() =>  setOpenModalCreate(true)}>
            Thêm mới
            </Button>
            <Button type="ghost" onClick={() => {
                setFilter("");
                setSortQuery("");
            }}>
            <ReloadOutlined/>
            </Button>
            </span>
            </div>
            </>
        )
    }
    const handleSearch = (query) => {
        setFilter(query);
    }

   
    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <BookInputSearch handleSearch= {handleSearch} />
                </Col>
                <Col span={24}>
                    <Table
                        title = {renderHeader}
                        className='def'
                        columns={columns}
                        dataSource={listBook}
                        onChange={onChange}
                        rowKey="_id"
                        pagination = {
                            {current: current, 
                            pageSize: pageSize,
                            total: total, 
                            showTotal: (total, range) =>
                            { return (<div> {range[0]}-{range[1]} trên {total} sản phẩm</div>) },
                            showSizeChanger: true} 
                        }

                    />
                </Col>
                
            </Row>
            <BookModalUpdate
            openModalUpdate={openModalUpdate}
            setOpenModalUpdate={setOpenModalUpdate}
            setDataUpdate= {setDataUpdate}
            dataUpdate = {dataUpdate}
            fetchBook= {fetchBook}

            />

            <BookViewDetail
                openViewDetail ={openViewDetail}
                setOpenViewDetail ={setOpenViewDetail}
                dataViewDetail ={dataViewDetail}
                setDataViewDetail ={setDataViewDetail}
                
            />
            
            <BookModalCreate
            openModalCreate={openModalCreate}
            setOpenModalCreate={setOpenModalCreate}
            fetchBook= {fetchBook}

            />

            {/* <UserImport
            isModalUserOpen={isModalUserOpen}
            setIsModalUserOpen={setIsModalUserOpen}
            /> */}

         

        </>
    )
}


export default BookAdminTable;
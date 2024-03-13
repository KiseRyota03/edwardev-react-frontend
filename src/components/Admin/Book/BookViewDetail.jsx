import { Badge, Descriptions, Divider, Drawer, Modal, Upload } from "antd";
import moment from 'moment';
// import { FORMAT_DATE_DISPLAY } from "../../../utils/constant";
// FORMAT_DATE_DISPLAY = 'DD-MM-YYYY HH:mm:ss'
import { useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';


const BookViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }
    console.log(dataViewDetail?.record?.thumbnail);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    
    useEffect(() => {
        if(dataViewDetail) {
            let imgThumbnail = {}, imgSlider = []; // nhiều slider, 1 thumbnail
            if(dataViewDetail?.record?.thumbnail) {
                imgThumbnail = {
                    uid: uuidv4(),
                    name: dataViewDetail?.record?.thumbnail,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataViewDetail?.record?.thumbnail}`
                }
            }
            if(dataViewDetail?.record?.slider && dataViewDetail?.record?.slider.length >0) {
                dataViewDetail?.record?.slider.map(item => {
                    imgSlider.push({
                        uid: uuidv4(),
                        name: item,
                        status: 'done',
                        url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`
                    })
                })
            }
            setFileList([imgThumbnail, ...imgSlider])
        }
    }, [dataViewDetail]);


    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });


    // const [fileList, setFileList] = useState([
    //     {
    //         uid: '-1',
    //         name: 'image.png',
    //         status: 'done',
    //         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //     },
    //     {
    //         uid: '-2',
    //         name: 'image.png',
    //         status: 'done',
    //         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //     },
    //     {
    //         uid: '-3',
    //         name: 'image.png',
    //         status: 'done',
    //         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //     },
    //     {
    //         uid: '-4',
    //         name: 'image.png',
    //         status: 'done',
    //         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //     }
    // ]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || (file.preview));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    }




    return (
        <>
            <Drawer
                title="Chức năng xem chi tiết"
                width={"50vw"}
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions
                    title="Thông tin Book"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataViewDetail?.record?._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên sách">{dataViewDetail?.record?.mainText}</Descriptions.Item>
                    <Descriptions.Item label="Tác giả">{dataViewDetail?.record?.author}</Descriptions.Item>
                    <Descriptions.Item label="Giá tiền">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataViewDetail?.record?.price ?? 0)}</Descriptions.Item>

                    <Descriptions.Item label="Thể loại" span={2}>
                        <Badge status="processing" text={dataViewDetail?.record?.category} />
                    </Descriptions.Item>

                    <Descriptions.Item label="Created At">
                    {moment(dataViewDetail?.record?.createdAt).format('DD-MM-YYYY-HH:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                    {moment(dataViewDetail?.record?.updatedAt).format('DD-MM-YYYY-HH:mm:ss')}
                    </Descriptions.Item>
                </Descriptions>
                <Divider orientation="left" > Ảnh Books </Divider>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    showUploadList={
                        { showRemoveIcon: false }
                    }
                >

                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Drawer>
        </>
    )
}
export default BookViewDetail;
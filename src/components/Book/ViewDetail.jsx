import { Row, Col, Rate, Divider, Button } from 'antd';
import './book.scss';
import { useLocation } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import { useRef, useState, useEffect } from 'react';
import ModalGallery from './ModalGallery';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { BsCartPlus } from 'react-icons/bs';
import BookLoader from './BookLoader';
import { fetchBookById } from '../../services/api';
import { doAddBookAction } from '../../redux/order/orderSlice';
import { useDispatch } from 'react-redux';

const ViewDetail = (props) => {
    const [dataBook, setDataBook] = useState();
    const dispatch = useDispatch();

    let location = useLocation();
    const [currentQuantity, setCurrentQuantity] = useState(1);

    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // book id

    useEffect(() => {
        fetchBook();
    }, [id])

    const handleChangeButton = (type) => {
        if(type == 'MINUS') {
            if(currentQuantity <= 1) return;
            setCurrentQuantity(currentQuantity-1);
        }
        if(type == 'PLUS') {
            if(currentQuantity > dataBook.quantity) return;
            setCurrentQuantity(currentQuantity+1);
        }
    }

    const handleChangeInput = (value) => {
        if(!isNaN(value)) { // not a number
            if(+value > 0 && +value < dataBook.quantity ) {
                setCurrentQuantity(+value);
            }
        } 
    }

    const fetchBook = async() => {
        const res = await fetchBookById(id);        
        if(res && res.data) {
            let raw = res.data;
            raw.items = getImages(raw);
            setDataBook(res.data);
        }
    
    }

    const getImages = (raw) => {
        const images = [];
        if(raw.thumbnail) {
            images.push(
                {
                original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                originalClass: "original-image",
                thumbnailClass: "thumbnail-image"
            },
            )
        }
        if(raw.slider) {
            raw.slider?.map(item => {
                images.push(
                    {
                    original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                    originalClass: "original-image",
                    thumbnailClass: "thumbnail-image"
                },
                )
            })
        }
        return images;
    }
    
    // const {dataBook} = props;

    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = dataBook?.items;

    const refGallery = useRef(null);

    console.log(dataBook);

    const handleOnClickImage = () => {
        //get current index onClick
        // alert(refGallery?.current?.getCurrentIndex());
        setIsOpenModalGallery(true);
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
        // refGallery?.current?.fullScreen()
    }
    
    // const images = [
    //     {
    //         original: 'https://picsum.photos/id/1018/1000/600/',
    //         thumbnail: 'https://picsum.photos/id/1018/250/150/',
    //         originalClass: "original-image",
    //         thumbnailClass: "thumbnail-image"
    //     },
    //     {
    //         original: 'https://picsum.photos/id/1015/1000/600/',
    //         thumbnail: 'https://picsum.photos/id/1015/250/150/',
    //         originalClass: "original-image",
    //         thumbnailClass: "thumbnail-image"
    //     },
    //     {
    //         original: 'https://picsum.photos/id/1019/1000/600/',
    //         thumbnail: 'https://picsum.photos/id/1019/250/150/',
    //         originalClass: "original-image",
    //         thumbnailClass: "thumbnail-image"
    //     },
    //     {
    //         original: 'https://picsum.photos/id/1018/1000/600/',
    //         thumbnail: 'https://picsum.photos/id/1018/250/150/',
    //         originalClass: "original-image",
    //         thumbnailClass: "thumbnail-image"
    //     },
    //     {
    //         original: 'https://picsum.photos/id/1015/1000/600/',
    //         thumbnail: 'https://picsum.photos/id/1015/250/150/',
    //         originalClass: "original-image",
    //         thumbnailClass: "thumbnail-image"
    //     },
    //     {
    //         original: 'https://picsum.photos/id/1019/1000/600/',
    //         thumbnail: 'https://picsum.photos/id/1019/250/150/',
    //         originalClass: "original-image",
    //         thumbnailClass: "thumbnail-image"
    //     },
    //     {
    //         original: 'https://picsum.photos/id/1018/1000/600/',
    //         thumbnail: 'https://picsum.photos/id/1018/250/150/',
    //         originalClass: "original-image",
    //         thumbnailClass: "thumbnail-image"
    //     },
    //     {
    //         original: 'https://picsum.photos/id/1015/1000/600/',
    //         thumbnail: 'https://picsum.photos/id/1015/250/150/',
    //         originalClass: "original-image",
    //         thumbnailClass: "thumbnail-image"
    //     },
    //     {
    //         original: 'https://picsum.photos/id/1019/1000/600/',
    //         thumbnail: 'https://picsum.photos/id/1019/250/150/',
    //         originalClass: "original-image",
    //         thumbnailClass: "thumbnail-image"
    //     },
    // ];


    const handleAddToCart = (quantity, book) => {
        dispatch(doAddBookAction({quantity, detail: book, _id: book._id}))
    }

    const onChange = (value) => {
        console.log('changed', value);
    };

    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className='view-detail-book' style={{ maxWidth: 1440, margin: '0 auto', minHeight: "calc(100vh - 150px)" }}>
                <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                    {dataBook && dataBook._id ? 
                    <Row gutter={[20, 20]}>
                        <Col md={10} sm={0} xs={0}>
                            <ImageGallery
                                ref={refGallery}
                                items={images}
                                showPlayButton={false} //hide play button
                                showFullscreenButton={false} //hide fullscreen button
                                renderLeftNav={() => <></>} //left arrow === <> </>
                                renderRightNav={() => <></>}//right arrow === <> </>
                                slideOnThumbnailOver={true}  //onHover => auto scroll images
                                onClick={() => handleOnClickImage()}
                            />
                        </Col>
                        <Col md={14} sm={24}>
                            <Col md={0} sm={24} xs={24}>
                                <ImageGallery
                                    ref={refGallery}
                                    items={images}
                                    showPlayButton={false} //hide play button
                                    showFullscreenButton={false} //hide fullscreen button
                                    renderLeftNav={() => <></>} //left arrow === <> </>
                                    renderRightNav={() => <></>}//right arrow === <> </>
                                    showThumbnails={false}
                                />
                            </Col>
                            <Col span={24}>
                                <div className='author'>Tác giả: <a href='#'> {dataBook?.author}</a> </div>
                                <div className='title'>{dataBook?.mainText}</div>
                                <div className='rating'>
                                    <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                                    <span className='sold'>
                                        <Divider type="vertical" />
                                        Đã bán {dataBook.sold}</span>
                                </div>
                                <div className='price'>
                                    <span className='currency'>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataBook.price)}
                                    </span>
                                </div>
                                <div className='delivery'>
                                    <div>
                                        <span className='left_side'>Vận chuyển</span>
                                        <span className='right_side'>Miễn phí vận chuyển</span>
                                    </div>
                                </div>
                                <div className='quantity'>
                                    <span className='left_side'>Số lượng</span>
                                    <span className='right_side'>
                                        <button onClick = {() => handleChangeButton('MINUS')}><MinusOutlined /></button>
                                        <input onChange={(event) => handleChangeInput(event.target.value)} value = {currentQuantity} />
                                        <button onClick = {() => handleChangeButton('PLUS')}><PlusOutlined /></button>
                                    </span>
                                </div>
                                <div className='buy'>
                                    <button className='cart' onClick={() => handleAddToCart(currentQuantity, dataBook)}>
                                        <BsCartPlus className='icon-cart' />
                                        <span>Thêm vào giỏ hàng</span>
                                    </button>
                                    <button className='now'>Mua ngay</button>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                    :
                    <BookLoader/> 
                    }
                </div>
            </div>
            <ModalGallery
                isOpen={isOpenModalGallery}
                setIsOpen={setIsOpenModalGallery}
                currentIndeex={currentIndex}
                items={images}
                title={"hardcode"}
            />
        </div>
    )
}

export default ViewDetail;
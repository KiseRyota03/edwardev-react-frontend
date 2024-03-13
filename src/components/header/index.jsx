import React, { useState } from 'react';
import { FaReact } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi';
import { VscSearchFuzzy } from 'react-icons/vsc';
import { Divider, Anchor, Badge, Drawer, message, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Popover } from 'antd';
import { useNavigate } from 'react-router';
import { callLogout } from '../../services/api';
import './header.scss';
import { doLogoutAction } from '../../redux/account/accountSlice';

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const navigate = useNavigate();
    const dispatch = useDispatch()



    const carts = useSelector(state => state.order.carts);

    console.log(carts);

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/')
        }
    }

    const redirectOrder = () => {
        navigate('/order');
    }

    const contentPopover = () => {
        return (
            <div className="pop-cart-body">
                <div className='pop-cart-content'>
                    {carts?.map((book,index)=> {
                        return(

                        <div className='book' key = {`book-${index}`}>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book.detail.thumbnail}`}/>
                            <div> {book.detail.mainText}</div>
                            <div className='book-price'> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.detail.price)}</div>
                            
                        </div>
                        )

                    })}

                   





                </div>
                <div className='pop-cart-footer'>

                    <button onClick={()=> redirectOrder()} >Xem giỏ hàng</button>
                </div>
            </div>
        )
    }
    
    let items = [
        {
            label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },
    ];

    if(user?.role === 'ADMIN') {
        // unshift = đẩy lên đầu tiên
        items.unshift({ 
            label: <a href ='/admin'> Trang quản trị</a>,
            key: 'admin',
        })
    }

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;

    console.log(user.fullName);
    return (
        <>
            <div className='header-container'>
                <header className="page-header">
                    <div className="page-header__top">
                        <div className="page-header__toggle" onClick={() => {
                            setOpenDrawer(true)
                        }}>☰</div>
                        <div className='page-header__logo'>
                            <span className='logo'>
                                <FaReact className='rotate icon-react' />
                                <VscSearchFuzzy className='icon-search' />
                            </span>
                            <input
                                className="input-search" type={'text'}
                                placeholder="Bạn tìm gì hôm nay"
                            />
                        </div>

                    </div>
                    <nav className="page-header__bottom">
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item">
                                <Popover
                                className='popover-carts'
                                placement = 'topRight'
                                rootClassName = 'popover-carts'
                                title = {"Sản phẩm mới thêm"}
                                content = {contentPopover}
                                arrow = {true}

                                >

                                <Badge
                                    count={carts?.length??0}
                                    size={"small"}
                                    showZero
                                >
                                    <FiShoppingCart className='icon-cart' />
                                </Badge>
                                </Popover>

                            </li>
                            <li className="navigation__item mobile"><Divider type='vertical' /></li>
                            <li className="navigation__item mobile">
                                {!isAuthenticated ?
                                    <span onClick={() => navigate('/login')}> Tài Khoản</span>
                                    :
                                    <Dropdown menu={{ items }} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                 <Avatar src={urlAvatar}/> 
                                                 {user?.fullName}
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                }
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            <Drawer
                title="Menu chức năng"
                placement="left"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
            >
                <p>Quản lý tài khoản</p>
                <Divider />

                <p>Đăng xuất</p>
                <Divider />
            </Drawer>
        </>
    )
};

export default Header;

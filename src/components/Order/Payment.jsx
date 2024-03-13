import { Col, Divider, InputNumber,Button , Mentions, Row, Input, Checkbox, Steps,Form, Empty, notification } from "antd";
import { DeleteOutlined, DeleteTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { doDeleteCartAcion, doUpdateCartAction, doPlaceOrderAction} from "../../redux/order/orderSlice";
import { useEffect, useState } from "react";
import ViewOrder from "./ViewOrder";
import { callPlaceOrder } from "../../services/api";

const Payment = (props) => {
    const carts = useSelector((state) => state.order.carts);
    const user = useSelector(state => state.account.user);
    const [form] = Form.useForm();

    const [isSubmit, setIsSubmit] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();

    const [checkedIndex, setCheckedIndex] = useState(-1); // -1 indicates none checked

   const handleCheckboxChange = (index) => {
    setCheckedIndex(index);
  };


    const onFinish = async(values) => {
      setIsSubmit(true)
      const detailOrder = carts.map(item => {
        return {
          bookName: item.detail.mainText,
          quantity: item.quantity,
          _id: item._id

        }
      })

      const data = {
          name: values.name,
          address: values.address,
          phone: values.phone,
          totalPrice: totalPrice,
          detail: detailOrder
      }

      const res = await callPlaceOrder(data);

      if(res && res.data) {
        alert('Đặt hàng thành công!');
        dispatch(doPlaceOrderAction());
        props.setCurrentStep(2);
      }
      else {
        notification.error({
          message: "Đã có lỗi xảy ra",
          description: res.message,
        })
      }
      setIsSubmit(false);
    }

 

  
    useEffect(()=> {
      if(carts && carts.length) {
          let res = 0;
          carts.map((book,index) => {
              res += book.quantity * book.detail.price;
          });
          setTotalPrice(res);
      }
      else {
          setTotalPrice(0);
      }
    }, [carts]);

    return (
<Row gutter={[20, 20]}>
    <Col md={18} xs={24}>
    {(carts.length === 0) 
  && 
  
  <div className="order-book-empty"> 
      <Empty description = 'Không có sản phẩm nào trong giỏ hàng'/>

  </div>

  }
      {carts.map((book, index) => {
        return (
          <div className="order-book" key={`book-${index}`}>
            <div className="book-content">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                  book.detail.thumbnail
                }`}
              />
              <div className="title">{book.detail.mainText}</div>
              <div className="price">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(book.detail.price)}
              </div>
            </div>

            <div className="action">
              <div className="quantity">
               Số lượng: {book.quantity}
              </div>
              <div className="sum">Tổng: {''}  
               {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(book.detail.price*book.quantity)}

               </div>

            </div>

          </div>
          


        );
      })}
    </Col>
    <Col md={6} xs={24}>
      <Form  layout="vertical" onFinish = {onFinish} variant="filled"
      form = {form}
      style={{ maxWidth: 600 }}>

      <Form.Item label="Tên người nhận"  name="name" rules={[{ required: true, message: 'Please input!' }]}>
      <Input />
      </Form.Item>

    <Form.Item 
      label="Số điện thoại"
      name="phone"
      rules={[{ required: true, message: 'Please input!' }]}
    >
      <InputNumber style={{ width: '100%' }} />
    </Form.Item>


    <Form.Item 
      labelCol={24}
      label="Địa chỉ"
      name="address"
      
      rules={[{ required: true, message: 'Please input!' }]}
    >
    
      <Input.TextArea />
    </Form.Item>

    <Form.Item
     label="Hình thức thanh toán"
     name="Hình thức thanh toán"
    >
  <Checkbox defaultChecked={true}  
  checked={checkedIndex === 1} 
  onChange={() => handleCheckboxChange(1)} 
  /> Thanh toán khi nhận hàng
    <br />
    <Checkbox 
     checked={checkedIndex === 2} 
     onChange={() => handleCheckboxChange(2)} 
    /> Thanh toán qua mã QR
  <br />
    <Checkbox 
     checked={checkedIndex === 3} 
     onChange={() => handleCheckboxChange(3)} 
    /> Thanh toán qua Momo
    </Form.Item>
 
  
    <Divider style={{ margin: "10px 0" }} />
        <div className="calculate">
          <span> Tổng tiền</span>
          <span className="sum-final"> 
          {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice)}
          </span>
        </div>
        <Divider style={{ margin: "10px 0" }} />
        {carts.length > 0 &&  
        <button disabled = {isSubmit}
         onClick = {() => form.submit() }
        >Mua Hàng ({carts.length})</button>
        }
        
    {/* <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item> */}
  </Form>
    </Col>
    
  </Row>
   

   )

}
export default Payment;

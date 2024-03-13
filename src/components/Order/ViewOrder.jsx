import { Col, Divider, InputNumber, Row, Steps, Empty } from "antd";
import { DeleteOutlined, DeleteTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { doDeleteCartAcion, doUpdateCartAction} from "../../redux/order/orderSlice";
import { useEffect, useState } from "react";

const ViewOrder = (props) => {
    const carts = useSelector((state) => state.order.carts);

    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
  
    const handleOnChangeInput = (value,book) => {
          if(!value || value < 1 ) return;
          if(!isNaN(value)) {
              dispatch(doUpdateCartAction({quantity: value, detail: book, _id: book._id}))
          }
      };

    const handleOnChangeStep = () => {
        props.setCurrentStep(1);
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
                <InputNumber onChange = {(value) => handleOnChangeInput(value,book)} value={book.quantity} />
              </div>
              <div className="sum">Tổng: {''}  
               {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(book.detail.price*book.quantity)}

               </div>
              <DeleteTwoTone
              style = {{cursor: 'pointer'}}
              onClick={()=> dispatch(doDeleteCartAcion({_id: book._id}))}
              twoToneColor='red'
              />
            </div>

          </div>
          


        );
      })}
    </Col>
    <Col md={6} xs={24}>
      <div className="order-sum">
        <div className="calculate">
          <span> Tạm tính</span>
          <span>    {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice)}
                </span>
        </div>
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

        {carts.length ===0 && <button disabled={true}>Mua Hàng</button>}
        {carts.length > 0 && <button onClick = {() => handleOnChangeStep()} >Mua Hàng ({carts.length})</button>
        }
        
      </div>
    </Col>
    
  </Row>
    )
    
}
export default ViewOrder;

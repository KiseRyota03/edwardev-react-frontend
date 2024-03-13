import { Col, Divider, InputNumber, Row, Steps, Empty,Button , Result } from "antd";
import "./order.scss";
import { SmileOutlined } from "@ant-design/icons";
import { DeleteOutlined, DeleteTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { doDeleteCartAcion, doUpdateCartAction} from "../../redux/order/orderSlice";
import { useEffect, useState } from "react";
import ViewOrder from "../../components/Order/ViewOrder";
import Payment from "../../components/Order/Payment";
import { useNavigate } from 'react-router-dom';

const Order = (props) => {

  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const navigateHistory = () => {
    navigate('/history');
  };

  return (
    <div style={{ background: "#efefef", padding: "20px 0" }}>
      <div
        className="order-container"
        style={{ maxWidth: 1440, margin: "0 auto" }}
      >
        <Row className='step-row' style={{ background: "white", padding: "20px 20px", margin: "20px 0px" }} >

         <Steps
    size="small"
    current={currentStep}
    items={[
      {
        title: 'Đơn hàng',
      },
      {
        title: 'Đặt hàng',
      },
      {
        title: 'Thanh toán',
      },
    ]}
  />
        </Row>
     
        {currentStep === 0 && 
        <ViewOrder setCurrentStep = {setCurrentStep}/>
        }
        {currentStep === 1 && 
        <Payment setCurrentStep = {setCurrentStep}/>
        }
        {currentStep === 2 && 
        <Result
        icon={<SmileOutlined />}
        title="Bạn đã đặt hàng thành công!"
        extra={<Button onclick = {navigateHistory()} type="primary">Xem đơn hàng</Button>}
        />
        }

    
        
      </div>
    </div>
  );
};

export default Order;

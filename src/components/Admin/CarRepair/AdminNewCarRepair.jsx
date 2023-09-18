import { Button, Form, Input, Select, InputNumber } from 'antd';
import axios from 'axios';
import { MainContext } from '../../../context/MainContext';
import React, { useState, useContext, useEffect } from 'react';
import { END_POINT } from '../../../utils/constant';
const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});
export default function AdminNewCarRepair({ onClose, refetchData }) {
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState({
    car: '',
    device: '',
    repairCar_type: '',
    note: '',
    price: 0
  });
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [listCar, setListCar] = useState([])
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  
  const acceptAddNewDepartment = async () => {
    setLoading(true);
    // setIsDisable(true);
    const submitFormData = new FormData();
    try {
      const response = await axios.post(
        `${END_POINT}/admin/carrepair/create`,{
          car: data.car,
          device: data.device,
          repairCar_type: data.repairCar_type,
          note: data.note === '' ? ' ' :data.note,
          price: data.price
        }, 
        {
          headers: { 'x-access-token': `${accessToken}` },
        }
      )
      if (response.status === 200) {
        alert('đã thêm thành công ');
      }
      setLoading(false);
      setIsDisable(false);
      refetchData();
      onClose();
    } catch (error) {
      setIsDisable(false);
      alert(error.response.data.message);
      setLoading(false);
      console.log("Error response: ", error.response.data);
    }
  };
  const getCarFromApi = async ()=>{
    try{
      const car = await axios({
        url:`${END_POINT}/admin/carrepair/carInfo/getInfoCar`,
        method:"get",
        headers: { 'x-access-token': `${accessToken}` },
      })
      setListCar(car.data.data)
    }
    catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    getCarFromApi()
  },[])
  return (
    <>
      <div className="fixed inset-0 bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center ">
        <div className="relative w-[700px] flex flex-col bg-white bg-opacity-100 p-6 rounded-xl gap-y-3 animate-modal_in">
          <span className="text-xl uppercase font-bold h-fit">
            Thêm sửa chữa mới
          </span>
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={acceptAddNewDepartment}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h1 className="uppercase"> Vui lòng nhập sửa chữa mới </h1>
            <Form.Item
              label="Xe"
              name="car"
              rules={[
                {
                  required: true,
                  message: 'Mời nhập tên partner',
                },
              ]}
            >
              <Select 
                onChange={(e) =>
                  setData({
                    ...data,
                    car: e
                  })
                } 
                placeholder="Chọn xe">
                {listCar.length > 0 && listCar.map((car) =>(
                  <Select.Option key={car.id} value={car.id}>{car.name}</Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Hạng mục sửa chữa"
              name="repairCar_type"
              rules={[
                {
                  required: true,
                  message: 'Mời chọn hạng mục',
                },
              ]}
            >
              <Select 
                onChange={(e) =>
                  setData({
                    ...data,
                    repairCar_type: e
                  })
                } 
                placeholder="Chọn hạng mục"
                >
                  <Select.Option value="Repair">Repair</Select.Option>
                  <Select.Option value="Replace">Replace</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Sản phẩm"
              name="device"
              rules={[
                {
                  required: true,
                  message: 'Mời chọn sản phẩm',
                },
              ]}
            >
              <Select 
                onChange={(e) =>
                  setData({
                    ...data,
                    device: e
                  })
                } 
                placeholder="Chọn sản phẩm"
                >
                  <Select.Option value="Shell">Shell</Select.Option>
                  <Select.Option value="Battery">Battery</Select.Option>
                  <Select.Option value="Oil">Oil</Select.Option>
                  <Select.Option value="Tire">Tire</Select.Option>
                  <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Ghi chú"
              name="note"
              rules={[
                {
                  message: 'Mời nhập tên partner',
                },
              ]}
            >
              <Input
                value={data.note}
                onChange={(e) => {
                  setData({
                    ...data,
                    note: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Mời nhập số tiền',
                },
              ]}
            >
              <Input
                type='number'
                value={data.price}
                onChange={(e) => {
                  setData({
                    ...data,
                    price: parseInt(e.target.value) ,
                  });
                }}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 13,
                span: 16,
              }}
            >
              <Button
                loading={loading}
                // onClick={submitData}
                type="primary"
                htmlType="submit"
                className="  bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-2 rounded-lg hover:opacity-80"
              >
                Submit
              </Button>
              <Button
                disabled={isDisable}
                onClick={onClose}
                type="primary"
                htmlType=""
                className={
                  !isDisable &&
                  ' bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 rounded-lg hover:opacity-80'
                }
              >
                Hủy
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

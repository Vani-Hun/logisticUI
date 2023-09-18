import { Button, Form, Input, Select, InputNumber } from 'antd';
import axios from 'axios';
import { MainContext } from '../../../context/MainContext';
import React, { useState, useContext, useEffect } from 'react';
import { END_POINT } from '../../../utils/constant';
const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});
export default function AdminEditCarRepair({ onClose, data, refetchData }) {
  const { accessToken } = useContext(MainContext);
  const [dataEdit, setDataEdit] = useState(data);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [listCar, setListCar] = useState([])
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  console.log(dataEdit);
  const acceptEditNewDepartment = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${END_POINT}/admin/carrepair/${data._id}`,{
          car: dataEdit.car,
          device: dataEdit.device,
          repairCar_type: dataEdit.repairCar_type,
          note: dataEdit.note === '' ? ' ' :dataEdit.note,
          price: dataEdit.price
        }, 
        {
          headers: { 'x-access-token': `${accessToken}` },
        }
      )
      if (response.status === 200) {
        alert('đã sửa thành công ');
      }
      setLoading(false);
      setIsDisable(false);
      refetchData();
      onClose();
    } catch (error) {
      setIsDisable(false);
      alert(error.response.dataEdit.message);
      setLoading(false);
      console.log("Error response: ", error.response.dataEdit);
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
            Cập nhật sửa chữa
          </span>
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={acceptEditNewDepartment}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={dataEdit}
          >
            <h1 className="uppercase"> Vui lòng nhập chỉnh sửa </h1>
            <Form.Item
              label="Xe"
              name="car.plate"
              rules={[
                {
                  message: 'Mời nhập tên partner',
                },
              ]}
            >
              <Select 
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    car: e
                  })
                } 
                defaultValue={dataEdit.car._id}
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
                  setDataEdit({
                    ...dataEdit,
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
                  setDataEdit({
                    ...dataEdit,
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
                value={dataEdit.note}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
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
                value={dataEdit.price}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
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

import React from 'react'
import 'antd/dist/antd.css'
import { Form, Button, Input, Select, Typography, message } from "antd";
import styled from 'styled-components';
import * as axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/MainContext';
import { END_POINT } from '../../utils/constant';

const RegisForm = styled.div`
.Regis{
    display: flex;
    flex-direction:row;
    @media (max-width: 768px) {
      flex-direction: column;
    }
    @media (max-height: 628px) {
      flex-direction: column;
    }
}
.Regis-header{
    max-width: 500px;
    width: 100%;
    background-color: #fff;
    padding: 25px 30px;
    margin-top: 10px;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.15);
    overflow:auto;
}
.ant-typography{
    font-size: 45px;
    font-weight: 500;
    position: relative;
}
.ant-input-affix-wrapper {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
}
.sign{
    text-align:right;
}`
const ButtonContainer = styled.div`
.ant-btn-primary {
    height: 100%;
    width: 100%;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #FBAB7E;
    &:hover{
        background-color: #FBAB7E;
        background-image: linear-gradient(250deg, #e3ed1f 0%, #F7CE68 100%);
    }
}`;


const { Title } = Typography;

function Staff_Register() {
  const [form] = Form.useForm();

  const success = () => {
    message.success({
      content: 'Thêm nhân viên mới thành công',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  const failed400 = () => {
    message.error({
      content: 'Email hoặc số điện thoại đã tồn tại',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  const failed500 = () => {
    message.error({
      content: 'Lỗi hệ thống',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  
  let email = Form.useWatch('email', form);
  let address = Form.useWatch('address', form);
  let phone = Form.useWatch('phone', form);
  let name = Form.useWatch('name', form);
  let password = Form.useWatch('password', form);
  let staff_type = Form.useWatch('staff_type', form);
  let staff_position = Form.useWatch('staff_position', form);
  let department = Form.useWatch('department', form);
  let car_fleet = Form.useWatch('car_fleet', form);
  let post_office = Form.useWatch('post_office', form);

  const {accessToken} = useContext(MainContext);
  const onFinish = async() => {
    try{
      const response = await axios({
        method: 'post',
        url: `${END_POINT}/admin/auth/register`,
        headers: { 'x-access-token': `${accessToken}` },
        data: {
          name: name,
          address: address,
          email: email,
          password: password,
          phone: phone,
          staff_type: staff_type,
          staff_position: staff_position,
          department: department,
          car_fleet: car_fleet,
          postOfficeCode: post_office
        }
      });
      success();
    } catch(error){
      if(error.message == "Request failed with status code 400") {
        failed400();
      }
      if(error.message == "Request failed with status code 500") {
        failed500();
      }
    }
  };

  const [data, setData] = useState({
    postOffice: [], carFleet: [], department: []
  })

  const getDataFromApi = async ()=>{
    try{
      const postOffice = await axios({
        url:`${END_POINT}/admin/post-office`,
        method:"get",
        headers: { 'x-access-token': `${accessToken}` },
      })
      const carFleet = await axios({
        url:`${END_POINT}/admin/carFleet`,
        method:"get",
        headers: { 'x-access-token': `${accessToken}` },
      })
      const department = await axios({
        url:`${END_POINT}/department`,
        method:"get",
        headers: { 'x-access-token': `${accessToken}` },
      })
      setData({
        postOffice: postOffice.data.data, 
        carFleet: carFleet.data.data, 
        department: department.data.data.department
      })
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    getDataFromApi()
  },[])

  return (
    <RegisForm>
        <div className="Regis">
          <div className="Regis-header">
            <Form
                form ={form}
                autoComplete="off"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                onFinish={(onFinish)}
                onFinishFailed={(error) => {
                  console.log({ error });
                } }
            >
                <Title level={2} className="text-center">
                    Thêm nhân viên mới
                </Title>

                <Form.Item
                    name="name"
                    label="Tên tài khoản"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên tài khoản",
                      },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Nhập tên tài khoản" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    type="email"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email",
                      },                  
                    ]}
                    hasFeedback
                    >
                    <Input placeholder="Nhập email" />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },                  
                    ]}
                    hasFeedback
                    >
                    <Input placeholder="Nhập số điện thoại" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu",
                        },
                        { 
                          min: 6,
                          message: "Mật khẩu phải dài hơn 6 chữ số",
                        },
                        {
                          max: 24,
                          message: "Mật khẩu chỉ được tối đa 24 chữ số",
                        },
                    ]}
                    hasFeedback
                >
                  <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Form.Item 
                  name="staff_type" 
                  label="Nhân viên"
                  rules={[
                    {
                      required: true,
                      message: "Xin vui lòng chọn kiểu nhân viên",
                    },
                  ]}
                  hasFeedback
                >
                  <Select placeholder="Chọn kiểu nhân viên">
                    <Select.Option value="marketing">Marketing</Select.Option>
                    <Select.Option value="sales">Sales</Select.Option>
                    <Select.Option value="it">IT</Select.Option>
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="driver">Driver</Select.Option>
                    <Select.Option value="shipper">Shipper</Select.Option>
                    <Select.Option value="storekeeper">Storekeeper</Select.Option>
                    <Select.Option value="staff">Staff</Select.Option>
                    <Select.Option value="warehouse_accountant">Warehouse Accountant</Select.Option>
                    <Select.Option value="general_accounting">General Accounting</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item 
                  name="staff_position" 
                  label="Vị trí"
                  rules={[
                    {
                      required: true,
                      message: "Xin vui lòng chọn vị trí nhân viên",
                    },
                  ]}
                  hasFeedback
                >
                  <Select placeholder="Chọn vị trí nhân viên">
                    <Select.Option value="Intern">Intern</Select.Option>
                    <Select.Option value="Junior">Junior</Select.Option>
                    <Select.Option value="Senior">Senior</Select.Option>
                    <Select.Option value="Contributor">Contributor</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item 
                  name="department" 
                  label="Phòng ban"
                  rules={[
                    {
                      message: "Xin vui lòng chọn phòng ban",
                    },
                  ]}
                  hasFeedback
                >
                  <Select placeholder="Chọn phòng ban">
                    {data.department.length > 0 && data.department.map((dep) =>(
                      <Select.Option value={dep._id}>{dep.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item 
                  name="car_fleet" 
                  label="Đội xe"
                  rules={[
                    {
                      message: "Xin vui lòng chọn đội xe",
                    },
                  ]}
                  hasFeedback
                >
                  <Select placeholder="Chọn đội xe">
                    {data.carFleet.length > 0 && data.carFleet.map((car) =>(
                      <Select.Option value={car.id}>{car.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item 
                  name="post_office" 
                  label="Bưu cục"
                  rules={[
                    {
                      message: "Xin vui lòng chọn bưu cục",
                    },
                  ]}
                  hasFeedback
                >
                  <Select placeholder="Chọn bưu cục">
                    {data.postOffice.length > 0 && data.postOffice.map((post) =>(
                      <Select.Option value={post.code}>{post.name}</Select.Option>
                    ))}
                    {/* <Select.Option value="024AJ001">024AJ001</Select.Option>
                    <Select.Option value="028AA001">028AA001</Select.Option>
                    <Select.Option value="024AA001">024AA001</Select.Option>
                    <Select.Option value="024AC001">024AC001</Select.Option>
                    <Select.Option value="277AA001">277AA001</Select.Option>
                    <Select.Option value="219AA001">219AA001</Select.Option>
                    <Select.Option value="277AA002">277AA002</Select.Option>
                    <Select.Option value="206AA001">206AA001</Select.Option>
                    <Select.Option value="209AC001">209AC001</Select.Option>
                    <Select.Option value="207AB001">207AB001</Select.Option>
                    <Select.Option value="214AB001">214AB001</Select.Option>
                    <Select.Option value="215AE001">215AE001</Select.Option>
                    <Select.Option value="212AB001">212AB001</Select.Option>
                    <Select.Option value="213AI001">213AI001</Select.Option>
                    <Select.Option value="216AB001">216AB001</Select.Option>
                    <Select.Option value="218AC001">218AC001</Select.Option> */}
                  </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                    <ButtonContainer>
                        <Button block type="primary" htmlType="submit">
                            Đăng ký
                        </Button>
                    </ButtonContainer>
                </Form.Item>
              
            </Form>
          </div>
        </div>
    </RegisForm>
  );
}

export default Staff_Register;
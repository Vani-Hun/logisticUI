import { Button, Form, Input, Upload } from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { MainContext } from '../../../context/MainContext';
import React, { useState, useContext } from 'react';
import { END_POINT } from '../../../utils/constant';

export default function AdminNewObject({ onClose, refetchData }) {
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState({
    logo: '',
    name: '',
    description:'',
    name_detail:''
  });
  const [staffList, setStaffList] = useState([]);
  const [dataInput, setDataInput] = useState('');
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const acceptAddNewDepartment = async () => {
    setLoading(true);
    // setIsDisable(true);
    const submitFormData = new FormData();
    submitFormData.append('banner', data.logo);
    submitFormData.append('name', data.name);
    submitFormData.append('description', data.description);
    submitFormData.append('name_detail', data.name_detail);

    try {
      const response = await axios.post(
        `${END_POINT}/admin/participant`, submitFormData,
        {
          headers: { 'x-access-token': `${accessToken}` }
        }
      )
      if (response.status === 200) {
        alert('đã them thành công ');
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
 
  return (
    <>
      <div className="fixed inset-0 bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center ">
        <div className="relative w-[700px] flex flex-col bg-white bg-opacity-100 p-6 rounded-xl gap-y-3 animate-modal_in">
          <span className="text-xl uppercase font-bold h-fit">
            Thêm cam kết phụ
          </span>
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={
              {
                // remember: true,
              }
            }
            onFinish={acceptAddNewDepartment}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h1 className="uppercase"> Vui lòng nhập đối tượng mới </h1>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Mời nhập tên đối tượng',
                },
              ]}
            >
              <Input
                value={data.name}
                onChange={(e) => {
                  setData({
                    ...data,
                    name: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Name detail"
              name="name_detail"
              rules={[
                {
                  required: true,
                  message: 'Mời nhập name detail',
                },
              ]}
            >
              <Input
                value={data.name_detail}
                onChange={(e) => {
                  setData({
                    ...data,
                    name_detail: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[
                {
                  required: true,
                  message: 'Mời nhập mô tả',
                },
              ]}>
              <Input
                value={data.description}
                onChange={(e) => {
                  setData({
                    ...data,
                    description: e.target.value,
                  });
                }} />
            </Form.Item>
            <Form.Item
              name={'file'}
              label={'file'}
              rules={[
                {
                  required: true,
                  message: 'upload hình mới',
                },
              ]}
            >
              <input
                type="file"
                name="file"
                value={data.logo}
                onChange={(e) => {
                  setData({
                    ...data,
                    logo: e.target.files[0],
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

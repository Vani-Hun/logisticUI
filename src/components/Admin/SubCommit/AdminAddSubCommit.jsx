import { Button, Form, Input } from 'antd';
import axios from 'axios';

import { END_POINT } from '../../../utils/constant';
import React, { useContext, useState } from 'react';
import { MainContext } from '../../../context/MainContext';

export default function AdminAddSubCommit({ onClose, refetchData }) {
  const [data, setData] = useState({
    name: '',
    description: '',
    logo: '',
  });

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
const {accessToken} = useContext(MainContext);
  const acceptAddNewDepartment = async () => {
    setLoading(true);
    const submitFormData = new FormData();
    submitFormData.append('name', data.name);
    submitFormData.append('description', data.description);
    submitFormData.append('logo', data.logo);
    console.log(submitFormData);
    try {
      const response = await axios({
        method: 'post',
        url: `${END_POINT}/admin/sub-commitment`,
        data: submitFormData,
        headers: { 'Content-Type': 'multipart/form-data',
        'x-access-token': `${accessToken}`,
        },
      });
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
      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center ">
        <div className="relative w-[700px] flex flex-col bg-white bg-opacity-100 p-6 rounded-xl gap-y-3 animate-modal_in">
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
            autoComplete="off"
          >
            <h1 className="uppercase"> VUI LÒNG nhập commit mới </h1>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Mời nhập tiêu đề',
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
              label="Detail"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Mời nhập chi tiết',
                },
              ]}
            >
              <Input
                value={data.description}
                onChange={(e) => {
                  setData({
                    ...data,
                    description: e.target.value,
                  });
                }}
              />
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
                  'bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 rounded-lg hover:opacity-80'
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

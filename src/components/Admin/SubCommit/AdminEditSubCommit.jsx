import { Button, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import React from 'react';
import { END_POINT } from '../../../utils/constant';
import { useState } from 'react';
import { useContext } from 'react';
import { MainContext } from '../../../context/MainContext';

export default function AdminEditSubCommit({ onClose, data, refetchData }) {
   const { accessToken } = useContext(MainContext);
  const [dataEdit, setDataEdit] = useState(data);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  console.log(dataEdit);
  const acceptEditDepartment = async () => {
    setLoading(true);

    try {
      if(dataEdit.name !== data.name || dataEdit.description !== data.description){
        let response = await axios({
          method: 'put',
          url: `${END_POINT}/admin/sub-commitment/${data._id}`,
          data: {name: dataEdit.name, description: dataEdit.description},
          headers: {
            'x-access-token': `${accessToken}`
          },
        });
        if (response.status === 200) {
          alert('cập nhật thành công ');
        }
      }
      if(dataEdit.logo !== data.logo){
        let response = await axios({
          method: 'put',
          url: `${END_POINT}/admin/sub-commitment/logo/${data._id}`,
          data: {logo: dataEdit.logo},
          headers: {
            'x-access-token': `${accessToken}`
          },
        });
        if (response.status === 200) {
          alert('cập nhật thành công ');
        }
      }
      setLoading(false);
      refetchData();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
            onFinish={acceptEditDepartment}
            initialValues={dataEdit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h1 className="uppercase"> Vui Lòng nhập chỉnh sửa commit </h1>

            <Form.Item label="Name" name="name">
              <Input value={dataEdit.name} 
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    name: e.target.value,
                  })
                }/>
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  message: 'Mời nhập chi tiết ',
                },
              ]}
            >
              <Input
                value={dataEdit.description}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    description: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              name={'file'}
              label={'file'}
              rules={[
                {
                  message: 'upload hình mới',
                },
              ]}
            >
              <input
                type="file"
                name="file"
                value={dataEdit.logo}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
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
                type="primary"
                htmlType="submit"
                loading={loading}
                className="  bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-2 rounded-lg hover:opacity-80"
              >
                Submit
              </Button>
              <Button
                onClick={onClose}
                disabled={isDisable}
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

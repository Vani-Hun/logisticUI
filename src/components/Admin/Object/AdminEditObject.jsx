import { Button, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { END_POINT } from '../../../utils/constant';
import React, { useContext, useState } from 'react';
import { MainContext } from '../../../context/MainContext';
export default function AdminEditObject({ onClose, data, refetchData }) {
  const [dataEdit, setDataEdit] = useState(data);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const { accessToken } = useContext(MainContext);

  console.log('data là', dataEdit);
  const acceptEditDepartment = async () => {
    setLoading(true);
    console.log("Data edit: ", dataEdit)
    try {
      var res, res1;
      if(dataEdit.name !== data.name || dataEdit.description !== data.description || dataEdit.name_detail !== data.name_detail){
        console.log('sửa thông tin');
        res = await axios({
          url: `${END_POINT}/admin/participant/${data._id}`,
          method: 'put',
          data: {name: dataEdit.name, description: dataEdit.description, name_detail:dataEdit.name_detail},
          headers: {
            'x-access-token': `${accessToken}`
          },
        });
        if (res.status === 200 ) {
          alert('đã sửa thành công ');
        }
      }
      if(dataEdit.logo !== data.logo){
        res1 = await axios({
          method: 'put',
          url: `${END_POINT}/admin/participant/banner/${data._id}`,
          data: {banner: dataEdit.logo},
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': `${accessToken}`
          },
        });
        if (res1.status === 200 ) {
          alert('đã sửa thành công ');
        }
      }
      setLoading(false);
      refetchData();
      onClose();
    } catch (error) {
      console.log(error);
      setLoading(false);
      refetchData();
      onClose();
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
            onFinish={acceptEditDepartment}
            initialValues={dataEdit}
            autoComplete="off"
          >
            <h1 className="uppercase"> Vui lòng nhập chỉnh sửa đối tượng </h1>

            <Form.Item label="Name" name="name">
              <Input
                value={dataEdit.name}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    name: e.target.value,
                  });
                }} />
            </Form.Item>
            <Form.Item label="Name detail" name="name_detail">
              <Input
                value={dataEdit.name_detail}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    name_detail: e.target.value,
                  });
                }} />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input
                value='aaaaaaaaaaaaaaa'
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    description: e.target.value,
                  });
                }} />
            </Form.Item>

            <Form.Item
              name={'file'}
              label={'file'}
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
                loading={loading}
                htmlType="submit"
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

import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { END_POINT } from "../../../utils/constant";
import React, { useContext, useState } from "react";
import { MainContext } from "../../../context/MainContext";
export default function EditFeature({ onClose, data, refetchData }) {
  const [dataEdit, setDataEdit] = useState(data);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const { accessToken } = useContext(MainContext);
  
  const acceptEditParticipant = async () => {
    setLoading(true);
    let formEditData = new FormData();
    formEditData.append("name", dataEdit.name);
    formEditData.append("detail", dataEdit.detail);
  
    let logoEdit = new FormData();
      logoEdit.append("logo", dataEdit.logo);

    try {
      var res, res1;
      if(dataEdit.name !== data.name || dataEdit.detail !== data.detail){
        console.log('Form edit data: ', formEditData)
        res = await axios({
          url: `${END_POINT}/admin/feature/${data._id}`,
          method: "put",
          data: {name: dataEdit.name, detail: dataEdit.detail},
          // data: formEditData,
          headers: { 'x-access-token': `${accessToken}` },
        });
      }
      if(dataEdit.logo != data.logo){
        console.log('logo',logoEdit.get('logo'));
        res1 = await axios({
          url: `${END_POINT}/admin/feature/logo/${data._id}`,
          method: "put",
          data: logoEdit,
          headers: { 'x-access-token': `${accessToken}` },
        });
      }
      console.log(res, res1);
      if (res.status === 200||res1.status === 200) {
        alert("đã sửa thành công ");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    refetchData(); 
    onClose();
  };
  
  console.log("🚀 ~ file: EditFeature.jsx:9 ~ EditFeature ~ dataEdit:", dataEdit)
  
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
            onFinish={acceptEditParticipant}
            initialValues={dataEdit}
            autoComplete="off"
          >
            <h1 className="uppercase"> Vui lòng nhập chỉnh sửa tính năng </h1>

            <Form.Item label="Name" name="name">
              <Input
                value={dataEdit.name}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    name: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="Detail" name="detail"  className="">
              <Input
                className="h-10 "
                value={dataEdit.detail}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    detail: e.target.value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item label="Logo">
              <input
                type="file"
                name="file"
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
                className="rounded-lg mr-3"
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
                  "hover:bg-red-500 hover:border-red-700 hover:text-white rounded-lg"
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

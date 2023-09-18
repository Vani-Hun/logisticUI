import { Button, Form, Input, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { END_POINT } from "../../../utils/constant";
import React, { useContext, useState } from "react";
import { MainContext } from "../../../context/MainContext";
export default function EditQuote({ onClose, data, refetchData }) {
  const [dataEdit, setDataEdit] = useState(data);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const { accessToken } = useContext(MainContext);
  
  const acceptEditQuote = async () => {
    setLoading(true);
    let formEditData = new FormData();
    formEditData.append("name", dataEdit.name);
    formEditData.append("detail", dataEdit.detail);
  
    let avatarEdit = new FormData();
      avatarEdit.append("avatar", dataEdit.avatar);

    try {
      var res, res1;
      if(dataEdit.name !== data.name || dataEdit.description !== data.description || dataEdit.quote !== data.quote){
        console.log('Form edit data: ', formEditData)
        res = await axios({
          url: `${END_POINT}/admin/quote/${data._id}`,
          method: "put",
          data: {name: dataEdit.name, description: dataEdit.description, quote: dataEdit.quote},
          // data: formEditData,
          headers: { 'x-access-token': `${accessToken}` },
        });
      }
      if(dataEdit.avatar != data.avatar){
        console.log('avatar',avatarEdit.get('avatar'));
        res1 = await axios({
          url: `${END_POINT}/admin/quote/avatar/${data._id}`,
          method: "put",
          data: avatarEdit,
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
            onFinish={acceptEditQuote}
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
            <Form.Item label="Description" name="description"  className="">
              <Input
                className="h-10 "
                value={dataEdit.description}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    description: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="Quote" name="quote"  className="">
              <TextArea
                className="h-10 "
                value={dataEdit.quote}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    quote: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="Avatar">
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    avatar: e.target.files[0],
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
                onClick={acceptEditQuote}
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

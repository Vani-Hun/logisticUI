import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { END_POINT } from "../../../utils/constant";
import React, { useContext, useState } from "react";
import { MainContext } from "../../../context/MainContext";
export default function EditBannersService({ onClose, data }) {
  const [dataEdit, setDataEdit] = useState({
    logo: data.logo,
    sub_banner: data.sub_banner,
    quote_banner: data.quote_banner,
    banner: data.banner,
    bottom_banner: data.bottom_banner,
  });
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const { accessToken } = useContext(MainContext);

  const acceptEditBanners = async () => {
    setLoading(true);

    try {
      
      let logoEdit = new FormData();
      logoEdit.append("logo", dataEdit.logo);
      let subEdit = new FormData();
      subEdit.append("sub_banner", dataEdit.sub_banner);
      let quoteEdit = new FormData();
      quoteEdit.append("quote_banner", dataEdit.quote_banner);
      let topEdit = new FormData();
      topEdit.append("banner", dataEdit.banner);
      let bottomEdit = new FormData();
      bottomEdit.append("bottom_banner", dataEdit.bottom_banner);
      
      
        if(dataEdit.logo !== data.logo){
            const res = await axios({
                url: `${END_POINT}/admin/service/logo/${data._id}`,
                method: "post",
                data: logoEdit,
                headers: { 'x-access-token': `${accessToken}` },
            });
            if (res.status === 200) {
                // alert("đã them thành công ");
            }
        }
        if(dataEdit.sub_banner !== data.sub_banner){
            const res = await axios({
                url: `${END_POINT}/admin/service/subbanner/${data._id}`,
                method: "post",
                data: subEdit,
                headers: { 'x-access-token': `${accessToken}` },
            });
            if (res.status === 200) {
                // alert("đã them thành công ");
            }
        }
        if(dataEdit.quote_banner !== data.quote_banner){
            const res = await axios({
                url: `${END_POINT}/admin/service/quotebanner/${data._id}`,
                method: "post",
                data: quoteEdit,
                headers: { 'x-access-token': `${accessToken}` },
            });
            if (res.status === 200) {
                // alert("đã them thành công ");
            }
        }
        if(dataEdit.banner !== data.banner){
            const res = await axios({
                url: `${END_POINT}/admin/service/banner/${data._id}`,
                method: "post",
                data: topEdit,
                headers: { 'x-access-token': `${accessToken}` },
            });
            if (res.status === 200) {
                // alert("đã them thành công ");
            }
        }
        if(dataEdit.bottom_banner !== data.bottom_banner){
            const res = await axios({
                url: `${END_POINT}/admin/service/bottombanner/${data._id}`,
                method: "post",
                data: bottomEdit,
                headers: { 'x-access-token': `${accessToken}` },
            });
            if (res.status === 200) {
                // alert("đã them thành công ");
            }
        }
        
        setLoading(false);
        onClose();
    } catch (error) {
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
            onFinish={acceptEditBanners}
            initialValues={dataEdit}
            autoComplete="off"
          >
            <h1 className="uppercase"> Vui lòng chỉnh sửa service banners </h1>
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
            <Form.Item label="Sub Banner">
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    sub_banner: e.target.files[0],
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="Quote Banner">
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    quote_banner: e.target.files[0],
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="Top Banner">
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    banner: e.target.files[0],
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="Bottom">
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    bottom_banner: e.target.files[0],
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
                className="rounded-lg"
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

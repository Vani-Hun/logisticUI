import { Button, Form, Input } from "antd";
import axios from "axios";

import { END_POINT } from "../../../utils/constant";
import React, { useContext, useState } from "react";
import { MainContext } from "../../../context/MainContext";

function AddBannerLogo({ data, onClose, refetchData }) {
  const [dataBanner, setDataBanner] = useState();
  const [dataLogo, setDataLogo] = useState();

  const [loadingBanner, setLoadingBanner] = useState(false);
  const [loadingLogo, setLoadingLogo] = useState(false);
  const { accessToken } = useContext(MainContext);

  const uploadBanner = async (serviceID) => {
    setLoadingBanner(true);
    const submitFormDataBanner = new FormData();
    submitFormDataBanner.append("banner", dataBanner);
    try {
      await axios.post(
        `${END_POINT}/admin/service/banner/${data._id}`,
        submitFormDataBanner,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      setLoadingBanner(false);
      refetchData();
      alert("thêm mới banner thành công");
    } catch (error) {
      alert(error);
      setLoadingBanner(false);
      console.log(error);
    }
  };
  const uploadLogo = async (serviceID) => {
    setLoadingLogo(true);
    const submitFormDataLogo = new FormData();
    submitFormDataLogo.append("logo", dataLogo);
    try {
      await axios.post(
        `${END_POINT}/admin/service/logo/${data._id}`,
        submitFormDataLogo,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      setLoadingLogo(false);
      refetchData();
      alert("thêm mới logo thành công");
    } catch (error) {
      alert(error);
      setLoadingLogo(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center ">
        <div className="relative w-[700px] flex flex-col bg-white bg-opacity-100 p-6 rounded-xl gap-y-3 animate-modal_in">
          <div
            onClick={onClose}
            className="absolute top-[20px] right-[20px] text-[25px] cursor-pointer"
          >
            X
          </div>
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
            onFinish={uploadBanner}
            autoComplete="off"
          >
            <h1 className="uppercase"> Vui lòng thêm banner mới </h1>
            <Form.Item
              label="Banner"
              name="banner"
              rules={[
                {
                  required: true,
                  message: "Mời tải lên banner",
                },
              ]}
            >
              <Input
                type="file"
                value={dataBanner}
                onChange={(e) => {
                  setDataBanner(e.target.files[0]);
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
                loading={loadingBanner}
                type="primary"
                htmlType="submit"
                className="  bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-2 rounded-lg hover:opacity-80"
              >
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
          {/* ------- */}
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
            onFinish={uploadLogo}
            autoComplete="off"
          >
            <h1 className="uppercase"> Vui lòng thêm logo mới </h1>

            <Form.Item
              label="Logo"
              name="logo"
              rules={[
                {
                  required: true,
                  message: "Mời tải lên logo",
                },
              ]}
            >
              <Input
                type="file"
                value={dataLogo}
                onChange={(e) => {
                  setDataLogo(e.target.files[0]);
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
                loading={loadingLogo}
                type="primary"
                htmlType="submit"
                className="  bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-2 rounded-lg hover:opacity-80"
              >
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddBannerLogo;

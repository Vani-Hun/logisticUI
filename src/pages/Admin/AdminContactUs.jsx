import { Button, Checkbox, Form, Input, Upload } from "antd";
import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { TOKEN } from "./adminToken";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";
export default function AdminContactUs() {
  const { accessToken } = useContext(MainContext);
  const [contactState, setContactState] = useState({
    // address: "string",
    // phone: "phone",
    // email: "email@gmail.com",
    // facebook: "url",
    // instagram: "url",
    // tiktok: "url",
    // youtube: "url",
  });
  const [checkQR, setCheckQR] = useState(false)
  const [imageQR, setImageQR] = useState('')

  const callContactData = async () => {
    try {
      const result = await axios({
        url: `${END_POINT}/contactUs`,
        method: "get",
        headers: { authorization: `Bearer ${accessToken}` },
      });
      if (result.status === 200) {
        setContactState(result.data.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const postApi = async (values) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/contactUs/`,
        method: "post",
        headers: { authorization: `Bearer ${accessToken}` },
        data: values,
      });
      if (result.status === 200) {
        // setContactState(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postApiQR = async (data) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/contactus/qr`,
        method: "post",
        headers: { authorization: `Bearer ${accessToken}` },
        data: data,
      });
      if (result.status === 200) {
        // console.log("Post ảnh QR thành công !!!");
      }
    } catch (error) {
      console.log("Không thể post ảnh QR: ", error);
    }
  }

  useEffect(() => {
    callContactData();
  }, []);

  const onFinish = (values) => {
    alert("Thông tin được update");
    setContactState(values);
    postApi(values);
    let valueQR = new FormData();
    valueQR.append("QR_code", imageQR)
    postApiQR(valueQR)
    setTimeout(callContactData(), 1000)
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
    alert("vui lòng kiểm tra lại thông tin ");
  };

  const changeQR = (e) => {
    const img = e.target.files[0];
    img.preview = URL.createObjectURL(img)
    setImageQR(img);
    setCheckQR(true)
  }


  // check validate phone number
  const validatePhoneNumber = (rule, value, callback) => {
    if (/^0[0-9]{9,10}$/.test(value)) {
      callback(); // Valid phone number
    } else {
      callback("Số điện thoại không hợp lệ.");
    }
  };

  // check validate email
  const validateEmail = (rule, value, callback) => {
    if (/^.+@.+\..+$/.test(value)) {
      callback(); // Valid email
    } else {
      callback("Email không hợp lệ");
    }
  };

  // check validate URL
  const validateUrl = (rule, value, callback) => {
    if (value === "" || /^(http|https):\/\/[^\s/$.?#].[^\s]*$/.test(value)) {
      callback(); // Valid URL or empty
    } else {
      callback("URL không hợp lệ");
    }
  };

  const renderInput = () => {
    const validateRules = {
      email: [{ required: true, message: "Vui lòng nhập email của bạn!" }, { validator: validateEmail }],
      phone: [{ required: true, message: "Vui lòng nhập số điện thoại của bạn!" }, { validator: validatePhoneNumber }],
      facebook: [{ required: false, message: "Vui lòng nhập đường dẫn facebook của bạn!", validator: validateUrl }],
      instagram: [{ required: false, message: "Vui lòng nhập đường dẫn instagram của bạn!", validator: validateUrl }],
    }

    let inputArray = [];
    for (let [key, datavalue] of Object.entries(contactState)) {
      inputArray.push(
        <>
          {key === "__v" || key === "_id" || key === "updatedAt" || key === "createdAt"
            ? <></>
            : key === "QR_code"
              ? <Form.Item
                style={{ fontWeight: "bold" }}
                key={key}
                label="QR CODE"
                name={key}
                initialValue={datavalue}
              >
                <input type='file' accept="image/*" onChange={changeQR} />
                <div className="flex align-center" style={{ width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
                  {imageQR !== "" ? (
                    <img src={imageQR.preview} alt={imageQR.name} />
                  ) : (<>
                    <img src={`${datavalue}`} alt={imageQR.name} />
                  </>)}
                </div>
              </Form.Item>
              : <Form.Item
                style={{ fontWeight: "bold" }}
                key={key}
                label={
                  key === "android_app" ? 'LINK ANDROID APP'
                    : key === "hr_mailbox" ? 'HR MAILBOX'
                      : key === "ios_app" ? 'LINK IOS APP'
                        : key.toUpperCase()}
                name={key}
                initialValue={datavalue}
                rules={[
                  {
                    required: false,
                    message: `mời nhập ${key}`,
                    type: key === "email" ? key : "string",
                  },
                ]}
              >
                <Input style={{ fontWeight: "500" }} />
              </Form.Item>
          }
        </>
      );
    }
    return inputArray;
  };
  return (
    <>
      <h1 className="mb-[38px]" style={{ margin: "auto", fontSize: "25px", fontWeight: "600", }}>Liên Hệ</h1>
      <Form
        name="basic"
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {renderInput()}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            style={{
              color: "",
            }}
            htmlType="submit"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
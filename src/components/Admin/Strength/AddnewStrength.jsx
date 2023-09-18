import { Button, Form, Input, Select } from "antd";
import axios from "axios";

import { END_POINT } from "../../../utils/constant";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../context/MainContext";
import TextArea from "antd/lib/input/TextArea";
import { Option } from "antd/lib/mentions";

export default function AddnewStrength({ onClose, refetchData }) {
    const [name, setname] = useState('')
    const [subname, setsubname] = useState('')
    const [detail, setdetail] = useState('')
    const [description, setDescription] = useState('')
    const [link, setlink] = useState('')
    const [logo, setlogo] = useState()

    const [loading, setLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const { accessToken } = useContext(MainContext);

    const acceptAddNewStrength = async () => {
        // console.log(serviceId)
        let submitFormData = new FormData();
        submitFormData.append("name", name);
        submitFormData.append("sub_name", subname);
        submitFormData.append("detail", detail);
        submitFormData.append("description", description);
        submitFormData.append("link", link);
        submitFormData.append("logo", logo);
        try {
            const response = await axios.post(
                `${END_POINT}/admin/strength/create`, submitFormData,
                {
                    headers: { 'x-access-token': `${accessToken}` }
                }
            )
            alert('đã thêm thành công ');

            setIsDisable(false);
            refetchData();
            onClose();
        } catch (error) {
            setIsDisable(false);
            console.log("Error response: ", error);

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
                        onFinish={acceptAddNewStrength}
                        autoComplete="off"
                    >
                        <h1 className="uppercase"> Vui lòng nhập new strength </h1>
                        <Form.Item
                            label="Tên "
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Mời nhập tên ",
                                },
                            ]}
                        >
                            <Input
                                value={name}
                                onChange={(e) => {
                                    setname(e.target.value);
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="sub name "
                            name="sub_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Mời nhập sub name ",
                                },
                            ]}
                        >
                            <Input
                                value={subname}
                                onChange={(e) => {
                                    setsubname(e.target.value);
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="detail "
                            name="detail"
                            rules={[
                                {
                                    required: true,
                                    message: "Mời nhập detail ",
                                },
                            ]}
                        >
                            <Input
                                value={detail}
                                onChange={(e) => {
                                    setdetail(e.target.value);
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Mời nhập mô tả",
                                },
                            ]}
                        >
                            <TextArea
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </Form.Item>


                        <Form.Item
                            label="link "
                            name="link"
                            rules={[
                                {
                                    required: true,
                                    message: "Mời nhập tên ",
                                },
                            ]}
                        >
                            <Input
                                value={link}
                                onChange={(e) => {
                                    setlink(e.target.value);
                                }}
                            />
                        </Form.Item>
                     


                        
               
                        <Form.Item
                            label="logo"
                            name="logo"
                            rules={[
                                {
                                    required: true,
                                    message: "Mời tải lên banner",
                                },
                            ]}
                        >
                            <Input
                                type="file"
                                value={logo}
                                onChange={(e) => {
                                    setlogo(e.target.files[0]);
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
                                Xác nhận
                            </Button>
                            <Button
                                disabled={isDisable}
                                onClick={onClose}
                                type="primary"
                                htmlType=""
                                className={
                                    !isDisable &&
                                    "bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 rounded-lg hover:opacity-80"
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

import { Button, Form, Input, Select } from "antd";
import axios from "axios";

import { END_POINT } from "../../../utils/constant";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../context/MainContext";
import TextArea from "antd/lib/input/TextArea";
import { Option } from "antd/lib/mentions";

export default function AddQuote({ onClose, onClick }) {
    const [nameQuote, setnameQuote] = useState('')
    const [description, setDescription] = useState('')
    const [quote, setQuote] = useState('')
    const [avatar, setAvatar] = useState()
    const [loading, setLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const { accessToken } = useContext(MainContext);

    const acceptAddNewDepartment = async () => {
        // console.log(serviceId)
        let formData = new FormData();
        formData.append("name", nameQuote);
        formData.append("avatar", avatar);
        formData.append("quote", quote);
        formData.append("description", description);
        onClick(formData);
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
                        <h1 className="uppercase"> Vui lòng nhập trích dẫn mới </h1>
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
                                value={nameQuote}
                                onChange={(e) => {
                                    setnameQuote(e.target.value);
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
                            label="Trích dẫn"
                            name="quote"
                            rules={[
                                {
                                    required: true,
                                    message: "Mời nhập Trích dẫn",
                                },
                            ]}
                        >
                            <Input
                                value={quote}
                                onChange={(e) => {
                                    setQuote(e.target.value);
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Avatar"
                            name="avatar"
                            rules={[
                                {
                                    required: true,
                                    message: "Mời tải lên banner",
                                },
                            ]}
                        >
                            <Input
                                type="file"
                                value={avatar}
                                onChange={(e) => {
                                    setAvatar(e.target.files[0]);
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

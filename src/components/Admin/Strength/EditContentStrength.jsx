import { Button, Form, Input, Select } from "antd";
import axios from "axios";

import { END_POINT } from "../../../utils/constant";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../context/MainContext";
import TextArea from "antd/lib/input/TextArea";
import { Option } from "antd/lib/mentions";

export default function EditContentStrength({ onClose, refetchData, dataEdit }) {
    const [name, setname] = useState(dataEdit?.name)
    const [subname, setsubname] = useState(dataEdit?.sub_name)
    const [detail, setdetail] = useState(dataEdit?.detail)
    const [description, setDescription] = useState(dataEdit?.description)
    const [link, setlink] = useState(dataEdit?.link)
    
    const [loading, setLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const { accessToken } = useContext(MainContext);
    console.log(dataEdit)
    const acceptAddNewStrength = async () => {
        // let submitFormData = new FormData();
        const submitFormData = new URLSearchParams();
        submitFormData.append("name", name);
        submitFormData.append("sub_name", subname);
        submitFormData.append("detail", detail);
        submitFormData.append("description", description);
        submitFormData.append("link", link);
        try {
            const response = await axios.put(
                `${END_POINT}/admin/strength/detail/${dataEdit._id}`, submitFormData,
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
                            // rules={  name.constructor === String &&name.length === 0 ? [
                            //     {
                            //         required: true,
                            //         message: "Mời nhập tên ",
                            //     },
                            // ] : []}
                        >
                        <Input
                            defaultValue={name}
                            onChange={(e) => {
                                setname(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="sub name "
                        name="sub_name"
                        // rules={subname.constructor === String && subname.length === 0 ? [
                        //     {
                        //         required: true,
                        //         message: "Mời nhập sub name ",
                        //     },
                        // ] : []}
                    >
                        <Input
                            defaultValue={subname}
                            onChange={(e) => {
                                setsubname(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="detail "
                        name="detail"

                        // rules={detail.constructor === String && detail.length === 0 ? [
                        //     {
                        //         required: true,
                        //         message: "Mời nhập detail ",

                        //     },
                        // ] : []}
                    >
                        <Input
                            defaultValue={detail}
                            onChange={(e) => {
                                setdetail(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"

                        // rules={description.constructor === String && description.length === 0 ? [
                        //     {
                        //         required: true,
                        //         message: "Mời nhập mô tả",

                        //     },
                        // ] : []}
                    >
                        <TextArea
                            defaultValue={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="link "
                        name="link"
                        // rules={link.constructor === String && link.length === 0 ? [
                        //     {
                        //         required: true,
                        //         message: "Mời nhập LINK",

                        //     },
                        // ] : []}
                    >
                        <Input
                            defaultValue={link}
                            onChange={(e) => {
                                setlink(e.target.value);
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
        </div >
        </>
    );
}

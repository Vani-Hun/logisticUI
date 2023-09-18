import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { MainContext } from '../../../context/MainContext';
import React, { useState, useContext, useEffect } from 'react';
import { END_POINT } from '../../../utils/constant';
import TextArea from 'antd/lib/input/TextArea';
import Item from 'antd/lib/list/Item';

export default function EditBottomPic({ onClose, refetchData, dataEdit, info }) {
    const { accessToken } = useContext(MainContext);


    const [nameOfinfor, setnameOfinfor] = useState(dataEdit.name)
    const [contentOfinfor, setcontentOfinfor] = useState(dataEdit.content)
    const [position, setposition] = useState(dataEdit.position)

    const [logo, setlogo] = useState(dataEdit.logo)
    const [imglogo, setimglogo] = useState()

    const [background, setbackground] = useState(dataEdit.background)
    const [imgbackground, setimgbackground] = useState()



    const [isDisable, setIsDisable] = useState(false);



    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    async function downloadAndConvertToBlobLogo(imgurl) {
        try {
            const response = await axios.get(imgurl, {
                responseType: "arraybuffer",
            });

            const blob = new Blob([response.data], { type: "image/jpeg" });

            // Create a File object from the Blob
            const file = new File([blob], "downloaded_image.jpg", { type: "image/jpeg" });
            setimglogo(file)

        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async function downloadAndConvertToBlobBack(imgurl) {
        try {
            const response = await axios.get(imgurl, {
                responseType: "arraybuffer",
            });

            const blob = new Blob([response.data], { type: "image/jpeg" });

            // Create a File object from the Blob
            const file = new File([blob], "downloaded_image.jpg", { type: "image/jpeg" });
            setimgbackground(file)

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const addnewinfor = async () => {
        // console.log(position)
        // console.log(contentOfinfor)
        // console.log(nameOfinfor)
        
        const submitFormData = new FormData();
        submitFormData.append('name', nameOfinfor);
        submitFormData.append('content', contentOfinfor);
        submitFormData.append('position', position);
        if (imglogo == undefined) {
            downloadAndConvertToBlobLogo(logo)
        }
        submitFormData.append('logo', imglogo);
        if (imgbackground == undefined) {
            downloadAndConvertToBlobBack(background)
        }
        submitFormData.append('background', imgbackground)
        let k = 0
        for (let index = 0; index < info.length; index++) {
            if (info[index]._id === dataEdit._id) {
                k = index;
            }
        }
        submitFormData.append('element', `${k}`);
        // console.log(nameOfinfor)
        // console.log(contentOfinfor)
        // console.log(k)
        try {
            const response = await axios.post(
                `${END_POINT}/admin/career-life/element/bottom`, submitFormData,
                {
                    headers: { 'x-access-token': `${accessToken}` }
                }
            )
            alert('đã sữa thành công ');

            setIsDisable(false);
            refetchData();
            onClose();
        } catch (error) {
            setIsDisable(false);
            // alert(error.response.data.message);  
            console.log("Error response: ", error);

        }

    }

    const changeLogo = (e) => {
        const img = e.target.files[0];
        setimglogo(img)
        setlogo(URL.createObjectURL(img));
    }
    const changebackground = (e) => {
        const img = e.target.files[0];
        setimgbackground(img)
        setbackground(URL.createObjectURL(img));
    }
    // console.log(dataEdit)
    return (
        <>
            <div className="fixed inset-0 bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center ">
                <div
                    style={{ overflowY: 'auto', maxHeight: '90vh' }}
                    className="overflow-scroll relative w-[700px] flex flex-col bg-white bg-opacity-100 p-6 rounded-xl gap-y-3 animate-modal_in">

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
                        // onFinish={acceptAddNewDepartment}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <h1 className="uppercase"> Vui lòng chỉnh sữa</h1>
                        <h1>infor</h1>
                        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="logo">
                            <input type='file' accept="image/*"
                                onChange={changeLogo} />
                            <div className="flex align-center" style={{ width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
                                <img src={logo} />

                            </div>
                        </Form.Item>
                        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="background">
                            <input type='file' accept="image/*"
                                onChange={changebackground} />
                            <div className="flex align-center" style={{ width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
                                <img src={background} />
                            </div>
                        </Form.Item>

                        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="name">
                            <Input.TextArea style={{ fontWeight: "500" }}
                                value={nameOfinfor} rows={2} onChange={(e) => setnameOfinfor(e.target.value)} />
                        </Form.Item>
                        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="position">
                            <Input.TextArea style={{ fontWeight: "500" }}
                                value={position} rows={2} onChange={(e) => setposition(e.target.value)} />
                        </Form.Item>
                        <Form.Item className="p-[5px] " style={{ fontWeight: "bold", }} label="content">
                            <Item>
                                <TextArea
                                    value={contentOfinfor} rows={2} onChange={(e) => setcontentOfinfor(e.target.value)}
                                >

                                </TextArea>

                            </Item>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 13,
                                span: 16,
                            }}
                        >
                            <Button
                                onClick={addnewinfor}
                                type="primary"
                                // htmlType="submit"
                                className="  bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-2 rounded-lg hover:opacity-80"
                            >
                                Submit
                            </Button>
                            <Button
                                disabled={isDisable}
                                onClick={onClose}
                                type="primary"
                                htmlType=""
                                className={
                                    !isDisable &&
                                    ' bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 rounded-lg hover:opacity-80'
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

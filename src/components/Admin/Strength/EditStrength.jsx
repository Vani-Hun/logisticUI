import { Button, Form } from 'antd';
import axios from 'axios';
import { MainContext } from '../../../context/MainContext';
import React, { useState, useContext } from 'react';
import { END_POINT } from '../../../utils/constant';


export default function EditStrength({ onClose, refetchData, dataEdit }) {
    const { accessToken } = useContext(MainContext);
    const [data, setdata] = useState(dataEdit)
    const [logoOfinfor, setlogoOfinfor] = useState(null)
    const [isDisable, setIsDisable] = useState(false);



    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const addnewinfor = async () => {
        const submitFormData = new FormData();

        submitFormData.append('logo', logoOfinfor);
        try {
            const response = await axios.put(
                `${END_POINT}/admin/strength/logo/${data._id}`, submitFormData,
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
            console.log("Error response: ", error);

        }

    }
    const changeLogo = (e) => {
        const img = e.target.files[0];
        setlogoOfinfor(img)
        setdata({
            ...data,
            logo: URL.createObjectURL(img)
        });
    }
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
                        onFinish={addnewinfor}

                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            name={'logo'}
                            rules={
                                logoOfinfor === null ? [
                                    {
                                        required: true,
                                        message: 'upload hình mới',
                                    },
                                ] : []}
                            className="p-[5px]" style={{ fontWeight: "bold", }} label="logo">
                            <input type='file' accept="image/*"
                                onChange={changeLogo} />
                            <div className="flex align-center" style={{ width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
                                <img src={data?.logo} />
                            </div>
                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                offset: 13,
                                span: 16,
                            }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
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

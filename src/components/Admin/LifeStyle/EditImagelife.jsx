import { Button, Form } from 'antd';
import axios from 'axios';
import { MainContext } from '../../../context/MainContext';
import React, { useState, useContext } from 'react';
import { END_POINT } from '../../../utils/constant';

export default function EditImagelife({ onClose, refetchData ,dataEdit}) {
    const { accessToken } = useContext(MainContext);
    
   
    const [loading, setLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false);

    const [imageAboutUs, setimageAboutUs] = useState()
    const [containerImage, setcontainerImage] = useState()

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    console.log(dataEdit)
    const acceptAddNewDepartment = async () => {
        setLoading(true);
        // setIsDisable(true);
        // console.log(imageAboutUs)
        // console.log(containerImage)
        const submitFormData = new FormData();
        submitFormData.append('imageAboutUs', imageAboutUs);
        for (let i = 0; i < containerImage.length; i++) {
            submitFormData.append('containerImage', containerImage[i]);
          }
        submitFormData.append('descriptionAboutUs', 'uhu');


        try {
            const response = await axios.put(
                `${END_POINT}/admin/life-style/${dataEdit._id}`, submitFormData,
                {
                    headers: { 'x-access-token': `${accessToken}` }
                    // headers: { 'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM3NWE5MmQ4YTAzMWQ4OTVhOGNiMmUiLCJyb2xlIjoiYWRtaW4iLCJyb2xlSWQiOiI2NGM3NWE5MWQ4YTAzMWQ4OTVhOGNiMmMiLCJpYXQiOjE2OTM4MTc0MTEsImV4cCI6MTY5MzgzMTgxMX0.HgHs6xmAvTCq1Nb8YdWrOmyYNPy4hBXRt7-P7vZpJ04` }
                }
            )
            if (response.status === 200) {
                alert('đã sữa    thành công ');
            }
            setLoading(false);
            setIsDisable(false);
            refetchData();
            onClose();
        } catch (error) {
            setIsDisable(false);
            alert(error.response.data.message);
            setLoading(false);
            console.log("Error response: ", error.response.data);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center ">
                <div className="relative w-[700px] flex flex-col bg-white bg-opacity-100 p-6 rounded-xl gap-y-3 animate-modal_in">
                    {/* <span className="text-xl uppercase font-bold h-fit">
            Thêm cam kết phụ
          </span> */}
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
                        <h1 className="uppercase"> Vui lòng Upload ảnh mới </h1>

                        <Form.Item
                            name={'logo'}
                            label={'logo'}
                            rules={[
                                {
                                    required: true,
                                    message: 'upload hình mới',
                                },
                            ]}
                        >
                            <input
                                type="file"
                                name="file"
                                value={imageAboutUs}
                                onChange={(e) => {
                                    setimageAboutUs(e.target.files[0])
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name={'list ảnh'}
                            label={'list ảnh'}
                            rules={[
                                {
                                    required: true,
                                    message: 'upload list hình',
                                },
                            ]}
                        >
                            <input
                                type="file"
                                name="file"
                                multiple
                                value={containerImage}
                                onChange={(e) => {
                                    const selectedFiles = e.target.files;

                                    // Create an array to store the selected files
                                    const fileList = [];

                                    for (let i = 0; i < selectedFiles.length; i++) {
                                        const file = selectedFiles[i];
                                        // You can add each file to the fileList array or perform any desired actions
                                        fileList.push(file);
                                    }
                                    setcontainerImage(fileList)
                                    // setcontainerImage(e.target.files)
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 13,
                                span: 16,
                            }}
                        >
                            <div
                                onClick={acceptAddNewDepartment}
                                // type="primary"
                                // htmlType="submit"
                                className="  bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-2 rounded-lg hover:opacity-80"
                            >
                                Submit
                            </div>
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

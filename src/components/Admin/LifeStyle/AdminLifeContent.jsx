import { Button, Checkbox, Form, Input, Upload, Divider, Select, Table } from "antd";
import { UploadOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
import { MainContext } from "../../../context/MainContext";
import { END_POINT } from "../../../utils/constant";
import { Option } from "antd/lib/mentions";
import Item from "antd/lib/list/Item";
import TextArea from "antd/lib/input/TextArea";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import EditInfor from "./EditInfor";
import EditBottomPic from "./EditBottomPic";

export default function AdminAbout() {
    const { accessToken } = useContext(MainContext);
    const form = useRef();


    const [logoadress, setlogoadress] = useState(null)
    const [checklogo, setchecklogo] = useState(false)

    const [checkRightPicture, setcheckRightPicture] = useState(false)
    const [rightpicture, setrightpicture] = useState(null)

    const [checktopPicture, setchecktopPicture] = useState(false)
    const [topPicture, settopPicture] = useState(null)

    const [logoTeammatePortrait, setlogoTeammatePortrait] = useState(null)
    const [checklogoTeammatePortrait, setchecklogoTeammatePortrait] = useState(false)

    //da laays
    const [strengthoflife, setstrengthoflife] = useState([])


    const [data, setdata] = useState({})
    const getInfor = async () => {
        const res = await axios.get(`${END_POINT}/career-life`);
        console.log(res.data.data);
        setdata(res.data.data);
        setstrengthoflife(res.data.data.teammatePortrait)
    };
    useEffect(() => {
        getInfor();
    }, []);

    const changeLogo = (e) => {
        setchecklogo(true)
        const img = e.target.files[0];
        setdata({
            ...data,
            address: {
                detail: data.address.detail,
                logo: img,
                name: data.address.name
            }
        })
        setlogoadress(URL.createObjectURL(img));
    }
    const handleSubmit = async () => {
        const submitFormData = new FormData();
        submitFormData.append('name', data.address.name);
        submitFormData.append('detail', data.address.detail);
        submitFormData.append('logoAddress', data.address.logo);
        try {
            const response = await axios.post(
                `${END_POINT}/admin/career-life/address`, submitFormData,
                {
                    headers: { 'x-access-token': `${accessToken}` }
                    // headers: { 'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM3NTgzN2Q4YTAzMWQ4OTVhOGNiMjMiLCJyb2xlIjoiYWRtaW4iLCJyb2xlSWQiOiI2NGM3NTgzNmQ4YTAzMWQ4OTVhOGNiMjEiLCJpYXQiOjE2OTM5MDA0NTEsImV4cCI6MTY5MzkxNDg1MX0.IjkyTvjyXW3g9Qg6_BEkFHZcnmxd7LffUIFDTwfnmio` }
                }
            )

            alert('đã them thành công ');

        } catch (error) {
            alert(error.response.data.message);
            console.log("Error response: ", error.response.data);
        }
    }

    const changeLogorightPicture = (e) => {
        setcheckRightPicture(true)
        const img = e.target.files[0];
        console.log(img)
        setdata({
            ...data,
            rightPicture: img
        })
        setrightpicture(URL.createObjectURL(img));
    }
    const handleSubmitrightPicture = async () => {
        const submitFormData = new FormData();
        console.log(data.rightPicture)
        submitFormData.append('rightPicture', data.rightPicture);
        try {
            const response = await axios.post(
                `${END_POINT}/admin/career-life/rightPicture`, submitFormData,
                {
                    headers: { 'x-access-token': `${accessToken}` }
                    // headers: { 'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM3NTgzN2Q4YTAzMWQ4OTVhOGNiMjMiLCJyb2xlIjoiYWRtaW4iLCJyb2xlSWQiOiI2NGM3NTgzNmQ4YTAzMWQ4OTVhOGNiMjEiLCJpYXQiOjE2OTM5MDA0NTEsImV4cCI6MTY5MzkxNDg1MX0.IjkyTvjyXW3g9Qg6_BEkFHZcnmxd7LffUIFDTwfnmio` }
                }
            )

            alert('đã them thành công ');

        } catch (error) {
            alert(error.response.data.message);
            console.log("Error response: ", error.response.data);
        }
    }

    const changeLogotopPicture = (e) => {
        setchecktopPicture(true)
        const img = e.target.files[0];
        console.log(img)
        setdata({
            ...data,
            topPicture: img
        })
        settopPicture(URL.createObjectURL(img));
    }
    const handleSubmittopPicture = async () => {
        const submitFormData = new FormData();
        console.log(data.topPicture)
        submitFormData.append('topPicture', data.topPicture);
        try {
            const response = await axios.post(
                `${END_POINT}/admin/career-life/topPicture`, submitFormData,
                {
                    headers: { 'x-access-token': `${accessToken}` }
                    // headers: { 'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM3NTgzN2Q4YTAzMWQ4OTVhOGNiMjMiLCJyb2xlIjoiYWRtaW4iLCJyb2xlSWQiOiI2NGM3NTgzNmQ4YTAzMWQ4OTVhOGNiMjEiLCJpYXQiOjE2OTM5MDA0NTEsImV4cCI6MTY5MzkxNDg1MX0.IjkyTvjyXW3g9Qg6_BEkFHZcnmxd7LffUIFDTwfnmio` }
                }
            )

            alert('đã them thành công ');

        } catch (error) {
            alert(error.response.data.message);
            console.log("Error response: ", error.response.data);
        }
    }


    const handleSubmitdetaillife = async () => {
        const submitFormData = new FormData();
        submitFormData.append('nameLife', data.nameLife);
        submitFormData.append('contentLife', data.contentLife);
        submitFormData.append('descriptionLife', data.descriptionLife);

        const formData = new URLSearchParams();
        formData.append('nameLife', data.nameLife);
        formData.append('contentLife', data.contentLife);
        formData.append('descriptionLife', data.descriptionLife);
        try {
            const response = await axios.post(
                `${END_POINT}/admin/career-life/detailLife`, formData,
                {
                    headers: { 'x-access-token': `${accessToken}` },
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // headers: { 'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM3NTgzN2Q4YTAzMWQ4OTVhOGNiMjMiLCJyb2xlIjoiYWRtaW4iLCJyb2xlSWQiOiI2NGM3NTgzNmQ4YTAzMWQ4OTVhOGNiMjEiLCJpYXQiOjE2OTM5MDA0NTEsImV4cCI6MTY5MzkxNDg1MX0.IjkyTvjyXW3g9Qg6_BEkFHZcnmxd7LffUIFDTwfnmio` }
                }
            )

            alert('đã them thành công ');
        } catch (error) {
            alert(error.response.data.message);
            console.log("Error response: ", error.response.data);
        }
    }



    const changelogoTeammatePortrait = (e) => {
        setchecklogoTeammatePortrait(true)
        const img = e.target.files[0];
        console.log(img)
        setdata({
            ...data,
            logoTeammatePortrait: img
        })
        setlogoTeammatePortrait(URL.createObjectURL(img));
    }
    const handleSubmitTeammatePortrait = async () => {
        const submitFormData = new FormData();
        submitFormData.append('nameTeammatePortrait', data.nameTeammatePortrait);
        submitFormData.append('logoTeammatePortrait', data.logoTeammatePortrait);
        var string = strengthoflife.map((strength) => {
            return strength._id
        })
        var stringOfId = string.join(',')
        submitFormData.append('teammatePortrait', stringOfId);
        try {
            const response = await axios.post(
                `${END_POINT}/admin/career-life/detailTeammatePortrait`, submitFormData,
                {
                    headers: { 'x-access-token': `${accessToken}` }
                    // headers: { 'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM3NTgzN2Q4YTAzMWQ4OTVhOGNiMjMiLCJyb2xlIjoiYWRtaW4iLCJyb2xlSWQiOiI2NGM3NTgzNmQ4YTAzMWQ4OTVhOGNiMjEiLCJpYXQiOjE2OTM5MDA0NTEsImV4cCI6MTY5MzkxNDg1MX0.IjkyTvjyXW3g9Qg6_BEkFHZcnmxd7LffUIFDTwfnmio` }
                }
            )

            alert('đã them thành công ');
        } catch (error) {
            alert(error.response.data.message);
            console.log("Error response: ", error.response.data);
        }
    }

    const [strengths, setstrengths] = useState([])
    useEffect(() => {
        const fetchStrength = async () => {
            const response = await axios.get(
                `${END_POINT}/strength`
            )
            setstrengths(response.data.data.strength)
        }
        fetchStrength()
    }, [])

    const [strengthnotlife, setstrengthnotlife] = useState([])
    useEffect(() => {
        const arr = strengths.filter((strength) => {

            let k = 0
            for (let index = 0; index < strengthoflife.length; index++) {
                if (strengthoflife[index]._id === strength._id) {
                    k = 1
                    break;
                }

            }
            if (k === 1)
                return false
            return true
        });
        // console.log(arr)
        setstrengthnotlife(arr)
    }, [strengthoflife])


    const handlerdeletestrength = (index) => {
        setstrengthnotlife([...strengthnotlife, strengthoflife[index]])
        const newarr = [...strengthoflife]
        newarr.splice(index, 1)
        console.log(newarr)
        setstrengthoflife(newarr)
    }

    const [addStrengthIndex, setaddStrengthIndex] = useState(-1)
    const addstrength = () => {
        if (addStrengthIndex !== -1) {
            setstrengthoflife([...strengthoflife, strengthnotlife[addStrengthIndex]])
            const newarr = [...strengthnotlife]
            newarr.splice(addStrengthIndex, 1)
            console.log(newarr)
            setstrengthnotlife(newarr)


        }
    }




    const [nameOfinfor, setnameOfinfor] = useState('')
    const [contentOfinfor, setcontentOfinfor] = useState('')
    const [logoOfinfor, setlogoOfinfor] = useState(null)
    const [imgInfor, setimgInfor] = useState()
    const [checklogoOfinfor, setchecklogoOfinfor] = useState(false)
    const changelogoinfor = (e) => {
        setchecklogoOfinfor(true)
        const img = e.target.files[0];
        setimgInfor(img)
        setlogoOfinfor(URL.createObjectURL(img));
    }

    const [isEditVisible, setIsEditVisible] = useState(false)
    const [dataForEdit, setDataForEdit] = useState({})
    const [dataForEditBTPicture, setDataForEditBTPicture] = useState({})
    const handleClickEdit = (record) => {
        // console.log(record)
        setIsEditVisible(true);
        console.log(record)
        setDataForEdit(record);
    };
    const handleClickEditBtPicture = (record) => {
        // console.log(record)
        setisEditVisibleBTPicture(true);
        console.log(record)
        setDataForEditBTPicture(record);
    };
    const handleAddcontent = async () => {
        const submitFormData = new FormData();
        submitFormData.append('name', nameOfinfor);
        submitFormData.append('content', contentOfinfor);
        submitFormData.append('logoInfo', imgInfor);
        try {
            const response = await axios.post(
                `${END_POINT}/admin/career-life/info`, submitFormData,
                {
                    headers: { 'x-access-token': `${accessToken}` }
                    // headers: { 'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM3NTgzN2Q4YTAzMWQ4OTVhOGNiMjMiLCJyb2xlIjoiYWRtaW4iLCJyb2xlSWQiOiI2NGM3NTgzNmQ4YTAzMWQ4OTVhOGNiMjEiLCJpYXQiOjE2OTM5MDA0NTEsImV4cCI6MTY5MzkxNDg1MX0.IjkyTvjyXW3g9Qg6_BEkFHZcnmxd7LffUIFDTwfnmio` }
                }
            )

            alert('đã them thành công ');
        } catch (error) {
            alert(error.response.data.message);
            console.log("Error response: ", error.response.data);
        }

    }

    const columns = [
        {
            title: "Logo",
            dataIndex: "logo",
            render: (e) => {
                return <img
                    src={`${e}`}
                    className="h-10 w-10"
                ></img>
            }
        },
        {
            title: "name",
            dataIndex: "name",

        },
        {
            title: 'content',
            dataIndex: 'content',
        },


        {
            title: "",
            width: 160,
            dataIndex: "action",
            render: (a, record) => (
                <div className="flex flex-row gap-y-1 gap-x-3 justify-around">
                    <button
                        className="flex items-baseline gap-x-1 hover:text-blue-600"
                        onClick={() => handleClickEdit(record)}
                    >
                        <AiFillEdit className="translate-y-[1px]" />
                        Sửa
                    </button>
                    <button
                        className="flex items-baseline gap-x-1 hover:text-red-600"
                        onClick={() => {
                            // console.log(record)
                            // setIsDeleteVisible(true);
                            // setValueCompare(record._id);
                            // // setNameCompare(record.name);
                        }}
                    >
                        <AiOutlineDelete className="translate-y-[1px]" />
                        Xóa
                    </button>
                </div>
            ),
        },
    ];
    const columnOfBottomPicture = [
        {
            title: "logo",
            dataIndex: "logo",
            render: (e) => {
                return <img
                    src={`${e}`}
                    className="h-10 w-10"
                ></img>
            }
        },
        {
            title: "background",
            dataIndex: "background",
            render: (e) => {
                return <img
                    src={`${e}`}
                    className="h-10 w-10"
                ></img>
            }
        },
        {
            title: "name",
            dataIndex: "name",

        },
        {
            title: 'content',
            dataIndex: 'content',
        }, {
            title: 'position',
            dataIndex: 'position',
        },
        {
            title: "",
            width: 160,
            dataIndex: "action",
            render: (a, record) => (
                <div className="flex flex-row gap-y-1 gap-x-3 justify-around">
                    <button
                        className="flex items-baseline gap-x-1 hover:text-blue-600"
                        onClick={() => handleClickEditBtPicture(record)}
                    >
                        <AiFillEdit className="translate-y-[1px]" />
                        Sửa
                    </button>
                    <button
                        className="flex items-baseline gap-x-1 hover:text-red-600"
                        onClick={() => {
                            // console.log(record)
                            // setIsDeleteVisible(true);
                            // setValueCompare(record._id);
                            // // setNameCompare(record.name);
                        }}
                    >
                        <AiOutlineDelete className="translate-y-[1px]" />
                        Xóa
                    </button>
                </div>
            ),
        },
    ];

    const [background, setbackground] = useState(null)
    const [logoOfBPicture, setlogoOfBPicture] = useState(null)
    const [nameOfBPicture, setnameOfBPicture] = useState('')
    const [position, setposition] = useState('')
    const [contetnOfBPicture, setcontentOfBPicture] = useState('')
    const [isEditVisibleBTPicture, setisEditVisibleBTPicture] = useState(false)


    const changeBackground = (e) => {
        const img = e.target.files[0];
        setbackground(img)
        // setlogoOfinfor(URL.createObjectURL(img));
    }
    const changeLogoBtpicture = (e) => {
        const img = e.target.files[0];
        setlogoOfBPicture(img)
        // setlogoOfinfor(URL.createObjectURL(img));
    }

    const handleraddBtpicture = async () => {
        const submitFormData = new FormData();
        submitFormData.append('name', nameOfBPicture);
        submitFormData.append('content', contetnOfBPicture);
        submitFormData.append('position', position);
        submitFormData.append('logo', logoOfBPicture);
        submitFormData.append('background', background);
        try {
            const response = await axios.post(
                `${END_POINT}/admin/career-life/bottom`, submitFormData,
                {
                    headers: { 'x-access-token': `${accessToken}` }
                    // headers: { 'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM3NTgzN2Q4YTAzMWQ4OTVhOGNiMjMiLCJyb2xlIjoiYWRtaW4iLCJyb2xlSWQiOiI2NGM3NTgzNmQ4YTAzMWQ4OTVhOGNiMjEiLCJpYXQiOjE2OTM5MDA0NTEsImV4cCI6MTY5MzkxNDg1MX0.IjkyTvjyXW3g9Qg6_BEkFHZcnmxd7LffUIFDTwfnmio` }
                }
            )

            alert('đã them thành công ');
            getInfor()
        } catch (error) {
            alert(error.response.data.message);
            console.log("Error response: ", error.response.data);
        }
    }
    console.log(data)
    return (
        <>
            <h1 className="mb-[38px]" style={{ margin: "auto", fontSize: "25px", fontWeight: "600", }}>life style</h1>
            <Form
                style={{ margin: "auto" }}
                ref={form}
                name="basic"
                labelCol={{
                    span: 3,
                }}
                wrapperCol={{
                    span: 16,
                }}
                autoComplete="off"
            >
                {/* `address` */}
                <h1>Address</h1>
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="name">
                    <Input.TextArea style={{ fontWeight: "500" }} value={data?.address?.name} rows={2}
                        onChange={(e) => setdata({
                            ...data,
                            address: {
                                name: e.target.value,
                                logo: data.address.logo,
                                detail: data.address.detail
                            }
                        })} />
                </Form.Item>
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="địa chỉ">
                    <Input.TextArea style={{ fontWeight: "500" }}
                        value={data?.address?.detail} rows={2} onChange={(e) => setdata({
                            ...data,
                            address: {
                                detail: e.target.value,
                                logo: data.address.logo,
                                name: data.address.name
                            }
                        })} />
                </Form.Item>
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Logo">
                    <input type='file' accept="image/*" onChange={changeLogo} />
                    <div className="flex align-center" style={{ width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
                        {
                            checklogo === false ? <img src={data?.address?.logo} /> : <img src={logoadress} />
                        }
                    </div>
                </Form.Item>
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }}
                    wrapperCol={{
                        offset: 10,
                        // span: 20,
                    }}
                >
                    <Button
                        type="primary"
                        style={{
                            color: "",
                            padding: "16",
                            display: "flex",
                            alignItems: 'center',
                            fontWeight: "bold"
                        }}
                        htmlType="submit"
                        onClick={handleSubmit}
                    >
                        Gửi thông tin
                    </Button>
                </Form.Item>

                <Divider style={{ backgroundColor: '#d4d4d4' }} />

                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="right picture">
                    <input type='file' accept="image/*" onChange={changeLogorightPicture} />
                    <div className="flex align-center" style={{ width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
                        {
                            checkRightPicture === false ? <img src={data?.rightPicture} /> : <img src={rightpicture} />
                        }
                    </div>
                </Form.Item>
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} wrapperCol={{ offset: 3, }} >
                    <Button type="primary" style={{ color: "", padding: "16", display: "flex", alignItems: 'center', fontWeight: "bold" }} htmlType="submit"
                        onClick={handleSubmitrightPicture} >
                        Cập nhật rightPicture
                    </Button>
                </Form.Item>
                <Divider style={{ backgroundColor: '#d4d4d4' }} />
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="top picture">
                    <input type='file' accept="image/*" onChange={changeLogotopPicture} />
                    <div className="flex align-center" style={{ width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
                        {
                            checktopPicture === false ? <img src={data?.topPicture} /> : <img src={topPicture} />
                        }
                    </div>
                </Form.Item>
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} wrapperCol={{ offset: 3, }} >
                    <Button type="primary" style={{ color: "", padding: "16", display: "flex", alignItems: 'center', fontWeight: "bold" }} htmlType="submit"
                        onClick={handleSubmittopPicture} >
                        Cập nhật top Picture
                    </Button>
                </Form.Item>

                <Divider style={{ backgroundColor: '#d4d4d4' }} />

                <h1>detail life</h1>
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="nameLife">
                    <Input.TextArea style={{ fontWeight: "500" }} value={data?.nameLife} rows={2}
                        onChange={(e) => setdata({
                            ...data,
                            nameLife: e.target.value
                        })} />
                </Form.Item>
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="contentLife">
                    <Input.TextArea style={{ fontWeight: "500" }} value={data?.contentLife} rows={2}
                        onChange={(e) => setdata({
                            ...data,
                            contentLife: e.target.value
                        })} />
                </Form.Item>
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="descriptionLife">
                    <Input.TextArea style={{ fontWeight: "500" }} value={data?.descriptionLife} rows={2}
                        onChange={(e) => setdata({
                            ...data,
                            descriptionLife: e.target.value
                        })} />
                </Form.Item>
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }}
                    wrapperCol={{
                        offset: 10,
                        // span: 20,
                    }}
                >
                    <Button
                        type="primary"
                        style={{
                            color: "",
                            padding: "16",
                            display: "flex",
                            alignItems: 'center',
                            fontWeight: "bold"
                        }}
                        htmlType="submit"
                        onClick={handleSubmitdetaillife}
                    >
                        Gửi thông tin
                    </Button>
                </Form.Item>

                <Divider style={{ backgroundColor: '#d4d4d4' }} />

                <h1>TeammatePortrait</h1>
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="logo">
                    <input type='file' accept="image/*" onChange={changelogoTeammatePortrait} />
                    <div className="flex align-center" style={{ width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
                        {
                            checklogoTeammatePortrait === false ? <img src={data?.logoTeammatePortrait} /> : <img src={logoTeammatePortrait} />
                        }
                    </div>
                </Form.Item>

                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="teammatePortrait">
                    <Input.TextArea style={{ fontWeight: "500" }}
                        value={data?.nameTeammatePortrait} rows={2} onChange={(e) => setdata({
                            ...data,
                            nameTeammatePortrait: e.target.value,
                        })} />
                </Form.Item>
                <Form.Item className="p-[5px] " style={{ fontWeight: "bold", }} label="teammate">

                    <Item>
                        <Select
                            allowClear
                            onChange={(_, option) => setaddStrengthIndex(option?.key)}
                        >
                            {strengthnotlife.map((strengths, index) => (
                                <Option value={strengths.name} key={index}>
                                    {strengths.name}
                                </Option>
                            ))}
                        </Select>
                        <span className="ml-3 cursor-pointer"
                            onClick={addstrength}

                        >
                            add
                        </span>
                    </Item>
                </Form.Item>
                {
                    strengthoflife.map((strength, index) => {
                        return <Form.Item
                            key={index}>
                            <div className="flex">
                                <img style={{ width: '28px', height: '28px' }} src={strength?.logo} />
                                <span className="ml-3">
                                    {strength?.name}
                                </span>
                                <button className="ml-3"
                                    onClick={() => handlerdeletestrength(index)}>
                                    X
                                </button>
                            </div>
                        </Form.Item>
                    })
                }
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }}
                    wrapperCol={{
                        offset: 10,
                        // span: 20,
                    }}
                >
                    <Button
                        type="primary"
                        style={{
                            color: "",
                            padding: "16",
                            display: "flex",
                            alignItems: 'center',
                            fontWeight: "bold"
                        }}
                        htmlType="submit"
                        onClick={handleSubmitTeammatePortrait}
                    >
                        Gửi thông tin
                    </Button>
                </Form.Item>

                <Divider style={{ backgroundColor: '#d4d4d4' }} />

                <h1>infor</h1>
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="logo">
                    <input type='file' accept="image/*" onChange={changeBackground} />
                    <div className="flex align-center" style={{ width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
                        {
                            checklogoOfinfor === false ? <div></div> : <img src={logoOfinfor} />
                        }
                    </div>
                </Form.Item>

                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="teammatePortrait">
                    <Input.TextArea style={{ fontWeight: "500" }}
                        value={nameOfinfor} rows={2} onChange={(e) => setnameOfinfor(e.target.value)} />
                </Form.Item>
                <Form.Item className="p-[5px] " style={{ fontWeight: "bold", }} label="teammate">
                    <Item>
                        <TextArea
                            value={contentOfinfor} rows={2} onChange={(e) => setcontentOfinfor(e.target.value)}
                        >

                        </TextArea>
                        <span className="ml-3 cursor-pointer"
                            onClick={handleAddcontent}
                        >
                            add
                        </span>
                    </Item>
                </Form.Item>

                <Table
                    rowKey={(record) => record._id}
                    columns={columns}
                    dataSource={data.info}
                />

                {isEditVisible && <EditInfor
                    onClose={() => setIsEditVisible(false)}
                    dataEdit={dataForEdit}
                    info={data.info}
                    refetchData={getInfor}
                />}


                <Divider style={{ backgroundColor: '#d4d4d4' }} />

                <h1>bottomPicture</h1>
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="background">
                    <input type='file' accept="image/*" onChange={changeBackground} />
                    <div className="flex align-center" style={{ width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
                        {
                            background === null ? <div></div> : <img src={URL.createObjectURL(background)} />
                        }
                    </div>
                </Form.Item>
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="logo">
                    <input type='file' accept="image/*" onChange={changeLogoBtpicture} />
                    <div className="flex align-center" style={{ width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
                        {
                            logoOfBPicture === null ? <div></div> : <img src={URL.createObjectURL(logoOfBPicture)} />
                        }
                    </div>
                </Form.Item>

                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="name">
                    <Input.TextArea style={{ fontWeight: "500" }}
                        value={nameOfBPicture} rows={2} onChange={(e) => setnameOfBPicture(e.target.value)} />
                </Form.Item>
                <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="position">
                    <Input.TextArea style={{ fontWeight: "500" }}
                        value={position} rows={2} onChange={(e) => setposition(e.target.value)} />
                </Form.Item>
                <Form.Item className="p-[5px] " style={{ fontWeight: "bold", }} label="content">
                    <Item>
                        <TextArea
                            value={contetnOfBPicture} rows={2} onChange={(e) => setcontentOfBPicture(e.target.value)}
                        >

                        </TextArea>
                        <span className="ml-3 cursor-pointer"
                            onClick={handleraddBtpicture}
                        >
                            add
                        </span>
                    </Item>
                </Form.Item>




                <Table
                    rowKey={(record) => record._id}
                    columns={columnOfBottomPicture}
                    dataSource={data.bottomPicture}
                // pagination={pagination}
                // loading={loading}
                // onChange={handleTableChange}
                />

                {isEditVisibleBTPicture && <EditBottomPic
                    onClose={() => setisEditVisibleBTPicture(false)}
                    dataEdit={dataForEditBTPicture}
                    info={data.bottomPicture}
                    refetchData={getInfor}
                />}


            </Form>
        </>
    );
}

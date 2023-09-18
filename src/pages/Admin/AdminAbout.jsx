import { Button, Checkbox, Form, Input, Upload, Divider } from "antd";
import { MainContext } from "../../context/MainContext";
import { UploadOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { TOKEN } from "./adminToken";
import { useEffect } from "react";
import { useRef } from "react";
import { END_POINT } from "../../utils/constant";
import Cookies from 'js-cookie'

export default function AdminAbout() {
  const { accessToken } = useContext(MainContext);
  const form = useRef();

  const [name, setName] = useState('')
  const [description, setDes] = useState('');
  const [values, setValues] = useState('');
  const [vision, setVision] = useState('')
  const [history, setHistory] = useState('')
  const [video, setVideo] = useState('')
  const [networkCoverage, setNetworkCoverage] = useState('')
  const [businessLicense, setBusinessLicense] = useState('')
  const [licenseOrgan, setLicenseOrgan] = useState('')
  const [licenseDetail, setLicenseDetail] = useState('')

  const [fileListLogo, setLogo] = useState('')
  const [fileTopBanner, setFileTopBanner] = useState('')
  const [fileMidBanner, setFileMidBanner] = useState('')
  const [fileBottomBanner, setFileBottomBanner] = useState('')
  const [fileAppBanner, setFileAppBanner] = useState('')
  const [fileLicenseImage, setFileLicenseImage] = useState('')
  const [fileListBanners, setBanners] = useState([])
  const [aboutState, setAboutState] = useState({
    // description: "string",
    // vision: "string",
    // values: "string",
    // logo: "https://cdn.tgdd.vn/Files/2020/12/11/1312984/huong-dan-tra-cuu-van-don-j-t-express-nhanh-nhat-c-4-652x367.jpg",
    // banners: [
    //   "https://icdn.dantri.com.vn/thumb_w/640/2020/05/08/j-chuandocx-1588932311071.jpeg",
    //   "https://cdn.tgdd.vn/Files/2020/12/11/1312984/huong-dan-tra-cuu-van-don-j-t-express-nhanh-nhat-c-4-652x367.jpg",
    // ],
  });
  const callAboutData = async () => {
    try {
      const result = await axios({
        url: `${END_POINT}/about`,
        method: "get",
        headers: { 'x-access-token': Cookies.get('accessToken') },
      });
      if (result.status === 200) {
        console.log("Call API thành công: ", result.data.data)
        setAboutState(result.data.data);
        setValues(result.data.data.values)
        setVision(result.data.data.vision)
        setDes(result.data.data.description)
        setName(result.data.data.name)
        setVideo(result.data.data.video)
        setHistory(result.data.data.history)
        setNetworkCoverage(result.data.data.networkCoverage)
        setBusinessLicense(result.data.data.businessLicense)
        setLicenseOrgan(result.data.data.licenseOrgan)
        setLicenseDetail(result.data.data.licenseDetail)
      }
    } catch (error) {
      console.log("", error);
    }
  };

  const postApi = async (data) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/about`,
        method: "post",
        headers: { authorization: `Bearer ${accessToken}` },
        data: data,
      });
      if (result.status === 200) {
        // console.log(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const postApiLogo = async (data) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/about/logo`,
        method: "post",
        headers: { authorization: `Bearer ${accessToken}` },
        data: data,
      });
      if (result.status === 200) {
        // console.log(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const postApiLicenseImage = async (data) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/about/licenseimg`,
        method: "post",
        headers: { authorization: `Bearer ${accessToken}` },
        data: data,
      });
      if (result.status === 200) {
        // console.log(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const postApiBanner = async (data) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/about/banners`,
        method: "post",
        headers: { authorization: `Bearer ${accessToken}` },
        data: data,
      });
      if (result.status === 200) {
        // console.log(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    callAboutData();
  }, []);

  const postApiTopBanner = async (data) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/about/topBanner`,
        method: "post",
        headers: { authorization: `Bearer ${accessToken}` },
        data: data,
      });
      if (result.status === 200) {
        // console.log(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const postApiMidBanner = async (data) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/about/midBanner`,
        method: "post",
        headers: { authorization: `Bearer ${accessToken}` },
        data: data,
      });
      if (result.status === 200) {
        // console.log(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const postApiBottomBanner = async (data) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/about/bottomBanner`,
        method: "post",
        headers: { authorization: `Bearer ${accessToken}` },
        data: data,
      });
      if (result.status === 200) {
        // console.log(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const postApiAppBanner = async (data) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/about/appBanner`,
        method: "post",
        headers: { authorization: `Bearer ${accessToken}` },
        data: data,
      });
      if (result.status === 200) {
        // console.log(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }


  const changeLogo = (e) => {
    const img = e.target.files[0];
    img.preview = URL.createObjectURL(img)
    setLogo(img);
    // setCheckLogo(true)
  }

  const changeLicenseImage = (e) => {
    const img = e.target.files[0]
    img.preview = URL.createObjectURL(img)
    setFileLicenseImage(img)
  }

  const changeTopBanner = (e) => {
    const img = e.target.files[0];
    img.preview = URL.createObjectURL(img)
    setFileTopBanner(img);
    // setCheckTopBanner(true)
  }

  const changeMidBanner = (e) => {
    const img = e.target.files[0];
    img.preview = URL.createObjectURL(img)
    setFileMidBanner(img);
    // setCheckMidBanner(true)
  }

  const changeBottomBanner = (e) => {
    const img = e.target.files[0];
    img.preview = URL.createObjectURL(img)
    setFileBottomBanner(img);
    // setCheckBottomBanner(true)
  }

  const changeAppBanner = (e) => {
    const img = e.target.files[0];
    img.preview = URL.createObjectURL(img)
    setFileAppBanner(img);
    // setCheckAppBanner(true)
  }

  const changeBanners = e => {
    const files = e.target.files;
    const banners = fileListBanners.slice()
    for (const file of files) {
      file.preview = URL.createObjectURL(file)
      banners.push(file)
    }

    setBanners(banners)
    // setCheckBanners(true)
  }

  const handleDel = (e) => {
    let index = e.target.parentElement.parentElement.id
    const files = fileListBanners.slice(0, fileListBanners.length);
    files.splice(index, 1)
    console.log(files);
    setBanners(files);
  }

  const handleSubmit = () => {
    const items = {
      description: description,
      values: values,
      vision: vision,
      name: name,
      history: history,
      video: video,
      networkCoverage: networkCoverage,
      businessLicense: businessLicense,
      licenseOrgan: licenseOrgan,
      licenseDetail: licenseDetail,
    }

    postApi(items)
    alert("Cập nhật thông tin thành công")
  }

  const handleBannersSubmit = () => {
    let fileBanners = new FormData();
    fileListBanners.forEach(e => {
      fileBanners.append("banners", e)
    })
    postApiBanner(fileBanners);
    alert("Cập nhật các Banner trang chủ thành công!")
  }

  const handleLogoSubmit = () => {
    let valueLogo = new FormData();
    valueLogo.append("logo", fileListLogo)
    postApiLogo(valueLogo);
    alert("Cập nhật Logo thành công!")
  }

  const handleLicenseImageSubmit = () => {
    let valueLicenseImage = new FormData();
    valueLicenseImage.append("license_img", fileLicenseImage)
    postApiLicenseImage(valueLicenseImage);
    alert("Cập nhật ảnh giấy phép thành công!")
  }

  const handleBannerTopSubmit = () => {
    let valueBannerTop = new FormData();
    valueBannerTop.append("topBanner", fileTopBanner)
    postApiTopBanner(valueBannerTop);
    alert("Cập nhật Banner đầu trang AboutUs thành công!")
  }

  const handleBannerMidSubmit = () => {
    let valueBannerMid = new FormData();
    valueBannerMid.append("midBanner", fileMidBanner)
    postApiMidBanner(valueBannerMid);
    alert("Cập nhật Banner giữa trang AboutUs thành công!")
  }

  const handleBannerBottomSubmit = () => {
    let valueBannerBottom = new FormData();
    valueBannerBottom.append("bottomBanner", fileBottomBanner)
    postApiBottomBanner(valueBannerBottom);
    alert("Cập nhật Banner cuối trang AboutUs thành công!")
  }

  const handleAppBanner = () => {
    let valueAppBanner = new FormData();
    valueAppBanner.append("appBanner", fileAppBanner)
    postApiAppBanner(valueAppBanner);
    alert("Cập nhật Banner giới thiệu App điện thoại thành công!")
  }

  return (
    <>
      <h1 className="mb-[38px]" style={{ margin: "auto", fontSize: "25px", fontWeight: "600", }}>Về Chúng Tôi</h1>
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

        {/* <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="ID">
          {aboutState && (
            <Input.TextArea style={{ fontWeight: "500" }} value={aboutState._id} rows={2} disabled='true' />
          )}
        </Form.Item> */}

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Tên công ty">
          <Input.TextArea style={{ fontWeight: "500" }} value={name} rows={2} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Mô tả">
          <Input.TextArea style={{ fontWeight: "500" }} value={description} rows={2} onChange={(e) => setDes(e.target.value)} />
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Tầm nhìn">
          <Input.TextArea style={{ fontWeight: "500" }} value={vision} rows={2} onChange={(e) => setVision(e.target.value)} />
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Giá trị">
          <Input.TextArea style={{ fontWeight: "500" }} value={values} rows={2} onChange={(e) => setValues(e.target.value)} />
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Link video trang chủ">
          <Input.TextArea style={{ fontWeight: "500" }} value={video} rows={2} onChange={(e) => setVideo(e.target.value)} />
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Giấy phép doanh nghiệp">
          <Input.TextArea style={{ fontWeight: "500" }} value={businessLicense} rows={2} onChange={(e) => setBusinessLicense(e.target.value)} />
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Giấy phép cơ quan">
          <Input.TextArea style={{ fontWeight: "500" }} value={licenseOrgan} rows={2} onChange={(e) => setLicenseOrgan(e.target.value)} />
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Link giấy phép">
          <Input.TextArea style={{ fontWeight: "500" }} value={licenseDetail} rows={2} onChange={(e) => setLicenseDetail(e.target.value)} />
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Lịch sử hình thành">
          <Input.TextArea style={{ fontWeight: "500" }} value={history} rows={5} onChange={(e) => setHistory(e.target.value)} />
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Mạng lưới phủ sóng">
          <Input.TextArea style={{ fontWeight: "500" }} value={networkCoverage} rows={5} onChange={(e) => setNetworkCoverage(e.target.value)} />
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

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Logo">
          <input type='file' accept="image/*" onChange={changeLogo} />
          <div className="flex align-center" style={{ width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
            {fileListLogo !== "" ? (
              <img src={fileListLogo.preview} alt={fileListLogo.name} />
            ) : (<><img src={`${aboutState.logo}`} alt={fileListLogo.name} /></>)}
          </div>
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} wrapperCol={{ offset: 3, }} >
          <Button type="primary" style={{ color: "", padding: "16", display: "flex", alignItems: 'center', fontWeight: "bold" }} htmlType="submit" onClick={handleLogoSubmit} >
            Cập nhật Logo
          </Button>
        </Form.Item>

        <Divider style={{ backgroundColor: '#d4d4d4' }} />

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Ảnh giấy phép">
          <input type='file' accept="image/*" onChange={changeLicenseImage} />
          <div className="flex align-center" style={{ width: 200, height: 'auto', border: "1px solid #cccc", marginTop: 8, padding: 5, objectFit: 'cover' }}>
            {fileLicenseImage !== "" ? (
              <img src={fileLicenseImage.preview} alt={fileLicenseImage.name} />
            ) : (<><img src={`${aboutState.license_img}`} alt={fileLicenseImage.name} /></>)}
          </div>
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} wrapperCol={{ offset: 3, }} >
          <Button type="primary" style={{ color: "", padding: "16", display: "flex", alignItems: 'center', fontWeight: "bold" }} htmlType="submit" onClick={handleLicenseImageSubmit} >
            Cập nhật ảnh giấy phép
          </Button>
        </Form.Item>

        <Divider style={{ backgroundColor: '#d4d4d4' }} />

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Banner đầu trang về chúng tôi">
          <input type='file' accept="image/*" onChange={changeTopBanner} />
          <div className="flex align-center" style={{ position: "relative", width: '100%', height: 'auto', border: "1px solid #cccc", marginTop: 8, padding: 5, objectFit: 'cover' }}>
            {fileTopBanner !== "" ? (
              <img src={fileTopBanner.preview} alt={fileTopBanner.name} />
            ) : (<><img src={`${aboutState.topBanner}`} alt={fileTopBanner.name} /></>)}
          </div>
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} wrapperCol={{ offset: 3, }} >
          <Button type="primary" style={{ color: "", padding: "16", display: "flex", alignItems: 'center', fontWeight: "bold" }} htmlType="submit" onClick={handleBannerTopSubmit} >
            Cập nhật Banner đầu trang Về chúng tôi
          </Button>
        </Form.Item>

        <Divider style={{ backgroundColor: '#d4d4d4' }} />

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Banner giữa trang về chúng tôi">
          <input type='file' accept="image/*" onChange={changeMidBanner} />
          <div className="flex align-center" style={{ position: "relative", width: '100%', height: 'auto', border: "1px solid #cccc", marginTop: 8, padding: 5, objectFit: 'cover' }}>
            {fileMidBanner !== "" ? (
              <img src={fileMidBanner.preview} alt={fileMidBanner.name} />
            ) : (<><img src={`${aboutState.midBanner}`} alt={fileMidBanner.name} /></>)}
          </div>
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} wrapperCol={{ offset: 3, }} >
          <Button type="primary" style={{ color: "", padding: "16", display: "flex", alignItems: 'center', fontWeight: "bold" }} htmlType="submit" onClick={handleBannerMidSubmit} >
            Cập nhật Banner giữa trang Về chúng tôi
          </Button>
        </Form.Item>

        <Divider style={{ backgroundColor: '#d4d4d4' }} />

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Banner cuối trang về chúng tôi">
          <input type='file' accept="image/*" onChange={changeBottomBanner} />
          <div className="flex align-center" style={{ position: "relative", width: '100%', height: 'auto', border: "1px solid #cccc", marginTop: 8, padding: 5, objectFit: 'cover' }}>
            {fileBottomBanner !== "" ? (
              <img src={fileBottomBanner.preview} alt={fileBottomBanner.name} />
            ) : (<><img src={`${aboutState.bottomBanner}`} alt={fileBottomBanner.name} /></>)}
          </div>
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} wrapperCol={{ offset: 3, }} >
          <Button type="primary" style={{ color: "", padding: "16", display: "flex", alignItems: 'center', fontWeight: "bold" }} htmlType="submit" onClick={handleBannerBottomSubmit} >
            Cập nhật Banner cuối trang Về chúng tôi
          </Button>
        </Form.Item>

        <Divider style={{ backgroundColor: '#d4d4d4' }} />

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Banner giới thiệu App">
          <input type='file' accept="image/*" onChange={changeAppBanner} />
          <div className="flex align-center" style={{ position: "relative", width: '100%', height: 'auto', border: "1px solid #cccc", marginTop: 8, padding: 5, objectFit: 'cover' }}>
            {fileAppBanner !== "" ? (
              <img src={fileAppBanner.preview} alt={fileAppBanner.name} />
            ) : (<><img src={`${aboutState.appBanner}`} alt={fileAppBanner.name} /></>)}
          </div>
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} wrapperCol={{ offset: 3, }} >
          <Button type="primary" style={{ color: "", padding: "16", display: "flex", alignItems: 'center', fontWeight: "bold" }} htmlType="submit" onClick={handleAppBanner} >
            Cập nhật Banner giới thiệu App
          </Button>
        </Form.Item>

        <Divider style={{ backgroundColor: '#d4d4d4' }} />

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Banners trang chủ">
          <input type="file" accept="image/*" id="file-upload" multiple onChange={changeBanners} />
          {fileListBanners.length > 0 ? (
            <>
              {fileListBanners.map((e, index) => (
                <div className="peer hover:bg-gray-300 flex align-center" style={{ position: "relative", width: '100%', height: 'auto', border: "1px solid #cccc", marginTop: 8, padding: 5, objectFit: 'cover' }}>
                  <div id={index} className="peer-hover:flex" style={{ position: 'absolute', right: 3, cursor: "pointer" }}>
                    <DeleteOutlined className="hover:bg-gray-100" onClick={handleDel} />
                  </div>
                  <img src={e.preview} className="peer" />
                </div>
              ))}
              {/* <div className="peer hover:bg-gray-300 flex align-center" style={{ position: "relative", width: '100%', height: 'auto', border: "1px solid #cccc", marginTop: 8, padding: 5, objectFit: 'cover' }}>
                <div className="peer-hover:flex" style={{ position: 'absolute', right: 3, cursor: "pointer" }}>
                  <DeleteOutlined className="hover:bg-gray-100" onClick={handleDel} />
                </div>
                <img src={fileListBanners.preview} className="peer" />
              </div> */}
            </>
          ) : (
            <>
              {aboutState.banners && (
                <>
                  {aboutState.banners.map((e, index) => (
                    <div className="peer hover:bg-gray-300 flex align-center" style={{ position: "relative", width: '100%', height: 'auto', border: "1px solid #cccc", marginTop: 8, padding: 5, objectFit: 'cover' }}>
                      <div className="peer-hover:flex" style={{ position: 'absolute', right: 3, cursor: "pointer" }}>
                        <DeleteOutlined className="hover:bg-gray-100" onClick={handleDel} />
                      </div>
                      <img src={e} className="peer" alt={e} />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} wrapperCol={{ offset: 3, }} >
          <Button type="primary" style={{ color: "", padding: "16", display: "flex", alignItems: 'center', fontWeight: "bold" }} htmlType="submit" onClick={handleBannersSubmit} >
            Cập nhật Banner đầu trang Về chúng tôi
          </Button>
        </Form.Item>

        <Divider style={{ backgroundColor: '#d4d4d4' }} />

        {/* <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }}
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
            Gửi
          </Button>
        </Form.Item> */}
      </Form>
    </>
  );
}

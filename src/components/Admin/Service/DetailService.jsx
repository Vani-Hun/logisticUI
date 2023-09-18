import {Descriptions, Button } from "antd";
import { useState, useContext, useEffect } from "react";
import { END_POINT } from "../../../utils/constant";
import { MainContext } from "../../../context/MainContext";
import React from "react";
import axios from "axios";
import AddParticipantToService from "./AddParticipantToService";
import AddFeature from "./AddFeature";
import EditFeature from "./EditFeature"; 
import EditBannersService from "./EditBannersService";
import AddPrice from "./AddPrice";
import AddPriceList from "./AddPriceList";
import ConfirmModal from "../../ConfirmModal";
import AddQuote from "./AddQuote";
import EditQuote from "./EditQuote";

// import SplitProduct from "./SplitProduct";
function DetailService({ onClose, refetchData, data }) {
  const { accessToken } = useContext(MainContext);

  const [isDisable, setIsDisable] = useState(false);
  const [isAddPartiToSer, setIsAddPartiToSer] = useState(false)
  const [isDeleteParVisible, setIsDeleteParVisible] = useState(false);
  const [isAddFeature, setIsAddFeature] = useState(false);
  const [isEditFeature, setIsEditFeature] = useState(false);
  const [isDeleteFeature, setIsDeleteFeature] = useState(false);
  const [isAddQuote, setIsAddQuote] = useState(false);
  const [isEditQuote, setIsEditQuote] = useState(false);
  const [isDeleteQuote, setIsDeleteQuote] = useState(false);
  const [isEditBanners, setIsEditBanners] = useState(false)
  const [isAddPrice, setIsAddPrice] = useState(false);
  const [isAddPriceList, setIsAddPriceList] = useState(false);
  const [loading, setLoading] = useState(false);

  const [parData, setParData] = useState("");
  const [nameDetail, setNameDetail] = useState("");
  const [dataFeature, setDataFeature] = useState("");
  const [dataQuote, setDataQuote] = useState("");
  const [idFeature, setIdFeature] = useState("");
  const [idQuote, setIdQuote] = useState("");
  const [dataEditFeature, setDataEditFeature] = useState("");
  const [dataEditQuote, setDataEditQuote] = useState("");
  const [dataBanners, setDataBanners] = useState('')
  
  const hideId = '*'.repeat(data._id.length)

  //lấy thông tin đối tượng trong service
  const getParData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${END_POINT}/participant/service/${data._id}`
      );
      console.log("đối tượng", res.data.data);
      const parData = res.data.data;
      setLoading(false);
      setParData(parData);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getParData();
  }, [data, isAddPartiToSer, isDeleteParVisible]);


  const acceptAddParticipant = async (dataPar) => {
    console.log("🚀 ~ file: DetailService.jsx:76 ~ acceptAddParticipant ~ dataPar:", dataPar)
    setLoading(true);
    // setIsAddParti(true);

    try {
      const result = await axios({
        url: `${END_POINT}/admin/service/participant/${data._id}`,
        method: "post",
        data: {nameDetail: dataPar},
        headers: { 'x-access-token': `${accessToken}` },
      });
      console.log("RESULT",result);
      if (result.status === 200) {
        alert("Thêm đối tác thành công");
        setLoading(false);
        setIsAddPartiToSer(false);
        getParData();
      }
    } catch (error) {
      console.log('ERROR: ',error);
      setLoading(false);
      setIsAddPartiToSer(false);
    }
  };
  const acceptDeletePar = async () => {
    setLoading(true);
    setIsDisable(true);
    try {
      console.log('====================================');
      console.log({name_detail: nameDetail});
      console.log('====================================');
      const res = await axios({
        url: `${END_POINT}/admin/service/participant/${data._id}`,
        data: { name_detail: nameDetail },
        method: "Delete",
        headers: { 'x-access-token': `${accessToken}` },
      });
      if (res.status === 200) {
        alert("Xoa thanh cong");
      }
      setLoading(false);
      setIsDisable(false);
      setIsDeleteParVisible(false);
      // fetchData();
    } catch (error) {
      alert(`đã có lỗi:  ${error} `);
      setLoading(false);
      setIsDeleteParVisible(false);
    }
  };

  //Feature
  useEffect(() => {
    const getDataFeature = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `${END_POINT}/feature/service/${data._id}`
        );
        console.log("Feature nè",result.data.data.feature);
        setLoading(false);
        setDataFeature(result.data.data);
      } catch (error) {
        setDataFeature(data.features);
        setLoading(false);
        console.log(error);
      }
    };
    getDataFeature();
  }, [data, isAddFeature, isDeleteFeature, isEditFeature]);

  const acceptAddFeature = async (dataFea) => {
    dataFea.forEach((data)=>{
      console.log("🚀 ~ file: DetailService.jsx:143 ~ acceptAddFeature ~ dataFea:", data)
    })
    try {
      const result = await axios({
        url: `${END_POINT}/admin/feature/${data._id}`,
        method: "post",
        data: dataFea,
        headers: { 'x-access-token': `${accessToken}` },
      });
      console.log('Result',result);
      if (result.status === 200) {
        alert("Thêm chức năng thành công");
        setLoading(false);
        setIsAddFeature(false);
        // fetchData();
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };
  const acceptDeleteFeature = async () => {
    setLoading(true);
    setIsDisable(true);
    console.log("🚀 ~ file: DetailService.jsx:178 ~ acceptDeleteFeature ~ idFeature:", idFeature)
    try {
      const res = await axios({
        url: `${END_POINT}/admin/feature/${idFeature}`,
        method: "Delete",
        headers: { 'x-access-token': `${accessToken}` },
      });
      if (res.status === 200) {
        alert("Xoa thanh cong");
        setLoading(false);
        setIsDisable(false);
        setIsDeleteFeature(false);
        // fetchData();
      }
    } catch (error) {
      console.log(error);
      alert(`đã có lỗi:  ${error} `);
      setLoading(false);
      setIsDisable(false);
      setIsDeleteFeature(false);
    }
  };
  
  //Quote
  useEffect(() => {
    const getDataQuote = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `${END_POINT}/quote/service/${data._id}`
        );
        console.log("Quote nè",result.data.data);
        setLoading(false);
        setDataQuote(result.data.data);
      } catch (error) {
        setDataQuote(data.features);
        setLoading(false);
        console.log(error);
      }
    };
    getDataQuote();
  }, [data, isAddQuote, isDeleteQuote, isEditQuote]);

  const acceptAddQuote = async (dataQuote) => {
    dataQuote.forEach((data)=>{
      console.log("🚀 ~ file: DetailService.jsx:143 ~ acceptAddQuote ~ dataQuote:", data)
    })
    try {
      const result = await axios({
        url: `${END_POINT}/admin/quote/${data._id}`,
        method: "post",
        data: dataQuote,
        headers: { 'x-access-token': `${accessToken}` },
      });
      console.log('Result',result);
      if (result.status === 200) {
        alert("Thêm chức năng thành công");
        setLoading(false);
        setIsAddQuote(false);
        // fetchData();
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };
  const acceptDeleteQuote = async () => {
    setLoading(true);
    setIsDisable(true);
    console.log("🚀 ~ file: DetailService.jsx:178 ~ acceptDeleteQuote ~ idQuote:", idQuote)
    try {
      const res = await axios({
        url: `${END_POINT}/admin/quote/${idQuote}`,
        method: "Delete",
        headers: { 'x-access-token': `${accessToken}` },
      });
      if (res.status === 200) {
        alert("Xoa thanh cong");
        setLoading(false);
        setIsDisable(false);
        setIsDeleteQuote(false);
        // fetchData();
      }
    } catch (error) {
      console.log(error);
      alert(`đã có lỗi:  ${error} `);
      setLoading(false);
      setIsDisable(false);
      setIsDeleteQuote(false);
    }
  };
  //Banners

  useEffect(() => {
    const getDataBanners = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `${END_POINT}/service/${data._id}`
        );
        console.log("Banners nè",result.data.data);
        setLoading(false);
        setDataBanners(result.data.data);
      } catch (error) {
        setDataBanners(data);
        setLoading(false);
        console.log(error);
      }
    };
    getDataBanners();
  }, [data, isEditBanners]);
  

  const acceptAddPrice = async (dataPrice) => {
    console.log(dataPrice);
    try {
      const result = await axios({
        url: `${END_POINT}/admin/price/create/${data._id}`,
        method: "post",
        data: dataPrice,
        headers: { 'x-access-token': `${accessToken}` },
      });
      console.log(result);
      if (result.status === 200) {
        alert("Thêm khoảng cách thành công");
        setLoading(false);
        setIsAddPrice(false);
        // fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const acceptAddPriceList = async (dataPL) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/priceList/${data._id}`,
        method: "post",
        data: dataPL,
        headers: { 'x-access-token': `${accessToken}` },
      });
      console.log(result);
      if (result.status === 200) {
        alert("Thêm khoảng cách thành công");
        setLoading(false);
        setIsAddPriceList(false);
        // fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Descriptions
        title="Thông tin chi tiết đơn hàng"
        layout="vertical"
        bordered
      >
        <Descriptions.Item label="Mã dịch vụ " span={3}>
          {hideId}
        </Descriptions.Item>
        <Descriptions.Item label="Tên dịch vụ" span={3}>
          {data.name}
        </Descriptions.Item>
        <Descriptions.Item label="Đối tượng" span={3}>
          <div style={{width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10}}>
            <Button
              onClick={() => {
                setIsAddPartiToSer(true);
              }}
            >
              Thêm mới
            </Button>
          </div>
          <div className="flex items-end">
            <table border="1" style={{width: "100%"}}>
                {parData &&
                  parData.map((par) => (
                    <tbody style={{width: "100%"}}>
                        <tr key={par._id} style={{justifyContent:'center', width: "100%"}}>
                          <td style={{width: '10%'}}>
                            <img
                              src={par.banner}
                              className="h-10 w-10 rounded-full"
                              alt=""
                            ></img>
                          </td>
                          <td style={{width: '25%'}}>{par.name}</td>
                          <td style={{width: '50%'}}>{par.nameDetail}</td>
                          <td style={{width: '15%', right: 0}}>
                            <button
                              style={{padding: '20px 0', marginLeft: '50%'}}
                              className="hover:text-red-600"
                              onClick={() => {
                                setNameDetail(par.name_detail);
                                setIsDeleteParVisible(true);
                              }}
                            >
                              Xoá
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td colspan='4'><hr/></td>
                        </tr>
                      </tbody>
                        ))}
            </table>
          </div>
        </Descriptions.Item>
        {/* Tính năng */}
        <Descriptions.Item label="Tính năng" span={3}>
          <div style={{width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10}}>
            <Button
              onClick={() => {
                setIsAddFeature(true);
              }}
            >
              Thêm mới
            </Button>
          </div>
          <div className="flex items-end " >
            <table border="1" style={{width: "100%"}}>
              {dataFeature.feature &&
                dataFeature.feature.map((fea) => (
                  <tbody >
                      <tr key={fea._id} style={{justifyContent:'center'}}>
                          <td style={{width: '10%'}}>
                            <img
                            src={fea.logo}
                            className="h-10 w-10 rounded-full"
                            alt=""
                            ></img>
                          </td>
                          <td style={{width: '25%'}}>{fea.name}</td>
                          <td style={{width: '50%'}}>{fea.detail}</td>
                          <td style={{width: '15%', right: 0}}>
                            <button
                              style={{padding:10, marginLeft: '50%'}}
                              className="hover:text-red-600"
                              onClick={() => {
                                setIdFeature(fea._id);
                                setIsDeleteFeature(true);
                              }}
                            >
                              Xoá
                            </button>
                            <br style={{height: 4, backgroundColor:'black'}}/>
                            <button
                              style={{padding:10, marginLeft: '50%'}}
                              className="hover:text-blue-600"
                              onClick={() => {
                                setIsEditFeature(true);
                                setDataEditFeature(fea);
                              }}
                            >
                              Sửa
                            </button>
                          </td>
                      </tr>
                      <tr>
                        <td colspan='4'><hr/></td>
                      </tr>
                  </tbody>
                ))
              }
            </table>
          </div>
        </Descriptions.Item>
        {/* Quote */}
        <Descriptions.Item label="Quote" span={3}>
          <div style={{width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10}}>
            <Button
              onClick={() => {
                setIsAddQuote(true);
              }}
            >
              Thêm mới
            </Button>
          </div>
          <div className="flex items-end " >
          <table border="1" style={{width: "100%"}}>
              {dataQuote &&
                dataQuote.map((quo) => (
                  <tbody >
                      <tr key={quo._id} style={{justifyContent:'center'}} className="items-center">
                          <td style={{width: '10%'}}>
                            <img
                            src={quo.avatar}
                            className="h-10 w-10 rounded-full"
                            alt=""
                            ></img>
                          </td>
                          <td style={{width: '10%'}}>{quo.name}</td>
                          <td style={{width: '30%'}}>{quo.description}</td>
                          <td style={{width: '40%'}}>{quo.quote}</td>
                          <td style={{width: '10%', right: 0}}>
                            <button
                              style={{padding:10, marginLeft: '50%'}}
                              className="hover:text-red-600"
                              onClick={() => {
                                setIdQuote(quo._id);
                                setIsDeleteQuote(true);
                              }}
                            >
                              Xoá
                            </button>
                            <br style={{height: 4, backgroundColor:'black'}}/>
                            <button
                              style={{padding:10, marginLeft: '50%'}}
                              className="hover:text-blue-600"
                              onClick={() => {
                                setIsEditQuote(true);
                                setDataEditQuote(quo);
                              }}
                            >
                              Sửa
                            </button>
                          </td>
                      </tr>
                      <tr>
                        <td colspan='4'><hr/></td>
                      </tr>
                  </tbody>
                ))
              }
            </table>
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Banners" span={3}>
          <div style={{width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10}}>
            <Button
              onClick={() => {
                setIsEditBanners(true);
              }}
            >
              Cập nhật
            </Button>
          </div>
          <div className="flex items-end " >
            <table border="1" style={{width: "100%"}}>
              <thead>
                <tr>
                  <th style={{width: "20%", textAlign:'left'}}>Logo</th>
                  <th style={{width: "20%", textAlign:'left'}}>Sub</th>
                  <th style={{width: "20%", textAlign:'left'}}>Quote</th>
                  <th style={{width: "20%", textAlign:'left'}}>Top</th>
                  <th style={{width: "20%", textAlign:'left'}}>Bottom</th>

                </tr>
              </thead>
              <tbody >
                  <tr key={dataBanners._id}>
                      <td style={{width: "20%"}}>
                        <img
                          src={dataBanners.logo}
                          className="h-16 w-16"
                          alt=""
                        ></img></td>
                      <td style={{width: "20%"}}>
                        <img
                          src={dataBanners.sub_banner}
                          className="h-16 w-16"
                          alt=""
                        ></img>
                      </td>
                      <td style={{width: "20%"}}>
                        <img
                          src={dataBanners.quote_banner}
                          className="h-16 w-16"
                          alt=""
                        ></img>
                      </td>
                      <td style={{width: "20%"}}>
                        <img
                          src={dataBanners.banner}
                          className="h-16 w-16"
                          alt=""
                        ></img>
                      </td>
                      <td style={{width: "20%"}}>
                        <img
                          src={dataBanners.bottom_banner}
                          className="h-16 w-16"
                          alt=""
                        ></img>
                      </td>
                  </tr>
              </tbody>
            </table>
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Bảng giá" span={3}>
          <div>{data.price}</div>
          <div style={{width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10}}>
            <Button
              style={{marginLeft: "85%", marginBottom: 10}}
              onClick={() => {
                setIsAddPrice(true);
              }}
            >
              Tạo bảng giá mới
            </Button>
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Price File" span={3}>
        <div style={{width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10}}>
            <Button
              style={{marginLeft: "85%", marginBottom: 10}}
              onClick={() => {
                setIsAddPriceList(true);
              }}
            >
              Tạo price List mới
            </Button>
          </div>
          {data.price_files.map((price) => (
            <div className="flex items-end  ">
              <div>{price.province}</div>
              <img
                src={`${END_POINT}/public/${price.file}`}
                className="h-10 w-10 rounded-full"
                alt=""
              ></img>

              <p>&nbsp;&nbsp;</p>
              <button
                className="hover:text-red-600"
                // onClick={() => {
                //   setIdFeature(dis);
                //   setIsDeleteFeature(true);
                // }}
              >
                Xoá
              </button>
              <p>&nbsp;&nbsp;</p>
              <button className="hover:text-blue-600">Sửa</button>
              <br />
              <p></p>
            </div>
          ))}
        </Descriptions.Item>
      </Descriptions>
      <Button
        style={{marginLeft: "90%"}}
        size="large"
        className={
          "hover:bg-red-500 hover:border-red-700 hover:text-white border-none float-right"
        }
        onClick={onClose}
      >
        x
      </Button>

      {isAddPartiToSer && (
        <AddParticipantToService
          data={parData}
          isVisible={isAddPartiToSer}
          loading={loading}
          onClick={acceptAddParticipant}
          onClose={() => setIsAddPartiToSer(false)}
        />
      )}
      {isDeleteParVisible && (
        <ConfirmModal
          isVisible={isDeleteParVisible}
          text={`xóa par`}
          onClose={() => setIsDeleteParVisible(false)}
          loading={loading}
          disable={isDisable}
          onOk={acceptDeletePar}
        />
      )}

      {isAddFeature && (
        <AddFeature
          isVisible={isAddFeature}
          loading={loading}
          onClick={acceptAddFeature}
          onClose={() => setIsAddFeature(false)}
        />
      )}
      {isEditFeature && (
        <EditFeature
          onClose={() => setIsEditFeature(false)}
          refetchData={()=>setIsEditFeature(false)}
          data={dataEditFeature}
        />
      )}
      {isDeleteFeature && (
        <ConfirmModal
          isVisible={isDeleteFeature}
          text={`xóa tính năng`}
          onClose={() => setIsDeleteFeature(false)}
          loading={loading}
          disable={isDisable}
          onOk={acceptDeleteFeature}
        />
      )}
      {isAddQuote && (
        <AddQuote
          isVisible={isAddQuote}
          loading={loading}
          onClick={acceptAddQuote}
          onClose={() => setIsAddQuote(false)}
        />
      )}
      {isEditQuote && (
        <EditQuote
          onClose={() => setIsEditQuote(false)}
          refetchData={()=>setIsEditQuote(false)}
          data={dataEditQuote}
        />
      )}
      {isDeleteQuote && (
        <ConfirmModal
          isVisible={isDeleteQuote}
          text={`xóa tính năng`}
          onClose={() => setIsDeleteQuote(false)}
          loading={loading}
          disable={isDisable}
          onOk={acceptDeleteQuote}
        />
      )}
      {isEditBanners && (
        <EditBannersService
          onClose={() => setIsEditBanners(false)}
          data={data}
        />
      )}

      {isAddPrice && (
        <AddPrice
          isVisible={isAddPrice}
          loading={loading}
          onClick={acceptAddPrice}
          onClose={() => setIsAddPrice(false)}
        />
      )}
      {isAddPriceList && (
        <AddPriceList
          isVisible={isAddPriceList}
          loading={loading}
          onClick={acceptAddPriceList}
          onClose={() => setIsAddPriceList(false)}
        />
      )}
    </>
  );
}
export default DetailService;

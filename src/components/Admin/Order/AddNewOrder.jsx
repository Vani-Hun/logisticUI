import { useState, useContext, useEffect } from "react";
import { Form, Input, DatePicker, Button, Select, Space } from "antd";
import { END_POINT } from "../../../utils/constant";
import { MainContext } from "../../../context/MainContext";
import dataAddressList from "../../../data/dvhcvn.json";
import axios from "axios";
const { Item } = Form;
const { Option } = Select;
function AddNewOrder({ isVisible, refetchData, onClose, disable }) {
  const { accessToken } = useContext(MainContext);
  const unidecode = require("unidecode");
  const [isDisable, setIsDisable] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [customerIdList, setCustomerIdList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [postOfficeList, setPostOfficeList] = useState([]);
  const [companyShippingList, setCompanyShippingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [arrCityList, setArrCityList] = useState([]);
  const [arrDistrictSenderList, setArrDistrictSenderList] = useState([]);
  const [arrDistrictReceivedList, setArrDistrictReceivedList] = useState([]);
  const [arrPostOfficeSenderList, setArrPostOfficeSenderList] = useState([]);
  const [arrPostOfficeReceivedList, setArrPostOfficeReceivedList] = useState(
    []
  );
  const [data, setData] = useState({
    origin: "",
    destination: "",
    // date: "",
    pickup_staff: "",
    customer: "",
    note: "",
    sender: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
    receiver: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
    shipping: {
      type_shipping: "",
      standard_fee: "",
      receiver_fee: "",
      fuel_surcharge: "0",
      other: "0",
      remote_areas_surcharge: "0",
      VAT_code: "",
      VAT_fee: "",
      before_discount: "",
      insurance_fee: "",
      after_discount: "",
      after_discount_tax: "",
      // discount: "",
    },
    product: {
      product_name: "",
      cash_payment: "",
      quantity: "0",
      weight: "0",
      product_types: "",
      goods_value: "",
      // note: "",
      transportation: "",
    },
    cod: {
      cod: "",
      fee: "",
    },
    company: {
      name: "",
      address: "",
    },
  });

  const [dataShipping, setDataShipping] = useState({
    type_shipping: "",
    standard_fee: "",
    receiver_fee: "",
    fuel_surcharge: "0",
    other: "0",
    remote_areas_surcharge: "0",
    VAT_code: "",
    VAT_fee: "",
    before_discount: "",
    insurance_fee: "",
    after_discount: "",
    after_discount_tax: "",
    // discount: "0",
  });
  const [dataAddressSender, setDataAddressSender] = useState({
    city: "",
    district: "",
    post_office: "",
  });
  const [dataAddressReceiver, setDataAddressReceiver] = useState({
    city: "",
    district: "",
    post_office: "",
  });
  const [dataSender, setDataSender] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [dataReceiver, setDataReceiver] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [dataCustomer, setDataCustomer] = useState({
    address: "",
    email: "",
    name: "",
    phone: "",
    _id: "",
  });
  // const [dataOrigin, setDataOrigin] = useState({
  //   loading: "",
  //   address: "",
  // });
  // const [dataDestination, setDataDestination] = useState({
  //   unloading: "",
  //   address: "",
  // });
  const [dataProduct, setDataProduct] = useState({
    product_name: "",
    cash_payment: "",
    quantity: 0,
    weight: 0,
    product_types: "",
    goods_value: "",
    // note: "",
    transportation: "",
  });
  const [dataCOD, setDataCOD] = useState({
    cod: "",
    fee: "",
  });
  const [dataCompany, setDataCompany] = useState({
    name: "",
    address: "",
  });

  const [dataType_Shipping, setDataType_Shipping] = useState("");

  const [dataCustomerId, setCustomerId] = useState("");
  const getServiceList = async () => {
    try {
      const res = await axios.get(`${END_POINT}/service`, {
        headers: { "x-access-token": `${accessToken}` },
      });
      // console.log(res);
      setServiceList(res.data.data.service);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerList = async () => {
    try {
      const res = await axios.get(`${END_POINT}/customer`, {
        headers: { "x-access-token": `${accessToken}` },
      });
      setCustomerIdList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const getWarehouse = async () => {
  //   try {
  //     const res = await axios.get(`${END_POINT}/warehouse`, {
  //       headers: { "x-access-token": `${accessToken}` },
  //     });
  //     console.log("wareHourse", res);
  //     setWarehouseList(res.data.data.warehouses);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const getStaff = async () => {
    try {
      const res = await axios({
        url: `${END_POINT}/admin/staff`,

        method: "get",

        headers: { "x-access-token": `${accessToken}` },
      });

      setStaffList(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getPostOfficeSender = async (province, district) => {
    try {
      const res = await axios({
        url: `${END_POINT}/admin/post-office?province=${province}&district=${district}`,

        method: "get",

        headers: { "x-access-token": `${accessToken}` },
      });
      setArrPostOfficeSenderList(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getPostOfficeReceiver = async (province, district) => {
    try {
      const res = await axios({
        url: `${END_POINT}/admin/post-office?province=${province}&district=${district}`,

        method: "get",

        headers: { "x-access-token": `${accessToken}` },
      });
      setArrPostOfficeReceivedList(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getShippingCost = async () => {
    try {
      const res = await axios({
        url: `${END_POINT}/admin/order/shipping-cost`,

        method: "post",
        headers: { "x-access-token": `${accessToken}` },
        data: {
          province_origin: dataAddressSender.city,
          district_origin: dataAddressSender.district,
          province_destination: dataAddressReceiver.city,
          district_destination: dataAddressReceiver.district,
          weight: dataProduct.weight,
          // type_shipping: dataShipping.type_shipping,
          type_shipping: dataType_Shipping,
          discount: 0,
          // discount: dataShipping.discount,
          insurance_fee: dataShipping.insurance_fee,
        },
      });
      const VAT_feeToString = res.data.data.shipping_cost.VAT_fee.toString();
      const after_discountToString =
        res.data.data.shipping_cost.after_discount.toString();
      const after_discount_taxToString =
        res.data.data.shipping_cost.after_discount_tax.toString();
      const standard_feeToString =
        res.data.data.shipping_cost.standard_fee.toString();
      console.log("getShippingCost", res.data.data.shipping_cost);
      setDataShipping({
        ...dataShipping,
        // discount: res.data.data.shipping_cost.discount,
        after_discount_tax: after_discount_taxToString,
        standard_fee: standard_feeToString,
        after_discount: after_discountToString,
        before_discount: res.data.data.shipping_cost.before_discount,
        VAT_fee: VAT_feeToString,
        receiver_fee: res.data.data.shipping_cost.before_discount,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const allConditions =
      dataAddressSender.city &&
      dataAddressSender.district &&
      dataAddressReceiver.city &&
      dataAddressReceiver.district &&
      dataShipping.type_shipping &&
      dataProduct.weight;
    // data.discount;

    if (allConditions) {
      getShippingCost();
    }
  }, [
    dataAddressSender.city,
    dataAddressSender.district,
    dataAddressReceiver.city,
    dataAddressReceiver.district,
    dataShipping.type_shipping,
    dataProduct.weight,
    // data.discount,
  ]);

  const getCompanyShipping = async () => {
    try {
      const res = await axios({
        url: `${END_POINT}/admin/customer?sort=1`,

        method: "get",
        headers: { "x-access-token": `${accessToken}` },
      });
      setCompanyShippingList(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCompanyChange = async (e) => {
    try {
      const res = await axios({
        url: `${END_POINT}/admin/customer/detail/${e}`,

        method: "get",
        headers: { "x-access-token": `${accessToken}` },
      });
      setDataCustomer({
        address: res.data.data[0].address,
        email: res.data.data[0].email,
        name: res.data.data[0].name,
        phone: res.data.data[0].phone,
        _id: res.data.data[0]._id,
      });
      setData({
        ...data,
        customer: res.data.data[0]._id,
      });
      setDataCompany({
        name: res.data.data[0].name,
        address: res.data.data[0].address,
      });
      setDataSender({
        name: res.data.data[0].name,
        phone: res.data.data[0].phone,
        email: res.data.data[0].email,
        address: res.data.data[0].address,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const searchAddressList = () => {
    const filteredCity = dataAddressList.data.filter((city) =>
      city.hasOwnProperty("level1_id")
    );
    setArrCityList(filteredCity);
  };

  const handleCitySenderChange = (value) => {
    const filteredDistricts = dataAddressList.data.filter(
      (address) => address.name === value
    );
    setArrDistrictSenderList(filteredDistricts[0].level2s);
    setDataAddressSender({
      ...dataAddressSender,
      city: value,
    });
  };

  const handleDistrictSenderChange = (value) => {
    setDataAddressSender({
      ...dataAddressSender,
      district: value,
    });
    const modifiedCity = unidecode(dataAddressSender.city)
      .replace(/\s+/g, "")
      .toLowerCase();
    const modifiedDistrict = unidecode(value).replace(/\s+/g, "").toLowerCase();
    getPostOfficeSender(modifiedCity, modifiedDistrict);
  };

  const handleCityReceivedChange = (value) => {
    const filteredDistricts = dataAddressList.data.filter(
      (address) => address.name === value
    );
    setArrDistrictReceivedList(filteredDistricts[0].level2s);
    setDataAddressReceiver({
      ...dataAddressReceiver,
      city: value,
    });
  };

  const handleDistrictReceivedChange = (value) => {
    const modifiedCity = unidecode(dataAddressReceiver.city)
      .replace(/\s+/g, "")
      .toLowerCase();
    const modifiedDistrict = unidecode(value).replace(/\s+/g, "").toLowerCase();
    getPostOfficeReceiver(modifiedCity, modifiedDistrict);

    setDataAddressReceiver({
      ...dataAddressReceiver,
      district: value,
    });
  };

  const handleChangeService = (e) => {
    const modifiedService = e.toLowerCase();
    setDataShipping({
      ...dataShipping,
      type_shipping: modifiedService,
    });
    setDataType_Shipping(e);
  };

  const handleProducCostChange = async (e) => {
    console.log("e", e.target.value);
    console.log("before_discount", dataShipping.before_discount);
    try {
      const res = await axios({
        url: `${END_POINT}/admin/order/insurance-fee`,

        method: "post",
        headers: { "x-access-token": `${accessToken}` },
        data: {
          goods_value: e.target.value,
          before_discount: dataShipping.before_discount,
          discount: 30000,
          // discount: dataShipping.discount,
        },
      });
      const insurance_feeToString =
        res.data.data.shipping_cost.insurance_fee.toString();
      const VAT_feeToString = res.data.data.shipping_cost.VAT_fee.toString();
      const after_discountToString =
        res.data.data.shipping_cost.after_discount.toString();
      const after_discount_taxToString =
        res.data.data.shipping_cost.after_discount_tax.toString();
      setDataShipping({
        ...dataShipping,
        insurance_fee: insurance_feeToString,
        VAT_fee: VAT_feeToString,
        after_discount: after_discountToString,
        after_discount_tax: after_discount_taxToString,
        before_discount: res.data.data.shipping_cost.before_discount,
      });
      setDataProduct({
        ...dataProduct,
        goods_value: e.target.value,
      });
    } catch (e) {
      console.log(e);
    }
  };

  function generateVATCode() {
    const min = 100000000;
    const max = 999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const takeVATCode = () => {
    const VATCodeNew = generateVATCode();
    const VATCodeString = VATCodeNew.toString();
    setDataShipping({
      ...dataShipping,
      VAT_code: VATCodeString,
    });
  };

  useEffect(() => {
    getServiceList();
    // getWarehouse();
    getStaff();
    searchAddressList();
    takeVATCode();
    getCompanyShipping();
  }, []);

  // const handleDataProduct = () => {
  //   const productNameArray = dataProduct.name.split(",");
  //   const productQuantityArray = dataProduct.quantity.split(",");
  //   // const productUnitArray = dataProduct.unit.split(",");
  //   const productNoteArray = dataProduct.note.split(",");
  //   // console.log(productNameArray);
  //   // console.log(productQuantityArray);
  //   // console.log(dataProduct);
  //   const arr = [];
  //   var obj = {};
  //   // const result = productNameArray.map((pro) => ({
  //   //   ...obj,
  //   //   name: pro,
  //   // }));
  //   // const result1 = productQuantityArray.map((pro) => ({
  //   //   ...obj,
  //   //   quantity: pro,
  //   // }));
  //   // const result2 = productNoteArray.map((pro) => ({
  //   //   ...obj,
  //   //   note: pro,
  //   // }));
  //   // const result3 = productUnitArray.map((pro) => ({
  //   //   ...obj,
  //   //   unit: pro,
  //   // }));
  //   // console.log(result);
  //   // console.log(result1);
  //   // console.log(result2);
  //   // console.log(result3);
  //   for (var a = 0; a < productNameArray.length; a++) {
  //     // console.log(productNameArray[i]);
  //     obj = {
  //       ...obj,
  //       name: productNameArray[a],
  //     };
  //   }
  //   // console.log(arr);
  //   for (var i = 0; i < productQuantityArray.length; i++) {
  //     obj = {
  //       ...obj,
  //       quantity: productQuantityArray[i],
  //     };
  //   }
  //   // for (var j = 0; j < productUnitArray.length; j++) {
  //   //   obj = {
  //   //     ...obj,
  //   //     unit: productUnitArray[j],
  //   //   };
  //   // }
  //   for (var z = 0; z < productNoteArray.length; z++) {
  //     obj = {
  //       ...obj,
  //       note: productNoteArray[z],
  //     };
  //     arr.push(obj);
  //   }

  //   // console.log(arr);
  //   return arr;
  // };

  const acceptAddNewOrder = async () => {
    setLoading(true);
    // setIsDisable(true);
    try {
      await axios.post(`${END_POINT}/admin/order/`, data, {
        headers: { "x-access-token": `${accessToken}` },
      });
      setLoading(false);
      setIsDisable(false);
      refetchData();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {isVisible && (
        <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center ">
          <div className="relative h-[80vh] w-[70vw] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
            <div className="flex justify-between items-center gap-y-3">
              <span className="text-xl uppercase font-bold h-fit">
                Thêm Order
              </span>
              <Button
                size="large"
                disabled={isDisable}
                className={
                  !disable &&
                  "hover:bg-red-500 hover:border-red-700 hover:text-white border-none"
                }
                onClick={onClose}
              >
                x
              </Button>
            </div>

            <Form
              name="complex-form"
              onFinish={acceptAddNewOrder}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
            >
              <div className="flex justify-between items-center gap-y-3">
                <span className="text-x3 uppercase font-bold h-fit p-4">
                  Thông tin cơ bản
                </span>
              </div>

              <Form.Item label="Ngày gửi hàng">
                <Form.Item
                  name="date"
                  noStyle
                  rules={[{ required: true, message: "Date is required" }]}
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    // onChange={(e) => {
                    //   setData({
                    //     ...data,
                    //     date: e.format("DD/MM/YYYY"),
                    //   });
                    // }}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item label="NV nhận hàng">
                <Space>
                  <Form.Item
                    name="staff"
                    noStyle
                    rules={[{ required: true, message: "Staff is required" }]}
                  >
                    <Select
                      allowClear
                      placeholder="Chọn nhân viên nhận hàng"
                      style={{ width: 300 }}
                      showSearch
                      onChange={(_, option) =>
                        setData({ ...data, pickup_staff: option?.value })
                      }
                    >
                      {staffList.map((staff) => (
                        <Option value={staff._id} key={staff._id}>
                          {staff.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Space>
              </Form.Item>

              <Form.Item label="Dịch vụ">
                <Space>
                  <Form.Item
                    name="service"
                    noStyle
                    rules={[
                      { required: false, message: "service is required" },
                    ]}
                  >
                    <Select
                      allowClear
                      placeholder="Chọn dịch vụ"
                      style={{ width: 300 }}
                      showSearch
                      onChange={handleChangeService}
                    >
                      {serviceList.map((service) => (
                        <Option value={service.name} key={service._id}>
                          {service.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Space>
              </Form.Item>
              <Form.Item label="PT thanh toán">
                <Space>
                  <Form.Item
                    name="payment"
                    noStyle
                    rules={[
                      { required: true, message: "cash_payment is required" },
                    ]}
                  >
                    <Select
                      allowClear
                      placeholder="Chọn Pt thanh toán"
                      style={{ width: 300 }}
                      showSearch
                      onChange={(_, option) =>
                        setDataProduct({
                          ...dataProduct,
                          cash_payment: option?.value,
                        })
                      }
                    >
                      <Option value="CC_CASH">CC_CASH</Option>
                      <Option value="PP_CASH">PP_CASH</Option>
                      <Option value="PP_PM">PP_PM</Option>
                    </Select>
                  </Form.Item>
                </Space>
              </Form.Item>

              <Form.Item label="Mô tả">
                <Space>
                  <Form.Item
                    name="description"
                    noStyle
                    rules={[
                      { required: true, message: "Description is required" },
                    ]}
                  >
                    <Select
                      allowClear
                      placeholder="Chọn loại hàng hóa"
                      style={{ width: 300 }}
                      showSearch
                      onChange={(_, option) =>
                        setDataProduct({
                          ...dataProduct,
                          product_types: option?.value,
                        })
                      }
                    >
                      <Option value="goods">Hàng hóa</Option>
                    </Select>
                  </Form.Item>
                </Space>
              </Form.Item>
              <Form.Item label="PT vận chuyển">
                <Space>
                  <Form.Item
                    name="transportation"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Shipping method is required",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      placeholder="Chọn loại hình vận chuyển"
                      style={{ width: 300 }}
                      showSearch
                      onChange={(_, option) =>
                        setDataProduct({
                          ...dataProduct,
                          transportation: option?.value,
                        })
                      }
                    >
                      <Option value="A">A</Option>
                      <Option value="T">T</Option>
                    </Select>
                  </Form.Item>
                </Space>
              </Form.Item>

              <Form.Item label="Công ty gửi hàng">
                <Space>
                  <Form.Item
                    name="companyShipping"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Company shipping is required",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      placeholder="Chọn công ty gửi hàng"
                      style={{ width: 300 }}
                      showSearch
                      onChange={handleCompanyChange}
                    >
                      {companyShippingList.map((company) => (
                        <Option value={company._id} key={company._id}>
                          {company.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Space>
              </Form.Item>

              <div className="flex justify-between items-center gap-y-1 ml-10">
                <span className="text-x3 font-bold h-fit p-4 ">
                  Địa chỉ gửi hàng
                </span>
              </div>

              <Form.Item label="Tỉnh/Thành phố">
                <Form.Item
                  name="cityAddressSender"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Address Destination is required",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn tỉnh/thành phố gửi hàng"
                    style={{ width: 300 }}
                    showSearch
                    onChange={handleCitySenderChange}
                  >
                    {arrCityList.map((city) => (
                      <Option value={city.name}>{city.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>

              <Form.Item label="Quận/Huyện">
                <Form.Item
                  name="districtAddressSender"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Address Destination is required",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn quận/huyện gửi hàng"
                    style={{ width: 300 }}
                    showSearch
                    onChange={handleDistrictSenderChange}
                  >
                    {arrDistrictSenderList.map((district) => (
                      <Option value={district.name}>{district.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>

              <Form.Item label="Bưu cục">
                <Form.Item
                  name="postOfficeAddressSender"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Address Destination is required",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn bưu cục gửi hàng"
                    style={{ width: 300 }}
                    showSearch
                    onChange={(_, option) =>
                      setData({
                        ...data,
                        origin: option?.value,
                      })
                    }
                  >
                    {arrPostOfficeSenderList.map((postOffice) => (
                      <Option value={postOffice._id}>{postOffice.code}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>

              <div className="flex justify-between items-center gap-y-1 ml-10">
                <span className="text-x3 font-bold h-fit p-4 ">
                  Địa chỉ nhận hàng
                </span>
              </div>

              <Form.Item label="Tỉnh/Thành phố">
                <Form.Item
                  name="cityAddressReceiver"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Address Destination is required",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn tỉnh/thành phố nhận hàng"
                    style={{ width: 300 }}
                    showSearch
                    onChange={handleCityReceivedChange}
                  >
                    {arrCityList.map((city) => (
                      <Option value={city.name}>{city.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>

              <Form.Item label="Quận/Huyện">
                <Form.Item
                  name="districtAddressReceiver"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Address Destination is required",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn quận/huyện nhận hàng"
                    style={{ width: 300 }}
                    showSearch
                    onChange={handleDistrictReceivedChange}
                  >
                    {arrDistrictReceivedList.map((district) => (
                      <Option value={district.name}>{district.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>

              <Form.Item label="Bưu cục">
                <Form.Item
                  name="postOfficeAddressReceived"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Address Destination is required",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn bưu cục nhận hàng"
                    style={{ width: 300 }}
                    showSearch
                    onChange={(_, option) =>
                      setData({
                        ...data,
                        destination: option?.value,
                      })
                    }
                  >
                    {arrPostOfficeReceivedList.map((postOffice) => (
                      <Option value={postOffice._id}>{postOffice.code}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>

              <div className="flex justify-between items-center gap-y-3">
                <span className="text-x3 uppercase font-bold h-fit p-4">
                  Thông tin tính phí
                </span>
              </div>

              <Form.Item label="Trọng lượng" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="weight"
                  rules={[{ required: true }]}
                  style={{ display: "inline-block", width: "15%" }}
                >
                  <Input
                    type="number"
                    onChange={(e) => {
                      setDataProduct({
                        ...dataProduct,
                        weight: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </Form.Item>

              {/* <Form.Item label="Discount" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="discount"
                  rules={[{ required: true }]}
                  style={{ display: "inline-block", width: "15%" }}
                >
                  <Input
                    type="number"
                    onChange={(e) => {
                      setDataShipping({
                        ...dataShipping,
                        discount: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </Form.Item> */}

              <Form.Item label="Cước tiêu chuẩn" style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{ display: "inline-block", width: "15%" }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    readOnly
                    type="number"
                    onChange={(e) => {
                      setDataShipping({
                        ...dataShipping,
                        standard_fee: e.target.value,
                      });
                    }}
                    value={dataShipping.standard_fee}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item label="Bảo hiểm" style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{ display: "inline-block", width: "15%" }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    readOnly
                    type="number"
                    onChange={(e) => {
                      setDataShipping({
                        ...dataShipping,
                        insurance_fee: e.target.value,
                      });
                    }}
                    // defaultValue={dataCustomer.phone}
                    value={dataShipping.insurance_fee}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item
                label="Cước trước chiết khấu"
                style={{ marginBottom: 0 }}
              >
                <Form.Item
                  style={{ display: "inline-block", width: "15%" }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    readOnly
                    type="number"
                    onChange={(e) => {
                      setDataShipping({
                        ...dataShipping,
                        before_discount: e.target.value,
                      });
                    }}
                    value={dataShipping.before_discount}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item label="Chiết khấu" style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{ display: "inline-block", width: "15%" }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    readOnly
                    type="number"
                    onChange={(e) => {
                      setDataShipping({
                        ...dataShipping,
                        discount: e.target.value,
                      });
                    }}
                    value={dataShipping.discount}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item
                label="Cước sau chiết khấu"
                style={{ marginBottom: 0 }}
              >
                <Form.Item
                  style={{ display: "inline-block", width: "15%" }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    readOnly
                    type="number"
                    onChange={(e) => {
                      setDataShipping({
                        ...dataShipping,
                        after_discount: e.target.value,
                      });
                    }}
                    value={dataShipping.after_discount}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item
                label="Cước sau thuế và chiết khấu"
                style={{ marginBottom: 0 }}
              >
                <Form.Item
                  style={{ display: "inline-block", width: "15%" }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    readOnly
                    type="number"
                    onChange={(e) => {
                      setDataShipping({
                        ...dataShipping,
                        after_discount_tax: e.target.value,
                      });
                    }}
                    value={dataShipping.after_discount_tax}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item label="Thuế VAT" style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{ display: "inline-block", width: "15%" }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    readOnly
                    type="number"
                    onChange={(e) => {
                      setDataShipping({
                        ...dataShipping,
                        VAT_fee: e.target.value,
                      });
                    }}
                    value={dataShipping.VAT_fee}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item label="Tiền phải thu" style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{ display: "inline-block", width: "15%" }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    readOnly
                    type="number"
                    onChange={(e) => {
                      setDataShipping({
                        ...dataShipping,
                        receiver_fee: e.target.value,
                      });
                    }}
                    value={dataShipping.receiver_fee}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item label="Mã số thuế" style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{ display: "inline-block", width: "15%" }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input readOnly value={dataShipping.VAT_code} />
                </Form.Item>
              </Form.Item>

              <div className="flex justify-between items-center gap-y-3">
                <span className="text-x3 uppercase font-bold h-fit p-4">
                  COD
                </span>
              </div>

              <Form.Item label="COD">
                {/* <Space> */}
                <Form.Item
                  name="COD"
                  noStyle
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    style={{ width: 150 }}
                    placeholder="COD"
                    type="number"
                    onChange={(e) => {
                      setDataCOD({
                        ...dataCOD,
                        cod: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
                {/* </Space> */}
              </Form.Item>

              <Form.Item label="Phí thu hộ COD">
                <Space>
                  <Form.Item
                    name="COD_fee"
                    noStyle
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      style={{ width: 150 }}
                      type="number"
                      onChange={(e) => {
                        setDataCOD({
                          ...dataCOD,
                          fee: e.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                </Space>
              </Form.Item>

              <div className="flex justify-between items-center gap-y-3">
                <span className="text-x3 uppercase font-bold h-fit p-4">
                  Thông tin mặt hàng
                </span>
              </div>

              <Form.Item label="Sản phẩm" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="nameProduct"
                  rules={[{ required: true }]}
                  style={{ display: "inline-block", width: "40%" }}
                >
                  <Input
                    placeholder="Nhập tên sản phẩm"
                    onChange={(e) => {
                      setDataProduct({
                        ...dataProduct,
                        product_name: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="quantity"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "15%",
                    margin: "0 8px",
                  }}
                >
                  <Input
                    type="number"
                    placeholder="Số lượng"
                    onChange={(e) => {
                      setDataProduct({
                        ...dataProduct,
                        quantity: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item label="Giá trị hàng hóa" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="productCost"
                  rules={[{ required: true }]}
                  style={{ display: "inline-block", width: "20%" }}
                >
                  <Input type="number" onChange={handleProducCostChange} />
                </Form.Item>

                <Form.Item
                  name="note"
                  rules={[{ required: true }]}
                  style={{
                    width: "100%",
                  }}
                >
                  <Input
                    style={{ height: 50 }}
                    placeholder="ghi chú"
                    onChange={(e) => {
                      // setDataProduct({
                      //   ...dataProduct,
                      //   note: e.target.value,
                      // });
                      setData({
                        ...data,
                        note: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </Form.Item>

              <div className="flex justify-between items-center gap-y-3">
                <span className="text-x3 uppercase font-bold h-fit p-4">
                  Thông tin người gửi/nhận
                </span>
              </div>
              <div className="flex justify-between items-center gap-y-1 ml-10">
                <span className="text-x3 font-bold h-fit p-4 ">
                  Người gửi hàng
                </span>
              </div>
              <Form.Item label="Tên người gửi" style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{ display: "inline-block", width: "40%" }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      setDataSender({
                        ...dataSender,
                        name: e.target.value,
                      });
                    }}
                    value={dataCustomer.name}
                    placeholder="Nhập tên người gửi"
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item label="Số điện thoại" style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{ display: "inline-block", width: "40%" }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      setDataSender({
                        ...dataSender,
                        phone: e.target.value,
                      });
                    }}
                    type="number"
                    value={dataCustomer.phone}
                    placeholder="Nhập số điện thoại người gửi"
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item label="Email" style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{ display: "inline-block", width: "40%" }}
                  rules={[
                    {
                      required: true,
                      type: "email",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      setDataSender({
                        ...dataSender,
                        email: e.target.value,
                      });
                    }}
                    value={dataCustomer.email}
                    placeholder="Nhập email người gửi"
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item label="Địa chỉ người gửi" style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{ display: "inline-block", width: "40%" }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      setDataSender({
                        ...dataSender,
                        address: e.target.value,
                      });
                    }}
                    value={dataCustomer.address}
                    placeholder="Nhập địa chỉ người gửi"
                  />
                </Form.Item>
              </Form.Item>

              <div className="flex justify-between items-center gap-y-1 ml-10">
                <span className="text-x3 font-bold h-fit p-4 ">
                  Người nhận hàng
                </span>
              </div>

              <Form.Item label="Người nhận" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="receiver"
                  rules={[{ required: true }]}
                  style={{ display: "inline-block", width: "40%" }}
                >
                  <Input
                    placeholder="Nhập tên người nhận"
                    onChange={(e) => {
                      setDataReceiver({
                        ...dataReceiver,
                        name: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="phoneReceiver"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "25%",
                    margin: "0 8px",
                  }}
                >
                  <Input
                    type="number"
                    placeholder="Nhập số điện thoại"
                    onChange={(e) => {
                      setDataReceiver({
                        ...dataReceiver,
                        phone: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="emailReceiver"
                  rules={[{ type: "email", required: true }]}
                  style={{
                    display: "inline-block",
                    width: "30%",
                    // margin: "0 8px",
                  }}
                >
                  <Input
                    placeholder="Nhập email"
                    onChange={(e) => {
                      setDataReceiver({
                        ...dataReceiver,
                        email: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="address_receiver"
                  rules={[{ required: true }]}
                  style={{
                    width: "97%",
                  }}
                >
                  <Input
                    style={{ height: 50 }}
                    placeholder="Địa chỉ người nhận"
                    onChange={(e) => {
                      setDataReceiver({
                        ...dataReceiver,
                        address: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </Form.Item>

              <div className="flex justify-between items-center gap-y-1 ml-10">
                <span className="text-x3 font-bold h-fit p-4 ">
                  Công ty gửi hàng
                </span>
              </div>

              <Form.Item label="Tên công ty" style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{ display: "inline-block", width: "40%" }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      setDataCompany({
                        ...dataCompany,
                        name: e.target.value,
                      });
                    }}
                    value={dataCustomer.name}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item label="Địa chỉ công ty" style={{ marginBottom: 0 }}>
                <Form.Item
                  style={{ display: "inline-block", width: "40%" }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    value={dataCustomer.address}
                    onChange={(e) => {
                      setDataCompany({
                        ...dataCompany,
                        address: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item
                label=" "
                colon={false}
                style={{
                  marginTop: 10,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    // handleDataProduct();
                    // console.log(dataProduct);
                    setData({
                      ...data,
                      sender: dataSender,
                      receiver: dataReceiver,
                      shipping: dataShipping,
                      product: dataProduct,
                      COD: dataCOD,
                      company: dataCompany,

                      // products: handleDataProduct(),
                    });
                    console.log(data);
                  }}
                >
                  Xác nhận
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddNewOrder;

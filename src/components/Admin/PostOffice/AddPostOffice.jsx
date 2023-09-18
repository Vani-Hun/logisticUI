import { useContext, useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { END_POINT } from "../../../utils/constant";
import axios from "axios";
import { MainContext } from "../../../context/MainContext";
import {
  getProvincesWithDetail,
  getProvinces,
  getWardsByDistrictCode,
  getDistrictsByProvinceCode,
} from "sub-vn";

const { Item } = Form;
function AddPostOffice({ onClose, refetchData }) {
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState({
    name: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const acceptAddNewDepartment = async () => {
    setLoading(true);
    console.log(province);
    console.log(district);
    try {
      const response = await axios({
        method: "post",
        url: `${END_POINT}/admin/post-office`,
        headers: { 'x-access-token': `${accessToken}` },
        data: {
          name: data.name,
          address: data.address,
          province: province,
          district: district,
          ward: ward,
        },
      });
      setLoading(false);
      setIsDisable(false);
      refetchData();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const [provincesTo, setProvincesTo] = useState([]);
  const [districtsTo, setDistrictsTo] = useState([]);
  const [wardsTo, setWardsTo] = useState([]);
  const [storekeeper, setStorekeeper] = useState([]);

  const [provinceCodeTo, setProvinceCodeTo] = useState(null);
  const [districtCodeTo, setDistrictCodeTo] = useState(null);
  const [wardCodeTo, setWardCodeTo] = useState(null);

  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);

  // get all provinces
  useEffect(() => {
    setProvincesTo(getProvinces());
  }, []);

  // get all districts by province code
  useEffect(() => {
    setDistrictsTo(getDistrictsByProvinceCode(provinceCodeTo));
  }, [provinceCodeTo]);

  // get all wards by district code
  useEffect(() => {
    setWardsTo(getWardsByDistrictCode(districtCodeTo));
  }, [districtCodeTo]);

  //get province, district, ward name
  useEffect(() => {
    for (let i = 0; i < provincesTo?.length; i++) {
      if (provinceCodeTo == provincesTo[i].code) {
        setProvince(provincesTo[i].name);
      }
    }
  });
  useEffect(() => {
    for (let i = 0; i < districtsTo?.length; i++) {
      if (districtCodeTo == districtsTo[i].code) {
        setDistrict(districtsTo[i].name);
      }
    }
  });
  useEffect(() => {
    for (let i = 0; i < wardsTo?.length; i++) {
      if (wardCodeTo == wardsTo[i].code) {
        setWard(wardsTo[i].name);
      }
    }
  });

  useEffect(()=>{
    const fetchstorekeeper = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${END_POINT}/admin/warehouse/getStorekeeper`,
          headers: { 'x-access-token': `${accessToken}` },
        });
        setStorekeeper(response.data.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchstorekeeper()
  },[])

  return (
    <>
      <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
        <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
          <div className="flex justify-between items-center gap-y-3">
            <span className="text-xl uppercase font-bold h-fit">
              Thêm bưu cục mới
            </span>
            <Button
              size="large"
              disabled={isDisable}
              className={
                !isDisable &&
                "hover:bg-red-500 hover:border-red-700 hover:text-white border-none"
              }
              onClick={onClose}
            >
              x
            </Button>
          </div>
          <Form
            autoComplete="off"
            onFinish={acceptAddNewDepartment}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Item
              label="Tên bưu cục"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên bưu cục",
                },
              ]}
            >
              <Input
                value={data.name}
                onChange={(e) =>
                  setData({
                    ...data,
                    name: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              label="Tỉnh/TP"
              name="province"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên tỉnh/TP",
                },
              ]}
            >
              <select
                name="province_id"
                id="dropdown-province"
                className="h-full w-full border border-black"
                onChange={(e) => setProvinceCodeTo(e.target.value)}
              >
                <option data-select2-id="select2-data-81-rsyi" value="">
                  Tỉnh/ Thành phố
                </option>

                {provincesTo?.length > 0 &&
                  provincesTo.map((province) => (
                    <option
                      className="text-[#161D25]"
                      value={province.code}
                      key={province.code}
                    >
                      {province.name}
                    </option>
                  ))}
              </select>
            </Item>
            <Item
              label="Quận/Huyện"
              name="district"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên quận/huyện",
                },
              ]}
            >
              <select
                name="district_id"
                id="dropdown-district"
                className="h-full w-full border border-black"
                onChange={(e) => setDistrictCodeTo(e.target.value)}
              >
                <option data-select2-id="select2-data-81-rsyi" value="">
                  Quận/Huyện
                </option>

                {districtsTo?.length > 0 &&
                  districtsTo.map((district) => (
                    <option
                      className="text-[#161D25]"
                      value={district.code}
                      key={district.code}
                    >
                      {district.name}
                    </option>
                  ))}
              </select>
            </Item>
            <Item
              label="Phường/Xã"
              name="ward"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên phường/xã",
                },
              ]}
            >
              <select
                name="ward_id"
                id="dropdown-ward"
                className="h-full w-full border border-black"
                onChange={(e) => setWardCodeTo(e.target.value)}
              >
                <option data-select2-id="select2-data-81-rsyi" value="">
                  Phường/Xã
                </option>

                {wardsTo?.length > 0 &&
                  wardsTo.map((ward) => (
                    <option
                      className="text-[#161D25]"
                      value={ward.code}
                      key={ward.code}
                    >
                      {ward.name}
                    </option>
                  ))}
              </select>
            </Item>
            <Item
              label="Đường"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên đường",
                },
              ]}
            >
              <Input
                value={data.address}
                onChange={(e) =>
                  setData({
                    ...data,
                    address: e.target.value,
                  })
                }
              />
            </Item>
            <div className="flex justify-end mt-2 text-sm gap-x-6">
              <Button
                size="large"
                disabled={isDisable}
                className={
                  !isDisable &&
                  "hover:bg-red-500 hover:border-red-700 hover:text-white rounded-lg"
                }
                onClick={onClose}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className="rounded-lg"
              >
                Xác nhận
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddPostOffice;

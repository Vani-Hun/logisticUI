import { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import { END_POINT } from "../../../utils/constant";
import axios from "axios";
import { MainContext } from "../../../context/MainContext";

const car_fleet = ["63181f770e47f63f5761a35d"];

const { Item } = Form;
const { Option } = Select;
function AddNewCar({ onClose, refetchData }) {
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState({
    plate: "",
    car_type: "",
    volumn: "",
    tonnage: "",
    car_fleet: "",
    seri: "",
    expired: "",
  });

  const [listCarFleet, setListCarFleet] = useState([])

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  
  //
  const acceptAddNewCar = async () => {
    setLoading(true);
    // setIsDisable(true);
    try {
      await axios.post(`${END_POINT}/admin/car/create`, data, {
        headers: { 'x-access-token': `${accessToken}` },
      });
      setLoading(false);
      setIsDisable(false);
      refetchData();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    const fetchCarFleet = async()=>{
      try {
        const res = await axios.get(`${END_POINT}/admin/carFleet`, {
          headers: { 'x-access-token': `${accessToken}` },
        });
        setListCarFleet(res.data.data)
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCarFleet();
  },[])
  const carType = (value) => {
    setData({
      ...data,
      car_type: value,
    });
  };
  return (
    <>
      <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
        <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
          <div className="flex justify-between items-center gap-y-3">
            <span className="text-xl uppercase font-bold h-fit">
              Thêm xe mới
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
            onFinish={acceptAddNewCar}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Item
              label="Biển số xe"
              name="plate"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập biển số xe",
                },
              ]}
            >
              <Input
                type="text"
                value={data.plate}
                onChange={(e) =>
                  setData({
                    ...data,
                    plate: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              label="Loại xe"
              name="car_type"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại xe",
                },
              ]}
            >
              <Select allowClear showSearch onChange={carType}>
                <Option value="8_ton">8 ton</Option>
                <Option value="20_ton">20 ton</Option>
              </Select>
            </Item>
            <Item
              label="Dung tích"
              name="volumn"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập dung tích",
                },
              ]}
            >
              <Input
                type="number"
                value={data.volumn}
                onChange={(e) =>
                  setData({
                    ...data,
                    volumn: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              label="Trọng tải"
              name="tonnage"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trọng tải",
                },
              ]}
            >
              <Input
                type="number"
                value={data.tonnage}
                onChange={(e) =>
                  setData({
                    ...data,
                    tonnage: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              label="Đội xe"
              name="car_fleet"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn đội xe",
                },
              ]}
            >
              <Select
                allowClear
                showSearch
                onChange={(_, option) =>
                  setData({ ...data, car_fleet: option?.value })
                }
              >
                {listCarFleet.length > 0 && listCarFleet.map((carFleet) => (
                  <Option value={carFleet.id} key={carFleet.id}>
                    {carFleet.name}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item
              label="Mã bảo hiểm"
              name="seri"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã seri",
                },
              ]}
            >
              <Input
                type="text"
                value={data.seri}
                onChange={(e) =>
                  setData({
                    ...data,
                    seri: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              label="Hết hạn bảo hiểm"
              name="expired"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thời gian hết hạn",
                },
              ]}
            >
              <DatePicker
                onChange={(e, dateString) =>
                  setData({
                    ...data,
                    expired: dateString,
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

export default AddNewCar;

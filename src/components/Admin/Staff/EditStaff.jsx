
import 'antd/dist/antd.css'
import { Form, Button, Input, Select, Typography, message } from "antd";
import * as axios from 'axios'
import { useContext, useState, useEffect } from 'react';
import { MainContext } from '../../../context/MainContext';
import { END_POINT } from '../../../utils/constant';

const { Item } = Form
function EditStaff({ isVisible, onClose, onOk, loading, data, disable}) {
    const [form] = Form.useForm();
    const {accessToken} = useContext(MainContext);
    const [isShow, setIsShow] = useState(isVisible)

    const [dataSelect, setDataSelect] = useState(data);
    const [listSelect, setListSelect] = useState({
        carFleet: [], department: []
    })

    const success = () => {
        message.success({
          content: 'Thêm nhân viên mới thành công',
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        });
      };
      const failed400 = () => {
        message.error({
          content: 'Email hoặc số điện thoại đã tồn tại',
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        });
      };
      const failed500 = () => {
        message.error({
          content: 'Lỗi hệ thống',
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        });
      };

    const onclick = async() => {
        console.log('submit', dataSelect)
        try{
            await axios({
                method: 'put',
                url: `${END_POINT}/admin/staff/${data._id}`,
                headers: { 'x-access-token': `${accessToken}` },
                data: {
                  name: dataSelect.name,
                  staff_type: dataSelect.staff_type,
                  department: dataSelect.department === data.department ? data.department._id : dataSelect.department,
                  car_fleet: dataSelect.car_fleet === data.car_fleet ? (data.car_fleet === null ? '' : data.car_fleet._id) : dataSelect.car_fleet
                }
              });
            success();
            onOk();
            setIsShow(false)
        } catch(error){
          if(error.message == "Request failed with status code 400") {
            failed400();
          }
          if(error.message == "Request failed with status code 500") {
            failed500();
          }
        }
      };

      console.log('aaaaaa',dataSelect);

    const getDataFromApi = async ()=>{
        try{
          const carFleet = await axios({
            url:`${END_POINT}/admin/carFleet`,
            method:"get",
            headers: { 'x-access-token': `${accessToken}` },
          })
          const department = await axios({
            url:`${END_POINT}/department`,
            method:"get",
            headers: { 'x-access-token': `${accessToken}` },
          })
          setListSelect({
            carFleet: carFleet.data.data, 
            department: department.data.data.department
          })
        }
        catch(e){
          console.log(e);
        }
      }
      useEffect(()=>{
        getDataFromApi()
      },[])

    return (
        <>
            {
                isVisible &&
                <div className='fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center'>
                    <div className='relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto'>
                        <div className='flex justify-between items-center gap-y-3'>
                            <span className='text-xl uppercase font-bold h-fit'>Sửa thông tin nhân viên</span>
                            <Button
                                size="large"
                                disabled={disable}
                                className={!disable && 'hover:bg-red-500 hover:border-red-700 hover:text-white border-none'}
                                onClick={onClose}
                            >
                                x
                            </Button>
                        </div>
                        <Form
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            layout="horizontal"
                        >
                            <Item label="Họ tên">
                                <Input
                                    value={dataSelect.name}
                                    onChange={(e) =>
                                        setDataSelect({
                                            ...dataSelect,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </Item>
                            <Form.Item 
                                name="staff_type" 
                                label="Công việc"
                                hasFeedback
                                >
                                <Select placeholder="Chọn công việc" 
                                    onChange={(e) =>
                                        setDataSelect({
                                            ...dataSelect,
                                            staff_type: e,
                                        })
                                    } 
                                    defaultValue={data.staff_type}>
                                    {/* <Select.Option value="marketing">Marketing</Select.Option>
                                    <Select.Option value="sales">Sales</Select.Option>
                                    <Select.Option value="it">IT</Select.Option> */}
                                    <Select.Option value="admin">Admin</Select.Option>
                                    <Select.Option value="driver">Driver</Select.Option>
                                    <Select.Option value="shipper">Shipper</Select.Option>
                                    <Select.Option value="storekeeper">Storekeeper</Select.Option>
                                    <Select.Option value="staff">Staff</Select.Option>
                                    {/* <Select.Option value="warehouse_accountant">Warehouse Accountant</Select.Option>
                                    <Select.Option value="general_accounting">General Accounting</Select.Option> */}
                                </Select>
                            </Form.Item>
                            <Form.Item 
                                name="department" 
                                label="Phòng ban"
                                rules={[
                                    {
                                    message: "Xin vui lòng chọn phòng ban",
                                    },
                                ]}
                                hasFeedback
                                >
                                <Select 
                                    onChange={(e) =>
                                        setDataSelect({
                                            ...dataSelect,
                                            department: e
                                        })
                                    } 
                                    defaultValue={data.department.length !== null && data.department.name}
                                    placeholder="Chọn phòng ban">
                                    {listSelect.department.length > 0 && listSelect.department.map((dep) =>(
                                        <Select.Option key={dep._id} value={dep._id}>{dep.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item 
                                name="car_fleet" 
                                label="Đội xe"
                                rules={[
                                    {
                                    message: "Xin vui lòng chọn đội xe",
                                    },
                                ]}
                                hasFeedback
                                >
                                <Select 
                                    onChange={(e) => 
                                        setDataSelect({
                                            ...dataSelect,
                                            car_fleet: e,
                                        })
                                    } 
                                    defaultValue={data.car_fleet !== null && data.car_fleet.name}
                                    placeholder="Chọn đội xe">
                                    {listSelect.carFleet.length > 0 && listSelect.carFleet.map((car) =>(
                                    <Select.Option key={car._id} value={car.id}>{car.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <div className='flex justify-end mt-2 text-sm gap-x-6'>
                                <Button
                                    size="large"
                                    disabled={disable}
                                    className={!disable && 'hover:bg-red-500 hover:border-red-700 hover:text-white rounded-lg'}
                                    onClick={onClose}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    loading={loading}
                                    className="rounded-lg"
                                    onClick={()=>onclick()}
                                >
                                    Xác nhận
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            }
        </>
    );
}

export default EditStaff;
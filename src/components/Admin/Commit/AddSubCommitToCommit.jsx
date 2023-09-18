import { useState, useContext, useEffect } from "react";
import { END_POINT } from "../../../utils/constant";
import axios from "axios";
import { MainContext } from "../../../context/MainContext";
import { Form, Space, DatePicker, Button, InputNumber, Select } from "antd";
import { data } from "autoprefixer";

const { Option } = Select;
function AddSubCommitToCommit(props /* , isVisible, onClose, disable, onOk */) {
  const { accessToken } = useContext(MainContext);

  const [selectedObj, setSelectedObj] = useState("");
  const [isSubmit, setIsSubmit] = useState(false)
  const [dataObj, setDataObj] = useState([])

  
  useEffect(() => {
    const getObjData = async () => {
      try {
        const res = await axios.get(
          `${END_POINT}/admin/sub-commitment`, {
            headers: {'x-access-token': `${accessToken}`}
          }
          );
          let result = res.data.data;
          for(let i=0 ; i < res.data.data.length; i++){
            for(let j=0; j<props.data.length; j++){
              if(res.data.data[i]?._id === props.data[j]?._id){
                result.splice(i,1)
              }
            }
          }
          setDataObj(result);
        } catch (error) {
          console.error(error.message);
        }
      };
      getObjData();
    },[props.data]);
    
  const handleSubmit = async (e) => {
    dataObj.map((obj)=>{
      if(obj._id === selectedObj){
        props.onClick(obj.name);
        setIsSubmit(!isSubmit)
        props.onClose();
      }
    })
  };
  const handleChange = (value) => {
    setSelectedObj(value);
  };

  return (
    <>
      {props.isVisible && (
        <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
          <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
            <div className="flex justify-between items-center gap-y-3">
              <span className="text-xl uppercase font-bold h-fit">
                Thêm các cam kết phụ cho cam kết
              </span>
              <Button
                size="large"
                disabled={props.disable}
                className={
                  !props.disable &&
                  "hover:bg-red-500 hover:border-red-700 hover:text-white border-none"
                }
                onClick={props.onClose}
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
              onFinish={handleSubmit}
            >
             <Select
                style={{
                  width: '100%',
                }}
                placeholder="Chọn cam kết phụ "
                defaultValue={[]}
                onChange={handleChange}
                optionLabelProp="label"
              >
                {dataObj.map( (object, index) => (
                  <Option key={index} value={object._id} label={object.name}>
                    <Space>
                      <span role="img" aria-label="China" style={{marginRight: 70}}>
                        <img
                          src={object.logo}
                          className="h-10 w-10 rounded-full"
                          alt=""
                        ></img>
                      </span>
                      <div>{object.name}</div>
                    </Space>
                  </Option>
                ))}
                
              </Select>
              <div className="flex justify-end mt-2 text-sm gap-x-6">
                <Button
                  size="large"
                  disabled={props.disable}
                  className={
                    !props.disable &&
                    "hover:bg-red-500 hover:border-red-700 hover:text-white rounded-lg"
                  }
                  onClick={props.onClose}
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  size="large"
                  className="rounded-lg"
                  htmlType="submit"
                >
                  Xác nhận
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddSubCommitToCommit;

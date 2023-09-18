import { useState, useContext } from "react";
import { Form, Input, DatePicker, Button, Select, Checkbox } from "antd";
import moment from "moment";
import axios from "axios";
import { END_POINT } from "../../../utils/constant";
import { MainContext } from "../../../context/MainContext";
import TextArea from "antd/lib/input/TextArea";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { Option } = Select;
const { Item } = Form;
function EditCareer({ onClose, data, refetchData }) {
  // const [dataEdit, setDataEdit] = useState({ ...data, _id: null });
  const [dataEdit, setDataEdit] = useState({ ...data });
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);



  const [jobDescription, setjobDescription] = useState('')
  const [benefits, setbenefits] = useState('')
  const [jobRequirements, setjobRequirements] = useState('')
  const [perks, setperks] = useState('')

  console.log("data là", dataEdit);
  const { accessToken } = useContext(MainContext);
  const acceptEditCareer = async () => {
    setLoading(true);
    // setIsDisable(true);
    try {
      await axios.put(`${END_POINT}/admin/career/${data._id}`, dataEdit,  {
        headers: { 'x-access-token': `${accessToken}` },
      });
      setLoading(false);
      // setIsDisable(false);
      refetchData();
      onClose();
    } catch (error) {
      console.log(error);
    }
    console.log(dataEdit)
  };
  return (
    <>
      <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
        <div style={{ overflowY: 'auto', maxHeight: '90vh' }}  className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
          <div className="flex justify-between items-center gap-y-3">
            <span className="text-xl uppercase font-bold h-fit">
              Chỉnh sửa công việc
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
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            autoComplete="off"
            initialValues={{
              ...dataEdit,
              deadline:moment(dataEdit.deadline)
            }}
            onFinish={acceptEditCareer}
          >
            <Item
              label="Tên công việc"
              name="name"
              // rules={[
              //   {
              //     required: true,
              //     message: "Vui lòng nhập tên công việc",
              //   },
              // ]}
            >
              <Input
                defaultValue={dataEdit.title}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    title: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              label="Hạn nộp hồ sơ"
              name="deadline"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn hạn nộp",
                },
              ]}
            >
              <DatePicker
                onChange={(e, dateString) => 
                  setDataEdit({
                    ...dataEdit,
                    deadline: dateString,
                  })
                }
              />
            </Item>       
            <Item
              label="applicationPosition"
              name="applicationPosition"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên công việc",
                },
              ]}
            >
              <Input
                defaultValue={dataEdit.applicationPosition}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    applicationPosition: e.target.value,
                  })
                }
              />
            </Item>
           <Item
              name="salary"
              label="salary"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Lương",
                },
              ]}
            >
              <Input
                defaultValue={dataEdit.salary}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    salary: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              name="position"
              label="position"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập vị trí",
                },
              ]}
            >
              <Input
                defaultValue={dataEdit.position}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    position: e.target.value,
                  })
                }
              />
            </Item>
             <Item
              name="industry"
              label="industry"
            // rules={[
            //   {
            //     required: true,
            //     message: "Vui lòng nhập loại đăng n",
            //   },
            // ]}
            >
              <Input
                defaultValue={dataEdit.industry}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    industry: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              name="workingHours"
              label="working Hours"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Thời gian làm việc",
                },
              ]}
            >
              <TextArea
                rows={3}
                placeholder="Tối đa 1000 kí tự"
                maxLength={1000}
                defaultValue={dataEdit.workingHours}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    workingHours: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              name="addressDescription"
              label="address Description"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ",
                },
              ]}
            >
              <TextArea
                rows={3}
                placeholder="Tối đa 1000 kí tự"
                maxLength={1000}
                defaultValue={dataEdit.addressDescription}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    addressDescription: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              name="Tỉnh/Thành phố"
              label="address"
              // rules={[
              //   {
              //     required: true,
              //     message: "Vui lòng nhập Tỉnh/Thành phố Tuyển dụng ",
              //   },
              // ]}

              
            >
              <Input
                 defaultValue={dataEdit.address}
                 onChange={(e) =>
                   setDataEdit({
                     ...dataEdit,
                     address: e.target.value,
                   })
                 }
              />
            </Item>
            <Item
              label="Phúc lợi công việc"
              name="benefits"
              rules={
                dataEdit.benefits.length === 0
                  ? [
                      {
                        required: true,
                        message: "Vui lòng nhập phúc lợi",
                      },
                    ]
                  : []
              }
            >
              <div className="flex">
                <Input
                  value={benefits}
                  onChange={(e) =>
                    setbenefits(e.target.value)
                  }
                />
                <span className="bg-blue  ml-1 p-1 hover:bg-slate-300"
                  onClick={() => {
                    setDataEdit({
                      ...dataEdit,
                      benefits: [...dataEdit.benefits, benefits]
                    })
                    return setbenefits('')
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </div>
              <div>
                {dataEdit.benefits.map((des, index) => {
                  return <p className="flex">
                    <span key={index}>
                      <FontAwesomeIcon icon={faCircle} className="" />
                      {des}</span>
                    <div className="ml-2 p-1 cursor-pointer"
                      onClick={() => {
                        const k = index
                        var newArr = dataEdit.benefits.filter((value, index) => index !== k);
                        return  setDataEdit({
                          ...dataEdit,
                          benefits:newArr
                        })
                      }}
                    >
                      X
                    </div>
                  </p>
                })}
              </div>
            </Item>         
            <Item
               label="Quyền lợi"
               name="perks"
               rules={
                 dataEdit.perks.length === 0
                   ? [
                       {
                         required: true,
                         message: "Vui lòng nhập quyền lợi",
                       },
                     ]
                   : []
               }
            >
              <div className="flex">
                <Input
                  value={perks}
                  onChange={(e) =>
                    setperks(e.target.value)
                  }
                />
                <span className="bg-blue  ml-1 p-1 hover:bg-slate-300"
                  onClick={() => {
                    setDataEdit({
                      ...dataEdit,
                      perks: [...dataEdit.perks, perks]
                    })
                    return setperks('')
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </div>
              <div>
                {dataEdit.perks.map((des, index) => {
                  return <p className="flex">
                    <span key={index}>
                      <FontAwesomeIcon icon={faCircle} className="" />
                      {des}</span>
                    <div className="ml-2 p-1 cursor-pointer"
                      onClick={() => {
                        const k = index
                        var newArr = dataEdit.perks.filter((value, index) => index !== k);
                        return  setDataEdit({
                          ...dataEdit,
                          perks:newArr
                        })
                      }}
                    >
                      X
                    </div>
                  </p>
                })}
              </div>
            </Item>
        
            <Item
                label="Mô tả công việc"
                name="jobDescription"
                rules={
                  dataEdit.jobDescription.length === 0
                    ? [
                        {
                          required: true,
                          message: "Vui lòng nhập mô tả công việc",
                        },
                      ]
                    : []
                }
            >
              <div className="flex">
                <Input
                  value={jobDescription}
                  onChange={(e) =>
                    setjobDescription(e.target.value)
                  }
                />
                <span className="bg-blue  ml-1 p-1 hover:bg-slate-300"
                  onClick={() => {
                    setDataEdit({
                      ...dataEdit,
                      jobDescription: [...dataEdit.jobDescription, jobDescription]
                    })
                    return setjobDescription('')
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </div>
              <div>
                {dataEdit.jobDescription.map((des, index) => {
                  return <p className="flex">
                    <span key={index}>
                      <FontAwesomeIcon icon={faCircle} className="" />
                      {des}</span>
                    <div className="ml-2 p-1 cursor-pointer"
                      onClick={() => {
                        const k = index
                        var newArr = dataEdit.jobDescription.filter((value, index) => index !== k);
                        return  setDataEdit({
                          ...dataEdit,
                          jobDescription:newArr
                        })
                      }}
                    >
                      X
                    </div>
                  </p>
                })}
              </div>
            </Item>
            <Item
              label="Phúc lợi công việc"
              name="benefits"
              rules={
                dataEdit.benefits.length === 0
                  ? [
                      {
                        required: true,
                        message: "Vui lòng nhập phúc lợi",
                      },
                    ]
                  : []
              }
            >
              <div className="flex">
                <Input
                  value={benefits}
                  onChange={(e) =>
                    setbenefits(e.target.value)
                  }
                />
                <span className="bg-blue  ml-1 p-1 hover:bg-slate-300"
                  onClick={() => {
                    setDataEdit({
                      ...dataEdit,
                      benefits: [...dataEdit.benefits, benefits]
                    })
                    return setbenefits('')
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </div>
              <div>
                {dataEdit.benefits.map((des, index) => {
                  return <p className="flex">
                    <span key={index}>
                      <FontAwesomeIcon icon={faCircle} className="" />
                      {des}</span>
                    <div className="ml-2 p-1 cursor-pointer"
                      onClick={() => {
                        const k = index
                        var newArr = dataEdit.benefits.filter((value, index) => index !== k);
                        return  setDataEdit({
                          ...dataEdit,
                          benefits:newArr
                        })
                      }}
                    >
                      X
                    </div>
                  </p>
                })}
              </div>
            </Item>         
            <Item
                 label="Yêu cầu"
                 name="jobRequirements"
               rules={
                 dataEdit.jobRequirements.length === 0
                 ? [
                     {
                       required: true,
                       message: "Vui lòng nhập yêu cầu công việc",
                     },
                   ]
                 : []}
            >
              <div className="flex">
                <Input
                  value={jobRequirements}
                  onChange={(e) =>
                    setjobRequirements(e.target.value)
                  }
                />
                <span className="bg-blue  ml-1 p-1 hover:bg-slate-300"
                  onClick={() => {
                    setDataEdit({
                      ...dataEdit,
                      jobRequirements: [...dataEdit.jobRequirements, jobRequirements]
                    })
                    return setjobRequirements('')
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </div>
              <div>
                {dataEdit.jobRequirements.map((des, index) => {
                  return <p className="flex">
                    <span key={index}>
                      <FontAwesomeIcon icon={faCircle} className="" />
                      {des}</span>
                    <div className="ml-2 p-1 cursor-pointer"
                      onClick={() => {
                        const k = index
                        var newArr = dataEdit.jobRequirements.filter((value, index) => index !== k);
                        return  setDataEdit({
                          ...dataEdit,
                          jobRequirements:newArr
                        })
                      }}
                    >
                      X
                    </div>
                  </p>
                })}
              </div>
            </Item>
          
           
            <Item
              label="Hot"
              name="isHot"
            >
              <Checkbox
                defaultChecked={dataEdit.isHot}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    isHot: !dataEdit.isHot,
                  })
                }
              />
            </Item>
            <Item
              label="New"
              name="isNew"
            >
              <Checkbox
                 defaultChecked={dataEdit.isNew}
                 onChange={(e) =>
                   setDataEdit({
                     ...dataEdit,
                     isHot: !dataEdit.isNew,
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
                size="large"
                loading={loading}
                htmlType="submit"
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



export default EditCareer;

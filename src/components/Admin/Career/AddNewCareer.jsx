import { useState, useEffect, useContext } from "react";
import { Form, Input, DatePicker, Button, Select, Checkbox } from "antd";
import { END_POINT } from "../../../utils/constant";
import axios from "axios";
import { MainContext } from "../../../context/MainContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
const { Option } = Select;
const { Item } = Form;
const { TextArea } = Input;
function AddNewCareer({ onClose, refetchData }) {
  const { accessToken } = useContext(MainContext);
 
  const [departments, setDepartments] = useState([]);
  const [idDepartment, setIdDepartment] = useState();

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const [title, settilte] = useState('')
  const [applicationPosition, setapplicationPosition] = useState('')
  const [deadline, setdeadline] = useState('')
  const [salary, setsalary] = useState('')
  const [position, setposition] = useState('')
  const [industry, setindustry] = useState('')
  const [workingHours, setworkingHours] = useState('')
  const [addressDescription, setaddressDescription] = useState('')
  const [address, setaddress] = useState('')
  const [listDescription, setListDescription] = useState([])
  const [description, setDescription] = useState('')
  const [listbenefits, setListbenefits] = useState([])
  const [benefits, setbenefits] = useState('')
  const [listjobRequirements, setListjobRequirements] = useState([])
  const [jobRequirements, setjobRequirements] = useState('')
  const [listperks, setListperks] = useState([])
  const [perks, setperks] = useState('')
  const [isHot, setisHot] = useState(false)
  const [isNew, setisNew] = useState(false)
  useEffect(() => {
    const fetchDepartmentsList = async () => {
      try {
        const { data: response } = await axios.get(`${END_POINT}/department`);
        setDepartments(response.data.department);
        setIdDepartment(response.data.department[0]._id)
      } catch (error) {
        console.log(error);
      }
    };
    fetchDepartmentsList();
  }, []);
  const [listposition,setListPosition]=useState([])
  useEffect(()=>{
    const getindustry = async () => {
      const api = await axios({
        url: `${END_POINT}/career/position`,
        method: "get",
      });
      // console.log("industry", api.data.data);
      
      setListPosition([...api.data.data])
      // console.log("rescarweq", rescareer.data.data.career[0].location);
      // const i = rescareer.data.data.length;
      // console.log(i);
    };
    getindustry()
  },[])
  const [listprovinces,setlistprovinces] = useState([])
  useEffect(()=>{
    const getlocation = async () => {
      const api = await axios({
        url: `${END_POINT}/career/provinces`,
        method: "get",
      });
      console.log("industry", api.data.data);
      
      setlistprovinces([...api.data.data])
      // console.log("rescarweq", rescareer.data.data.career[0].location);
      // const i = rescareer.data.data.length;
      // console.log(i);
    };
    getlocation()
  },[])
  const [listindustry,setlistindustry] = useState([])
  useEffect(()=>{
    const getindustry = async () => {
      const api = await axios({
        url: `${END_POINT}/career/industry`,
        method: "get",
      });
      console.log("industry", api.data.data);
      
      setlistindustry([,...api.data.data])
      // console.log("rescarweq", rescareer.data.data.career[0].location);
      // const i = rescareer.data.data.length;
      // console.log(i);
    };
    getindustry()
  },[])
  const acceptAddNewCareer = async () => {
    // console.log(isNew)
    // console.log(isHot)
    // console.log(listjobRequirements)
    // console.log(listDescription)
    // console.log(listbenefits)
    // console.log(listperks)
    // console.log(address)
    // console.log(addressDescription)
    // console.log(workingHours)
    // console.log(industry)
    // console.log(position)
    // console.log(salary)
    // console.log(deadline)
    // console.log(applicationPosition)
    // console.log(title)
    setLoading(true);


    const submitFormData = new FormData();
    submitFormData.append("title", title);
    submitFormData.append("applicationPosition", applicationPosition);
    submitFormData.append("deadline", deadline);
    submitFormData.append("salary", salary);
    submitFormData.append("position", position);
    submitFormData.append("industry",industry);
    submitFormData.append("workingHours", workingHours);
    submitFormData.append("addressDescription", addressDescription);
    submitFormData.append("address", address);
    submitFormData.append("benefits", listbenefits);
    submitFormData.append("jobDescription", listDescription);
    submitFormData.append("jobRequirements", listjobRequirements);
    submitFormData.append("perks", perks);
    submitFormData.append("isHot", isHot);
    submitFormData.append("isNew", isNew);

    // make axios post request
    //   const response = await axios({
    //     method: "post",
    //     url: `${END_POINT}/admin/blog`,
    //     data: submitFormData,
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       authorization: `Bearer ${accessToken}`,
    //     },
    //   }); { 
    //     title: `${title}`,
    //     applicationPosition: applicationPosition,
    //     deadline: deadline,
    //     salary: salary,
    //     // position:position,
    //     position:'Intern',
    //     // industry:industry,
    //     industry:'Chăm sóc khách hàng',
    //     workingHours: workingHours,
    //     addressDescription: addressDescription,
    //     // address: `${address}`,
    //     address: `Thành phố Hà Nội`,
    //     benefits:listbenefits ,
    //     jobDescription:listDescription ,
    //     jobRequirements: listjobRequirements,
    //     perks: listperks,
    //     isHot: isHot,
    //     isNew: isNew
    // }
 
    try {
      await axios.post(`${END_POINT}/admin/career/create`, {
        departmentId :idDepartment,
        title: `${title}`,
        applicationPosition: applicationPosition,
        deadline: deadline,
        salary: salary,
        // position:position,
        position: 'Intern',
        // industry:industry,
        industry: 'Chăm sóc khách hàng',
        workingHours: workingHours,
        addressDescription: addressDescription,
        // address: `${address}`,
        address: `Thành phố Hà Nội`,
        benefits: listbenefits,
        jobDescription: listDescription,
        jobRequirements: listjobRequirements,
        perks: listperks,
        isHot: isHot,
        isNew: isNew

      }, {
        headers: { 'x-access-token': `${accessToken}` },
      });
      // console.log('hi')
      setLoading(false);
      setIsDisable(false);
      onClose();
      refetchData();
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
        <div style={{ overflowY: 'auto', maxHeight: '90vh' }} className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
          <div className="flex justify-between items-center gap-y-3 " >
            <span className="text-xl uppercase font-bold h-fit">
              Thêm công việc mới
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
            onFinish={acceptAddNewCareer}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Item
              label="name"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên công việc",
                },
              ]}
            >
              <Input
                value={title}
                onChange={(e) =>
                  settilte(e.target.value)
                }
              />
            </Item>
            <Item
              label="applicationPosition"
              name="applicationPosition"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập loại công việc",
                },
              ]}
            >
              <Input
                value={applicationPosition}
                onChange={(e) =>
                  setapplicationPosition(e.target.value)
                }
              />
            </Item>
            <Item
              label="Hạn nộp hồ sơ"
              name="deadline"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn deadline",
                },
              ]}
            >
              <DatePicker
                placeholder="yyyy-mm-dd"
                onChange={(e, dateString) =>
                  setdeadline(dateString)
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
                value={salary}
                onChange={(e) =>
                  setsalary(e.target.value)
                }
              />
            </Item>

            {/* <Item
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
                value={position}
                onChange={(e) =>
                  setposition(e.target.value)
                }
              />
            </Item> */}
            {/* <Item
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
                value={industry}
                onChange={(e) =>
                  setindustry(e.target.value)
                }
              />
            </Item> */}
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
                value={workingHours}
                onChange={(e) =>
                  setworkingHours(e.target.value)
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
                value={addressDescription}
                onChange={(e) =>
                  setaddressDescription(e.target.value)
                }
              />
            </Item>
            {/* <Item
              name="Tỉnh/Thành phố"
              label="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Tỉnh/Thành phố Tuyển dụng ",
                },
              ]}
            >
              <Input
                value={address}
                onChange={(e) =>
                  setaddress(e.target.value)
                }
              />
            </Item> */}
            <Item
              label="Phúc lợi công việc"
              name="benefits"
              rules={
                listbenefits.length === 0
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
                    setListbenefits([...listbenefits, benefits])
                    return setbenefits('')
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </div>
              <div>
                {listbenefits.map((des, index) => {
                  return <p className="flex">
                    <span key={index}>
                      <FontAwesomeIcon icon={faCircle} className="" />
                      {des}</span>
                    <div className="ml-2 p-1 cursor-pointer"
                      onClick={() => {
                        const k = index
                        var newArr = listbenefits.filter((value, index) => index !== k);
                        return setListbenefits(newArr)
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
                listperks.length === 0
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
                    setListperks([...listperks, perks])
                    return setperks('')
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </div>
              <div>
                {listperks.map((des, index) => {
                  return <p className="flex">
                    <span key={index}>
                      <FontAwesomeIcon icon={faCircle} className="" />
                      {des}</span>
                    <div className="ml-2 p-1 cursor-pointer"
                      onClick={() => {
                        const k = index
                        var newArr = listperks.filter((value, index) => index !== k);
                        return setListperks(newArr)
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
                listDescription.length === 0
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
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                />
                <span className="bg-blue  ml-1 p-1 hover:bg-slate-300"
                  onClick={() => {
                    setListDescription([...listDescription, description])
                    return setDescription('')
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </div>
              <div>
                {listDescription.map((des, index) => {

                  return <p className="flex">
                    <span key={index}>
                      <FontAwesomeIcon icon={faCircle} className="" />
                      {des}</span>
                    <div className="ml-2 p-1 cursor-pointer"
                      onClick={() => {
                        const k = index
                        var newArr = listDescription.filter((value, index) => index !== k);
                        return setListDescription(newArr)
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
              listjobRequirements.length === 0
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
                    setListjobRequirements([...listjobRequirements, jobRequirements])
                    return setjobRequirements('')
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </div>
              <div>
                {listjobRequirements.map((des, index) => {
                  return <p className="flex">
                    <span key={index}>
                      <FontAwesomeIcon icon={faCircle} className="" />
                      {des}</span>
                    <div className="ml-2 p-1 cursor-pointer"
                      onClick={() => {
                        const k = index
                        var newArr = listjobRequirements.filter((value, index) => index !== k);
                        return setListjobRequirements(newArr)
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
                defaultChecked={isHot}
                onChange={() => {
                  setisHot(!isHot)
                }}
              />
            </Item>
            <Item
              label="New"
              name="isNew"
            >
              <Checkbox
                defaultChecked={isNew}
                onChange={() => {
                  setisNew(!isNew)
                }}
              />
            </Item>

            {/* //fix */}
         
            <Item
                 name="Tỉnh/Thành phố"
                 label="address"
                 rules={[
                   {
                     required: true,
                     message: "Vui lòng nhập Tỉnh/Thành phố Tuyển dụng ",
                   },
                 ]}
            >
              <Select
                allowClear
                onChange={(_, option) =>setaddress(option.value)}
              >
                {listprovinces.map((listprovinces,index) => (
                  <Option value={listprovinces} key={index}>
                    {listprovinces}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item
                 name="industry"
                 label="industry"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập industry",
                  },
                ]}
            >
              <Select
                allowClear
                onChange={(_, option) =>setindustry(option.value)}
              >
                {listindustry.map((listindustry,index) => (
                  <Option value={listindustry} key={index}>
                    {listindustry}
                  </Option>
                ))}
              </Select>
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
              <Select
                allowClear
                onChange={(_, option) =>setposition(option.value)}
              >
                {listposition.map((listposition,index) => (
                  <Option value={listposition} key={index}>
                    {listposition}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item
              // name="applicationPosition"
              label="Phòng ban"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thông tin",
                },
              ]}
            >
              <Select
                allowClear
                onChange={(_, option) => setIdDepartment(() => option?.key)}
                
              >
                {departments.map((department) => (
                  <Option value={department.name} key={department._id}>
                    {department.name}
                  </Option>
                ))}
              </Select>
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

export default AddNewCareer;
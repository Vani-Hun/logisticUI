import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { END_POINT } from "../../utils/constant";
import { useTranslation } from "react-i18next";
const InputDesktop = ({
  onSearch,
  onChangeKey,
  onChangeLocation,
  onChangeType,
  onChangeState,
  onChangeDepartment,
}) => {

    //set up multiple language, sorry if it's unintelligible
    const {t} = useTranslation('Recruitment')
    let placeholder = {
      position: t('Chức vụ'),
      location: t("Tỉnh/Thành phố"),
      tittle  : t("Ngành nghề"),
      applicationPosition: t('Vị trí ứng tuyển')
    }
  const [department, setDepartment] = useState([]);
  const [industry,setindustry]=useState([`${placeholder.tittle}`])
  const [location,setlocation]=useState([`${placeholder.location}`])
  const [position,setposition]=useState([`${placeholder.position}`])
  // const [position,setpositions]=useState([`${placeholder.position}`])
  const getDepartment = async () => {
    // const res = await axios({
    //   url: `${END_POINT}/department`,
    //   method: "get",
    // });

    // if (res.status === 200) {
    //   setDepartment(res.data.data.department);
    // }
  };
  const getA = async () => {
    // const rescareer = await axios({
    //   url: `${END_POINT}/career`,
    //   method: "get",
    // });
    // console.log("rescarweq", rescareer);
    // console.log("rescarweq", rescareer.data.data.career[0].location);
    // const i = rescareer.data.data.length;
    // console.log(i);
  };

  const dis = [];
  console.log(dis);
  useEffect(() => {
    getDepartment();
    getA();
  }, []);


  const locationsWork = [
    {
      id: 1,
      location: placeholder.location,
    },
    {
      id: 2,
      location: "Bình Dương",
    },
    {
      id: 3,
      location: "Cần Thơ",
    },
    {
      id: 4,
      location: "Hồ Chí Minh",
    },
  ];

  const professions = [
    {
      id: 1,
      profession: placeholder.tittle,
    },
    {
      id: 2,
      profession: "Bưu cục",
      numberOfRecruitment: 0,
      type: "văn phòng",
    },
    {
      id: 3,
      profession: "Chăm sóc khách hàng",
      numberOfRecruitment: 0,
      type: "văn phòng",
    },
  ];

  const positions = [
    {
      id: 1,
      position: "Chức vụ",
    },
    {
      id: 2,
      position: "Chuyên viên",
    },
  ];
  
  // useEffect(()=>{
  //   const getlocation = async () => {
  //     const api = await axios({
  //       url: `${END_POINT}/career/position`,
  //       method: "get",
  //     });
  //     console.log("industry", api.data.data);
      
  //     setpositions([...position,...api.data.data])
  //     // console.log("rescarweq", rescareer.data.data.career[0].location);
  //     // const i = rescareer.data.data.length;
  //     // console.log(i);
  //   };
  //   getlocation()
  // },[])
  useEffect(()=>{
    const getindustry = async () => {
      const api = await axios({
        url: `${END_POINT}/career/position`,
        method: "get",
      });
      // console.log("industry", api.data.data);
      
      setposition([...position,...api.data.data])
      // console.log("rescarweq", rescareer.data.data.career[0].location);
      // const i = rescareer.data.data.length;
      // console.log(i);
    };
    getindustry()
  },[])
  useEffect(()=>{
    const getlocation = async () => {
      const api = await axios({
        url: `${END_POINT}/career/provinces`,
        method: "get",
      });
      
      setlocation([...location,...api.data.data])
      // console.log("rescarweq", rescareer.data.data.career[0].location);
      // const i = rescareer.data.data.length;
      // console.log(i);
    };
    getlocation()
  },[])
  useEffect(()=>{
    const getindustry = async () => {
      const api = await axios({
        url: `${END_POINT}/career/industry`,
        method: "get",
      });
      
      setindustry([...industry,...api.data.data])
      // console.log("rescarweq", rescareer.data.data.career[0].location);
      // const i = rescareer.data.data.length;
      // console.log(i);
    };
    getindustry()
  },[])
  console.log(industry)
  return (
    <div className="hidden lg:block mt-[30px]">
      <div className="p-[30px] border-solid border-[1px]  border-slate-300 shadow-md rounded-lg justify-around  bg-[#f2f2f2] hidden md:flex z-10">
        <div className="flex flex-col w-[29%] mr-5">
          <label className="mb-[8px] ml-2 text-[#161D25]" htmlFor="position">
            {t('Vị trí ứng tuyển')}
          </label>
          <input
            className="outline outline-[1px] outline-slate-300 p-[8px]"
            defaultValue=""
            type="text"
            name=""
            id="position"
            placeholder={placeholder.applicationPosition}
            onChange={onChangeKey}
          />
        </div>
       
        <div className="flex flex-col w-[29%] mr-5">
          <label className="mb-[8px] ml-2 text-[#161D25]" htmlFor="">
            {t('Địa điểm làm việc')}
          </label>
          <select
            name=""
            id=""
            className="outline outline-[1px] outline-slate-300 p-[8px]"
            onChange={onChangeLocation}
          >
            {location.map((item,index) => {
              return (
                <option
                  key={index}
                  value={item}
                  className="text-[#444444] "
                >
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col w-[29%] mr-5">
          <label className="mb-[8px] ml-2 text-[#161D25]" htmlFor="">
            {t('Ngành nghề')}
          </label>
          <select
            name=""
            id=""
            className="outline outline-[1px] outline-slate-300 p-[8px]"
            onChange={onChangeType}
          >
            {industry.map((item,index) => {
              return (
                <option
                  key={index}
                  value={item}
                  className="text-[#444444]"
                >
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col w-[29%] mr-5">
          <label className="mb-[8px] ml-2 text-[#161D25]" htmlFor="">
          {t('Chức vụ')}
          </label>
          <select
            name=""
            id=""
            className="outline outline-[1px] outline-slate-300 p-[8px]"
            onChange={onChangeState}
          >
            {position.map((item,index) => {
              return (
                <option
                  key={index}
                  value={item}
                  className="text-[#444444] "
                >
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        {/* <div className="flex flex-col w-[29%]">
          <label className="mb-[8px] ml-2 text-[#161D25]" htmlFor="">
            Phòng ban
          </label>
          <select
            name=""
            id=""
            className="outline outline-[1px] outline-slate-300 p-[8px]"
            onChange={onChangeDepartment}
          >
            <option value="Phòng ban">Phòng ban</option>
            {department && (
              <>
                {department.map((item) => {
                  return (
                    <option
                      key={item.id}
                      value={item.name}
                      className="text-[#444444]"
                    >
                      {item.name}
                    </option>
                  );
                })}
              </>
            )}
          </select>
        </div> */}
        {/* <div className="flex flex-col w-[29%]">
          <label className="mb-[8px] ml-2 text-[#161D25]" htmlFor="">
            Chức vụ
          </label>
          <select
            name=""
            id=""
            className="outline outline-[1px] outline-slate-300 p-[8px]"
            onChange={onChangeState}
          >
            {positions.map((item) => {
              return (
                <option
                  key={item.id}
                  value={item.position}
                  className="text-[#444444]"
                >
                  {item.position}
                </option>
              );
            })}
          </select>
        </div> */}
        <div className="w-[11%] relative">
          <button
            className="bg-[#e5a663] w-full py-[9px] xl:pb-[8px] text-[#232323] absolute bottom-0"
            onClick={onSearch}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
           {t('Tìm kiếm')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputDesktop;

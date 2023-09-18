import Images from "../../utils/images";
import { RightOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEye, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import InputDesktop from "../../components/InputDesktop/InputDesktop";
import InputMobile from "../../components/InputMobile/InputMobile";
import HotJob from "../../components/HotJob/HotJob";
import NewJob from "../../components/NewJob/NewJob";
import EmploymentInformation from "../../components/EmploymentInformation/EmploymentInformation";
import RecruitmentBanner from "../../components/RecruitmentBanner/RecruitmentBanner";
import LifeInJT from "../../components/LifeInJT/LifeInJT";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { RecruitmentDetails } from "../pageExport";
import { div } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";
import bannerRecruit from "../../assets/images/banner-tuyển dụng.png";
import { useTranslation } from "react-i18next";

const CareerOpportunities = () => {
  const { pathname } = useLocation();
  const [api, setApi] = useState(`${END_POINT}/career?`);
  const [data, setData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [key, setKey] = useState("");
  const [local, setLocal] = useState("");
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [department, setDepartment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [showDetail, setShowDeatail] = useState(false);
  const [dataDetail, setDataDetail] = useState({});

  const [inforAllJobs, setinforAllJobs] = useState([])
  const { setMetadata } = useContext(MainContext);

  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Tìm kiếm | TKTL",
      };
    });
  }, []);

  const onChangeKey = (e) => {
    setKey(e.target.value);
  };

  const onLocation = (e) => {
    setLocal(e.target.value);
  };

  const onChnageType = (e) => {
    setType(e.target.value);
  };

  const onChangeState = (e) => {
    setState(e.target.value);
  };

  const onChangeDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const getDataFromApi = async (api) => {
    try {
      const res = await axios({
        url: api,
        method: "get",
      });
      console.log(res)
      if (res.status === 200) {
        setData(res.data.data.careers);
        // console.log(data);
      }
    } catch (e) {
      console.log(e);
    }

  };

  const [infor, setinfor] = useState({})
  useEffect(() => {
    const getInfor = async () => {
      const res = await axios.get(`${END_POINT}/career-life`);

      setinfor(res.data.data);
    };
    getInfor();
  }, []);

  const [careerOfdepartment, setcareerOfdepartment] = useState({})
  useEffect(() => {
    const getListDepartment = async () => {
      const res = await axios.get(`${END_POINT}/career/department`);
      console.log(res.data.data)
      setcareerOfdepartment(res.data.data);
    };
    getListDepartment();
  }, []);
  console.log(careerOfdepartment)

  const onSearch = (e) => {
    if (
      key === "" &&
      (local === "" || local === "Tỉnh/Thành phố") &&
      (type === "" || type === "Ngành nghề") &&
      (state === "Chức vụ" || state === "") &&
      (department === "Phòng ban" || department === "")
    ) {
      setShowSearch(false);
      setShowDeatail(false);
    } else {
      let newApi = `${END_POINT}/career?`;
      if (key !== "") {
        newApi = `${newApi}&applicationPosition=${key}`;
      }
      if (local !== "" && local !== "Tỉnh/Thành phố") {
        newApi = `${newApi}&address=${local}`;
      }
      if (type !== "" && type !== "Ngành nghề") {
        newApi = `${newApi}&industry=${type}`;
      }
      if (state !== "Chức vụ" && state !== "") {
        newApi = `${newApi}&position=${state}`;
      }
      if (department !== "Phòng ban" && department !== "") {
        newApi = `${newApi}&department=${department}`;
      }

      getDataFromApi(newApi);
      setShowSearch(true);
      setShowAll(false);
      setShowDeatail(false);
    }
  };

  const onSearchMB = () => {
    let newApi = `${END_POINT}/career?`;
    if (key !== "") {
      newApi = `${newApi}&keyword=${key}`;
      getDataFromApi(newApi);
      setShowSearch(true);
      setShowAll(false);
      setShowDeatail(false);
    } else {
      setShowSearch(false);
      setShowDeatail(false);
    }
  };

  const handleClickAll = () => {
    getDataFromApi(api);
    setShowAll(!showAll);
  };

  const handleClickDetail = (e, item) => {
    setDataDetail(item);
    /*   console.log(dataDetail); */
    setShowDeatail(true);
    setShowSearch(false);
  };
  const { t } = useTranslation("Recruitment");
  console.log(infor)
  return (
    <>
      {pathname === "/tuyen-dung" ? (
        <>
          {/* Banner */}
          <div className="relative">
            <img
              src={infor.topPicture}
              alt="banner"
              className="w-full object-cover"
            />
            <InputDesktop
              onSearch={onSearch}
              onChangeKey={onChangeKey}
              onChangeLocation={onLocation}
              onChangeState={onChangeState}
              onChangeType={onChnageType}
              onChangeDepartment={onChangeDepartment}
            />
            <InputMobile onSearch={onSearchMB} onChangeKey={onChangeKey} />
          </div>

          {/* CONTAINER */}
          <div className="m-auto px-[16px]  lg:px-[50px]">
            {/* JOB LIST */}
            {showSearch === false && showDetail === false && (
              <div className="mt-5 text-2xl lg:mt-28">
                <div
                  className="block lg:flex lg:mx-[30px] justify-between gap-[50px] xl:gap-[100px]"
                  style={{ marginTop: "50px" }}
                >
                  <HotJob setDetail={handleClickDetail} />
                  <NewJob setDetail={handleClickDetail} />
                </div>

                <Link
                  className="text-[16px] text-[#e5a663] font-bold p-[6px] sm:p-[16px] mb-[40px] sm:mb-[48px] bg-[#f2f2f2] inline-block  rounded-lg lg:mx-[30px]"
                  to="/danh-sach-tuyen-dung"
                >
                  <FontAwesomeIcon icon={faEye} className="pr-[8px]" />
                  {t("XEM TẤT CẢ VỊ TRÍ ỨNG TUYỂN")}
                </Link>
              </div>
            )}

            {showAll === true && showDetail === false && (
              <div className="text-2xl">
                {data.length > 0 && (
                  <>
                    {data.map((job, index) => (
                      <div
                        key={index}
                        className="border-[1px] rounded-r-xl before:content-['']  p-[16px] mb-[16px] overflow-hidden bg-[#f2f2f2] lg:hover:scale-105 duration-300"
                      >
                        <h4 className="text-[16px] sm:text-[18px] font-bold tracking-wider whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer">
                          {job.name}
                        </h4>
                        <p className="text-[16px] opacity-70 cursor-pointer truncate">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className=" pr-[16px]"
                          />
                          {job.location}
                        </p>
                        <div style={{ cursor: "pointer" }}>
                          <Link
                            className="text-[14px] text-[#e5a663] tracking-wider flex items-center gap-2 font-bold"
                            to={`/tuyen-dung/${job._id}`}
                          >
                            XEM CHI TIẾT
                          </Link>
                        </div>
                      </div>

                    ))}
                  </>
                )}
              </div>
            )}

            {/* //search */}
            {showSearch && (
              <div className="mt-5 text-2xl lg:mt-44">
                {data && (
                  <>
                    {data.map((job, index) => (
                      <div
                        key={index}
                        className="border-[1px] rounded-r-xl before:content-['']  p-[16px] mb-[16px] overflow-hidden bg-[#f2f2f2] lg:hover:scale-105 duration-300"
                      >
                        <h4 className="text-[16px] sm:text-[18px] font-bold tracking-wider whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer">
                          {job.title}
                        </h4>
                        <p className="text-[16px] opacity-70 cursor-pointer truncate">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className=" pr-[16px]"
                          />
                          {job.addressDescription}
                        </p>
                        <div style={{ cursor: "pointer" }}>
                          <Link
                            className="text-[14px] text-[#e5a663] tracking-wider flex items-center gap-2 font-bold"
                            to={`/tuyen-dung/${job._id}`}
                          >
                            XEM CHI TIẾT
                          </Link>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}

            {showDetail && <RecruitmentDetails data={dataDetail} />}

            {/*  <EmploymentInformation /> */}
          </div>
          <div className="m-auto px-[16px]  lg:px-[50px] p-10">
            <div className="mt-5 text-2xl lg:mt-28">
              <div
                className="grid grid-cols-3 gap-8 lg:mx-[30px] mt-8 border border-black rounded-lg p-10"
                style={{ marginTop: "50px", border: '1px solid black', borderRadius: '10px' }}
              >
                <div>
                  <div>
                    <img src="https://jtexpress.vn/themes/jtexpress/assets/images/khoi-van-phong.png" className="h-[48px] w-[48px]" alt="khoi-van-phong" />
                    <span class="Montserrat-Bold text-[24px] my-4 inline-block font-black">
                      VĂN PHÒNG
                    </span>
                  </div>
                  <div className="">
                    {careerOfdepartment?.office?.CUSTOMERSERVICE > 0 && <div class="department_block_detail border-t-[1px] pt-3">
                      {/* <a href="https://jtexpress.vn/danh-sach-tuyen-dung?career=Trung tâm khai thác&amp;block=VĂN PHÒNG"> */}
                      <div class="flex items-center recruitment_text ">
                        <FontAwesomeIcon icon={faArrowRight} className="w-3 text-red-600" name="arrow-forward-outline" />
                        <span class="ml-2 Montserrat-Bold ">
                          Dịch vụ khách hàng
                        </span>
                      </div>
                      <span class="pl-6 text-[#8A8E92] p-10">
                        {careerOfdepartment?.office?.CUSTOMERSERVICE} vị trí đang tuyển
                      </span>
                      {/* </a> */}
                    </div>}
                    {careerOfdepartment?.office?.ADMINISTRATIVERECEPTIONIST > 0 && <div class="department_block_detail border-t-[1px] pt-3">
                      {/* <a href="https://jtexpress.vn/danh-sach-tuyen-dung?career=Trung tâm khai thác&amp;block=VĂN PHÒNG"> */}
                      <div class="flex items-center recruitment_text ">
                        <FontAwesomeIcon icon={faArrowRight} className="w-3 text-red-600" name="arrow-forward-outline" />
                        <span class="ml-2 Montserrat-Bold ">
                          Nhân viên hành chính
                        </span>
                      </div>
                      <span class="pl-6 text-[#8A8E92] p-10">
                        {careerOfdepartment?.office?.ADMINISTRATIVERECEPTIONIST} vị trí đang tuyển
                      </span>
                      {/* </a> */}
                    </div>}
                    {careerOfdepartment?.office?.LEGAL > 0 && <div class="department_block_detail border-t-[1px] pt-3">
                      {/* <a href="https://jtexpress.vn/danh-sach-tuyen-dung?career=Trung tâm khai thác&amp;block=VĂN PHÒNG"> */}
                      <div class="flex items-center recruitment_text ">
                        <FontAwesomeIcon icon={faArrowRight} className="w-3 text-red-600" name="arrow-forward-outline" />
                        <span class="ml-2 Montserrat-Bold ">
                          Legal
                        </span>
                      </div>
                      <span class="pl-6 text-[#8A8E92] p-10">
                        {careerOfdepartment?.office?.LEGAL} vị trí đang tuyển
                      </span>
                      {/* </a> */}
                    </div>}
                    {careerOfdepartment?.office?.ASSISTANT > 0 && <div class="department_block_detail border-t-[1px] pt-3">
                      {/* <a href="https://jtexpress.vn/danh-sach-tuyen-dung?career=Trung tâm khai thác&amp;block=VĂN PHÒNG"> */}
                      <div class="flex items-center recruitment_text ">
                        <FontAwesomeIcon icon={faArrowRight} className="w-3 text-red-600" name="arrow-forward-outline" />
                        <span class="ml-2 Montserrat-Bold ">
                          Trợ lý
                        </span>
                      </div>
                      <span class="pl-6 text-[#8A8E92] p-10">
                        {careerOfdepartment?.office?.ASSISTANT} vị trí đang tuyển
                      </span>
                      {/* </a> */}
                    </div>}


                  </div>
                </div>

                <div>
                  <div>
                    <img src="https://jtexpress.vn/themes/jtexpress/assets/images/khoi-van-hanh.png" className="h-[48px] w-[48px]" alt="khoi-van-phong" />
                    <span class="Montserrat-Bold text-[24px] my-4 inline-block font-black">
                      KINH DOANH
                    </span>
                  </div>
                  <div className="">
                    {careerOfdepartment?.business?.BUSINESS > 0 &&
                      <div class="department_block_detail border-t-[1px] pt-3">
                        <div class="flex items-center recruitment_text ">
                          <FontAwesomeIcon icon={faArrowRight} className="w-3 text-red-600" name="arrow-forward-outline" />
                          <span class="ml-2 Montserrat-Bold ">
                            Kinh doanh
                          </span>
                        </div>
                        <span class="pl-6 text-[#8A8E92] p-10">
                          {careerOfdepartment?.business?.BUSINESS}vị trí đang tuyển
                        </span>
                      </div>
                    }
                    {careerOfdepartment?.business?.MARKETING > 0 &&
                      <div class="department_block_detail border-t-[1px] pt-3">
                        <div class="flex items-center recruitment_text ">
                          <FontAwesomeIcon icon={faArrowRight} className="w-3 text-red-600" name="arrow-forward-outline" />
                          <span class="ml-2 Montserrat-Bold ">
                          Marketing 
                          </span>
                        </div>
                        <span class="pl-6 text-[#8A8E92] p-10">
                          {careerOfdepartment?.business?.MARKETING}vị trí đang tuyển
                        </span>
                      </div>
                    }

                  </div>
                </div>

                <div>
                  <div>
                    <img src="https://jtexpress.vn/themes/jtexpress/assets/images/khoi-buu-cuc.png" className="h-[48px] w-[48px]" alt="khoi-van-phong" />
                    <span class="Montserrat-Bold text-[24px] my-4 inline-block font-black">
                      VẬN HÀNH
                    </span>
                  </div>
                  <div className="">
                    {careerOfdepartment?.operation?.POSTALSERVICES > 0 &&
                      <div class="department_block_detail border-t-[1px] pt-3">
                        <div class="flex items-center recruitment_text ">
                          <FontAwesomeIcon icon={faArrowRight} className="w-3 text-red-600" name="arrow-forward-outline" />
                          <span class="ml-2 Montserrat-Bold ">
                            Dịch vụ bưu chính

                          </span>
                        </div>
                        <span class="pl-6 text-[#8A8E92] p-10">
                          {careerOfdepartment?.operation?.POSTALSERVICES} vị trí đang tuyển
                        </span>
                      </div>
                    }
                    {careerOfdepartment?.operation?.INFORMATIONTECHNOLOGY > 0 &&
                      <div class="department_block_detail border-t-[1px] pt-3">
                        <div class="flex items-center recruitment_text ">
                          <FontAwesomeIcon icon={faArrowRight} className="w-3 text-red-600" name="arrow-forward-outline" />
                          <span class="ml-2 Montserrat-Bold ">
                            Công nghệ thông tin

                          </span>
                        </div>
                        <span class="pl-6 text-[#8A8E92] p-10">
                          {careerOfdepartment?.operation?.INFORMATIONTECHNOLOGY} vị trí đang tuyển
                        </span>
                      </div>
                    }
                    {careerOfdepartment?.operation?.TRAINING > 0 &&
                      <div class="department_block_detail border-t-[1px] pt-3">
                        <div class="flex items-center recruitment_text ">
                          <FontAwesomeIcon icon={faArrowRight} className="w-3 text-red-600" name="arrow-forward-outline" />
                          <span class="ml-2 Montserrat-Bold ">
                            Đào tạo
                          </span>
                        </div>
                        <span class="pl-6 text-[#8A8E92] p-10">
                          {careerOfdepartment?.operation?.TRAINING} vị trí đang tuyển
                        </span>
                      </div>
                    }
                    {careerOfdepartment?.operation?.FINANCIALACCOUNTING > 0 &&
                      <div class="department_block_detail border-t-[1px] pt-3">
                        <div class="flex items-center recruitment_text ">
                          <FontAwesomeIcon icon={faArrowRight} className="w-3 text-red-600" name="arrow-forward-outline" />
                          <span class="ml-2 Montserrat-Bold ">
                            Kế toán tài chính
                          </span>
                        </div>
                        <span class="pl-6 text-[#8A8E92] p-10">
                          {careerOfdepartment.operation.FINANCIALACCOUNTING} vị trí đang tuyển
                        </span>
                      </div>
                    }
                    {careerOfdepartment?.operation?.AUDITING_INTERNALCONTROL > 0 &&
                      <div class="department_block_detail border-t-[1px] pt-3">
                        <div class="flex items-center recruitment_text ">
                          <FontAwesomeIcon icon={faArrowRight} className="w-3 text-red-600" name="arrow-forward-outline" />
                          <span class="ml-2 Montserrat-Bold ">
                            Kiểm toán và kiểm soát nội bộ
                          </span>
                        </div>
                        <span class="pl-6 text-[#8A8E92] p-10">
                          {careerOfdepartment?.operation?.AUDITING_INTERNALCONTROL} vị trí đang tuyển
                        </span>
                      </div>
                    }
                    {careerOfdepartment?.operation?.QUALITYMANAGEMENT > 0 &&
                      <div class="department_block_detail border-t-[1px] pt-3">
                        <div class="flex items-center recruitment_text ">
                          <FontAwesomeIcon icon={faArrowRight} className="w-3 text-red-600" name="arrow-forward-outline" />
                          <span class="ml-2 Montserrat-Bold ">
                            QUản lý chất lượng

                          </span>
                        </div>
                        <span class="pl-6 text-[#8A8E92] p-10">
                          {careerOfdepartment?.operation?.POSTALSERVICES} vị trí đang tuyển
                        </span>
                      </div>
                    }
                    {careerOfdepartment?.operation?.PURCHASING > 0 &&
                      <div class="department_block_detail border-t-[1px] pt-3">
                        <div class="flex items-center recruitment_text ">
                          <FontAwesomeIcon icon={faArrowRight} className="w-3 text-red-600" name="arrow-forward-outline" />
                          <span class="ml-2 Montserrat-Bold ">
                            Thu mua
                          </span>
                        </div>
                        <span class="pl-6 text-[#8A8E92] p-10">
                          {careerOfdepartment?.operation?.PURCHASING} vị trí đang tuyển
                        </span>
                      </div>
                    }
                    {careerOfdepartment?.operation?.OPERATIONSCENTER > 0 &&
                      <div class="department_block_detail border-t-[1px] pt-3">
                        <div class="flex items-center recruitment_text ">
                          <FontAwesomeIcon icon={faArrowRight} className="w-3 text-red-600" name="arrow-forward-outline" />
                          <span class="ml-2 Montserrat-Bold ">
                            Trung tâm điều hành
                          </span>
                        </div>
                        <span class="pl-6 text-[#8A8E92] p-10">
                          {careerOfdepartment?.operation?.OPERATIONSCENTER} vị trí đang tuyển
                        </span>
                      </div>
                    }
                    {careerOfdepartment?.operation?.OPERATIONS > 0 &&
                      <div class="department_block_detail border-t-[1px] pt-3">
                        <div class="flex items-center recruitment_text ">
                          <FontAwesomeIcon icon={faArrowRight} className="w-3 text-red-600" name="arrow-forward-outline" />
                          <span class="ml-2 Montserrat-Bold ">
                            Vận hành
                          </span>
                        </div>
                        <span class="pl-6 text-[#8A8E92] p-10">
                          {careerOfdepartment?.operation?.OPERATIONS} vị trí đang tuyển
                        </span>
                      </div>
                    }


                  </div>
                </div>

              </div>
            </div>

          </div>
          <RecruitmentBanner infor={infor} />
          <LifeInJT />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default CareerOpportunities;

import React from "react";
import Banner from "../../assets/images/banner.png";
import LifeInJTDetail from "../../components/LifeInJTDetail/LifeInJTDetail";
import Welfare from "../../components/Welfare/Welfare";
import RecruitmentBannerForLife from "../../components/RecruitmentBannerForLife/RecruitmentBannerForLife";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { END_POINT } from "../../utils/constant";
import { MainContext } from "../../context/MainContext";
import { useContext } from "react";

const Life = () => {
  const { accessToken } = useContext(MainContext);
  
  const [data,setdata] = useState({})
  useEffect(() => {
    const getInfor = async () => {
      const res = await axios.get(`${END_POINT}/career-life`);
      
      console.log(res.data.data);
      setdata(res.data.data);
    };
    getInfor();
  },[]);
  return (
    <>
      <div>
        <img src={data.topPicture} alt="Banner" />
      </div>
      <LifeInJTDetail data={data} />
      <Welfare data={data}/>
      <RecruitmentBannerForLife data={data}/>
    </>
  );
};

export default Life;
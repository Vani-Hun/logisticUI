import React from "react";
import Logo from "../../assets/icons/logo-tkt.svg";
import lifeInTK from "../../assets/images/lifetk1.png";
import {
  faCity,
  faAward,
  faFutbolBall,
  faHeart,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const LifeInJTDetail = ({data}) => {
  const {t} = useTranslation("Life")
  return (
    <div className="m-auto px-[16px] lg:px-[30px]">
      <div className="lg:gap-x-16 lg:grid lg:grid-cols-2 my-[60px]">
        <div className="tracking-wide">
          <h3 className="text-[32px] font-bold mb-4">{t(`${data?.nameLife}`)}</h3>
          <h5 className="text-base text-[#e5a663] font-bold">
            {t(`${data?.contentLife}`)}
          </h5>
          <p className="mb-8">
            {t(`${data?.descriptionLife}`)}
          </p>
          <h4 className="flex gap-2 mb-4 text-xl font-bold">
            {t(`${data?.nameTeammatePortrait}`)}{" "}
            <img className="h-[36px]" src={data?.logoTeammatePortrait} alt="" />
          </h4>

          <div className="gap-2 mb-4 font-bold tracking-wide md:grid md:grid-cols-2 ">
          {data.teammatePortrait &&data.teammatePortrait.map((Portrait,index)=>{
            return <div key={index} className="box-content flex items-center gap-4 p-4 border rounded-lg">
            {/* <FontAwesomeIcon
              icon={faAward}
              className="text-4xl text-[#e5a663] border rounded-lg p-2"
            /> */}
            <img src={`${Portrait?.logo}`} className="text-4xl text-[#e5a663] border rounded-lg p-2"/>
            {/* {t('Đảm việc công')} <br /> {t('Giỏi việc tư')} */}
            {Portrait?.name}
          </div>
          })}
           
            
          </div>
          <h4 className="flex gap-2 mb-4 text-xl font-bold">
          <img src={`${data?.address?.logo}`} className="text-4xl text-[#e5a663] border rounded-lg "/>

            {/* <FontAwesomeIcon icon={data.address.logo} className="text-[#e5a663]" />  */}
            {data?.address?.name}
          </h4>
          <p>
          {data?.address?.detail}

          </p>
        </div>

        <div>
          <img src={data?.rightPicture} alt="piture" />
        </div>
      </div>
    </div>
  );
};

export default LifeInJTDetail;

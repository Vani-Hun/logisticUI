import Images from '../../utils/images';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { END_POINT } from '../../utils/constant';
import { MainContext } from '../../context/MainContext';

const LifeInJT = () => {
  const [lifeStyles, setlifeStyles] = useState({})
  const { accessToken } = useContext(MainContext);

  useEffect(() => {
    const getLifeStyle = async () => {
      // const res = await axios.get(`${END_POINT}/life-style/64f19b425f296065140008f9`);
      // console.log(res)
      const res = await axios.get(`${END_POINT}/admin/life-style`, {
        headers: { 'x-access-token': `${accessToken}` },
        // headers: { 'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM3NWE5MmQ4YTAzMWQ4OTVhOGNiMmUiLCJyb2xlIjoiYWRtaW4iLCJyb2xlSWQiOiI2NGM3NWE5MWQ4YTAzMWQ4OTVhOGNiMmMiLCJpYXQiOjE2OTM4MTc0MTEsImV4cCI6MTY5MzgzMTgxMX0.HgHs6xmAvTCq1Nb8YdWrOmyYNPy4hBXRt7-P7vZpJ04` },
    });
    console.log(res)
      setlifeStyles(res.data.data);
    };
    getLifeStyle();
  }, []);
  const { t } = useTranslation('Recruitment')
  return (
    <div className="m-auto px-[16px] lg:px-[0px] text-2xl mt-5 mb-[60px]">
      <div className="flex justify-between mb-[20px] lg:mx-[30px]">
        <h3 className="flex items-center font-extrabold text-1xl sm:text-3xl my-auto">
          {t('Cuộc sống')}<img className="ml-2 h-[36px]" src={lifeStyles[0]?.imageAboutUs} alt="" />
        </h3>
        <Link
          to="/cuoc-song"
          className="hidden items-center gap-2 bg-[#e5a663] px-[12px] sm:py-[4px] sm:px-[16px] rounded-lg text-[14px] text-[#000] sm:text-sm sm:flex"
        >
          <RightOutlined className="text-[12px] sm:text-sm" />
          {t('Xem chi tiết')}
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 overflow-hidden md:grid-cols-3 md:gap-8">
        {lifeStyles&& lifeStyles[0]?.containerImage?.length > 0 &&
          lifeStyles[0].containerImage.map((containerImage,index)=>{
            return(  <img
            key={index}
              src={containerImage}
              alt="J&T daily working"
              className="w-[100%] h-[100%] rounded-lg shadow-xl"
            />)
          })
        }
        {/* <img
          src={Images.image2}
          alt="J&T daily working"
          className="w-[100%] h-[100%] rounded-lg shadow-xl"
        />
        <img
          src={Images.image3}
          alt="J&T daily working"
          className="w-[100%] h-[100%] rounded-lg shadow-xl"
        />
        <img
          src={Images.image4}
          alt="J&T daily working"
          className="w-[100%] h-[100%] rounded-lg shadow-xl"
        />
        <img
          src={Images.image5}
          alt="J&T daily working"
          className="w-[100%] h-[100%] rounded-lg shadow-xl"
        />
        <img
          src={Images.image6}
          alt="J&T daily working"
          className="w-[100%] h-[100%] rounded-lg shadow-xl"
        /> */}
      </div>

      <a
        href="#"
        className="flex sm:hidden items-center gap-2 bg-[#e5a663] px-[12px] sm:py-[4px] sm:px-[16px] rounded-lg text-[14px] sm:text-sm mt-[16px] w-[120px]  text-[#000]"
      >
        <RightOutlined className="text-[12px] sm:text-sm" />
        Xem chi tiết
      </a>
    </div>
  );
};

export default LifeInJT;

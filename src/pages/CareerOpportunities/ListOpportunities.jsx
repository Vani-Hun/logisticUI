import axios from "axios";
import React, { useEffect, useState } from "react";
import NewJob from "../../components/NewJob/NewJob";
import { END_POINT } from "../../utils/constant";
import bannerRecruit from "../../assets/images/banner-tuyển dụng.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ListOpportunities = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const res = await axios({
          url: `${END_POINT}/career`,
          method: "get",
        });
        console.log(res)
        if (res.status === 200) {
          setData(res.data.data.careers);
          console.log(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getDataFromApi();
  }, []);

  return (
    <div className="mx-10">
      <div className="relative" style={{ top: "35px" }}>
        <img src={bannerRecruit} alt="banner" />
      </div>

      <div className="mt-5 text-2xl lg:mt-20">
        <div
          className=" lg:flex justify-between gap-[100px] w-[100%]"
          style={{ marginTop: "10px" }}
        >

          <div className="w-[100%]">
            {data && (
              <>
                {data.map((job, index) => {
                 
                  return (
                    <Link
                      to={`/tuyen-dung/${job?._id}`}
                      key={index}
                    >
                      <div
                        className="border-[1px] rounded-r-xl before:content-[''] before:block before:border-l-[10px] before:border-[#ccc] p-[16px] mb-[16px] bg-[#f2f2f2] lg:hover:scale-105 duration-300"
                      >
                        <h4 className="text-[16px] sm:text-[18px] font-bold tracking-wider cursor-pointer truncate">
                          {job?.position}-{job?.title}
                        </h4>
                        <p className="text-[16px] opacity-70 cursor-pointer truncate">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className=" pr-[16px]"
                          />
                          {job?.addressDescription}
                        </p>
                        <div style={{ cursor: "pointer" }}
                          className="text-[14px] text-[#e5a663] tracking-wider flex items-center gap-2 font-bold"

                        >
                          <FontAwesomeIcon icon={faAngleRight} className="pr-[10px]" />
                          Xem chi tiết
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOpportunities;

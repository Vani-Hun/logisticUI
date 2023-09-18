import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function BlogHeader({tittle}) {
  const url = useLocation();
  const {t} = useTranslation('Blog')

  return (
    <>
      <div className="px-[180px] flex justify-between items-center py-[20px]">
        <div className="text-[40px] font-bold">{tittle}</div>
        <div className="flex justify-center items-center">
          <Link to="/tin-tuc-noi-bat">
            <button
              className={`${
                url.pathname === "/tin-tuc-noi-bat" &&
                "bg-[#f0b90b] text-[#fff]"
              } py-[10px] px-[20px] rounded-[20px] bg-[#cacaca] text-[16px] font-bold ml-[5px]`}
            >
              {t("Tin tức nổi bật")}
            </button>
          </Link>
          <Link to="/j-magazine">
            <button
              className={`${
                url.pathname === "/j-magazine" && "bg-[#f0b90b] text-[#fff]"
              } py-[10px] px-[20px] rounded-[20px] bg-[#cacaca] text-[16px] font-bold ml-[5px]`}
            >
              J-Magazine
            </button>
          </Link>
          <Link to="/su-kien">
            <button
              className={`${
                url.pathname === "/su-kien" && "bg-[#f0b90b] text-[#fff]"
              } py-[10px] px-[20px] rounded-[20px] bg-[#cacaca] text-[16px] font-bold ml-[5px]`}
            >
              {t("Sự kiện")}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default BlogHeader;

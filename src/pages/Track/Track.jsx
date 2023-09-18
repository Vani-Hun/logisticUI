import { Tabs } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";
import BangGia from "./BangGia";
import BuuCuc from "./BuuCuc";
import CuocVanChuyen from "./CuocVanChuyen";
import HangCamGui from "./HangCamGui";
import VanDon from "./VanDon";
import { useTranslation } from "react-i18next";
import axios from "axios";
const { TabPane } = Tabs;

export default function Track({ number }) {
  const { aboutUs, fetchAboutUs } = useContext(MainContext);
  useEffect(() => {
    fetchAboutUs();
  }, []);
  console.log(aboutUs.banners)

  const onChange = (key) => {
    console.log(key);
  };
const [getSearchBanner,setgetSearchBanner]=useState('')
  useEffect(() => {
    const getAbout = async () => {
      const res = await axios.get(`${END_POINT}/about/getSearchBanner`);
      console.log(res);
      const { data } = res.data;
      console.log(data)
      setgetSearchBanner(data);
    };
    getAbout();
  },[])
  const navigate = useNavigate();
  const [defaultService, setDefaultService] = useState("cước vận chuyển");
  function callback(dichVu) {
    setDefaultService(dichVu);
    navigate(`/tra-cuu/${dichVu}`);
  }
  const { t } = useTranslation('Track')
  return (
    <>
      {getSearchBanner && (
        <img
          className="w-full h-[200px] md:h-[300px] lg:h-[550px] object-cover"
          src={getSearchBanner}
          alt="banner"
        />
      )}
      <div
        className="custom-tab shadow-[#000000] container mx-auto text-xl "
        style={{ maxWidth: "1200px" }}
      >
        <Tabs
          activeKey={number}
          onChange={callback}
          centered
          size="large"
          tabPosition="top"
          type="line"
          className="p-3"
          tabBarStyle={{ color: "#fcd535" }}
        >
          <TabPane tab={t("Cước vận chuyển")} key="cuoc-van-chuyen">
            <CuocVanChuyen />
          </TabPane>
          <TabPane tab={t("Bưu cục gần đây")} key="buu-cuc">
            <BuuCuc />
          </TabPane>
          <TabPane tab={t("Vận đơn")} key="van-don">
            <VanDon />
          </TabPane>
          <TabPane tab={t("Bảng giá")} key="bang-gia">
            <BangGia />
          </TabPane>
          <TabPane tab={t("Hàng cấm gửi")} key="hang-cam-gui">
            <HangCamGui />
          </TabPane>
        </Tabs>
      </div>
      <Outlet />
    </>
  );
}

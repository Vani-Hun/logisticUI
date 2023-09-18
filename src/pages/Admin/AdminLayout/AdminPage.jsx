import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import {
  MdGroup,
  MdConnectWithoutContact,
  MdOutlineDeliveryDining,
} from "react-icons/md";
import {
  FaHandshake,
  FaWarehouse,
  FaTruckMoving,
  FaRoad,
  FaQuoteLeft,
  FaTree,
} from "react-icons/fa";
import {
  AiFillBook,
  AiOutlineMessage,
  AiOutlinePartition,
  AiOutlineUserAdd,
  AiOutlineUser
} from "react-icons/ai";
import { BsFillPersonFill, BsPaperclip } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import { ImProfile } from "react-icons/im";
import { Layout, Menu } from "antd";
import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import logo from "../../../assets/icons/logo-business.png";
import { MainContext } from "../../../context/MainContext";
import AdminDropDownAvatar from "./AdminDropDownAvatar";
const { Header, Sider, Content } = Layout;

export default function AdminPage() {
  const { user, setMetadata } = useContext(MainContext);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Quản trị | TKTL",
      };
    });
  }, []);
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(
      <div>
        <Link to="ve_chung_toi">Về chúng tôi</Link>
      </div>,
      "1",
      <MdGroup />
    ),
    getItem(
      <div>
        <Link to="lien_he">Liên hệ</Link>
      </div>,
      "2",
      <MdConnectWithoutContact />
    ),

    getItem(
      <div>
        <Link to="commitment">Cam kết</Link>
      </div>,
      "3",
      <FaHandshake />
    ),
    getItem(
      <div>
        <Link to="subcommitment">Cam kết phụ</Link>
      </div>,
      "4",
      <FaHandshake />
    ),
    getItem(
      <div>
        <Link to="tin_nhan">Gửi tin nhắn</Link> {/*contact message*/}
      </div>,
      "5",
      <AiOutlineMessage />
    ),
    getItem(
      <div>
        <Link to="dich-vu">Dịch vụ vận chuyển</Link>
      </div>,
      "6",
      <MdOutlineDeliveryDining />
    ),
    getItem(
      <div>
        <Link to="doi-tuong">Đối tượng</Link>
      </div>,
      "7",
      <AiOutlineUser />
    ),
    getItem(
      <div>
        <Link to="partner">Đối tác</Link>
      </div>,
      "8",
      <FaHandshake />
    ),
    getItem(
      <div>
        <Link to="tuyen-dung">Tuyển dụng</Link>
      </div>,
      "9",
      <BsPaperclip />
    ),
    getItem(
      <div>
        <Link to="ung-vien">Ứng viên</Link>
      </div>,
      "10",
      <ImProfile />
    ),
    getItem(
      <div>
        <Link to="phong-ban">Phòng ban</Link>
      </div>,
      "11",
      <AiOutlinePartition />
    ),
    getItem(
      <div>
        <Link to="buu_cuc">Bưu cục</Link>
      </div>,
      "12",
      <FaQuoteLeft> </FaQuoteLeft>
    ),
    getItem(
      <div>
        <Link to="kho">Kho bãi</Link>
      </div>,
      "13",
      <FaWarehouse />
    ),
    getItem(
      <div>
        <Link to="phuong-tien">Phương tiện</Link>
      </div>,
      "14",
      <FaTruckMoving />
    ),
    getItem(
      <div>
        <Link to="hanh-trinh">Hành trình</Link>
      </div>,
      "15",
      <FaRoad />
    ),
    getItem(
      <div>
        <Link to="them-nhan-vien">Thêm nhân viên mới</Link>
      </div>,
      "16",
      <AiOutlineUserAdd />
    ),
    getItem(
      <div>
        <Link to="nhan_vien">Nhân viên</Link>
      </div>,
      "17",
      <DesktopOutlined> </DesktopOutlined>
    ),
    getItem(
      <div>
        <Link to="don_hang">Đơn hàng</Link>
      </div>,
      "18",
      <DesktopOutlined> </DesktopOutlined>
    ),
    getItem(
      <div>
        <Link to="phi-bao-tri">Bảo trì, sửa chữa</Link>
      </div>,
      "19",
      <DesktopOutlined> </DesktopOutlined>
    ),
    getItem(
      <div>
        <Link to="hang_cam_gui">Hàng cấm gửi</Link>
      </div>,
      "20",
      <DesktopOutlined> </DesktopOutlined>
    ),
    getItem(
      <div>
        <Link to="hoa_don">Hóa đơn</Link>
      </div>,
      "21",
      <DesktopOutlined> </DesktopOutlined>
    ),
    getItem(
      <div>
        <Link to="doanh_so">Doanh thu</Link>
      </div>,
      "22",
      <DesktopOutlined> </DesktopOutlined>
    ),
    getItem(
      <div>
        <Link to="khach_hang">Khách hàng</Link>
      </div>,
      "23",
      <DesktopOutlined> </DesktopOutlined>
    ),
    getItem(
      <div>
        <Link to="lich_trinh">Lịch trình</Link>
      </div>,
      "24",
      <DesktopOutlined> </DesktopOutlined>
    ),
    getItem(
      <div>
        <Link to="dang-tai-blog">Đăng tải blog</Link>
      </div>,
      "25",
      <AiFillBook />
    ),
    getItem(
      <div>
        <Link to="trich_dan">Quản lý Trích Dẫn</Link>
      </div>,
      "26",
      <FaQuoteLeft> </FaQuoteLeft>
    ),
    getItem(
      <div>

        <Link to="admin_chat">Tư vấn</Link>
      </div>,
      "27",
      <FaQuoteLeft> </FaQuoteLeft>
    ), getItem(
      <div>

        <Link to="life-style">Life Style</Link>
      </div>,
      "28",
      <FaTree> </FaTree>
    ),
    getItem(
      <div>

        <Link to="strength">Strength</Link>
      </div>,
      "29",
      <FaQuoteLeft> </FaQuoteLeft>
    ),

    // getItem("User", "sub1", <UserOutlined />, [getItem("Tom", "3"), getItem("Bill", "4"), getItem("Alex", "5")]),
  ];
  if (user && user === "admin") {
    return (
      <Layout
        className=""
        style={{
          minHeight: "100vh",
        }}
      >
        <div id="scrollablesider" style={{ height: '100vh', overflowY: "auto", flex: 'none' }}>
          <InfiniteScroll
            dataLength={items.length}
            scrollableTarget="scrollablesider"
          >
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              // width={205}
              className="uppercase" //hidden xl:block
              style={{
                background: "#fff",
              }}
            >
              <Link to="/">
                <div className="logo">
                  <img src={logo} alt="" className="w-full h-full p-2"></img>
                </div>
              </Link>
              <Menu
                theme=""
                mode="inline"
                defaultSelectedKeys={[""]}
                items={items}
              />
            </Sider>
          </InfiniteScroll>
        </div>
        <div id="scrollableContent" style={{ height: '100vh', overflowY: "auto", flex: 'auto' }}>
          <InfiniteScroll
            dataLength={items.length}
            scrollableTarget="scrollableContent"
          >
            <Layout className="site-layout">
              <Header
                className="site-layout-background"
                style={{
                  padding: 0,
                  background: "#fff",
                }}
              >
                <div className="flex flex-row justify-between pr-10">
                  {React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                      className: "trigger",
                      onClick: () => setCollapsed(!collapsed),
                      style: {
                        padding: " 0 24px",
                        fontSize: "18px",
                        lineHeight: "64px",
                        cursor: "pointer",
                        transition: "color 0.3s",
                        color: "orange",
                      },
                    }
                  )}
                  <AdminDropDownAvatar></AdminDropDownAvatar>
                </div>
              </Header>
              <Content
                className="site-layout-background"
                style={{
                  margin: "24px 12px",
                  // padding: 24,
                  minHeight: 280,
                }}
              >
                <Outlet></Outlet>
              </Content>
            </Layout>
          </InfiniteScroll>
        </div>

      </Layout>
    );
  }
  return <Navigate to="/dang-nhap-nhan-vien" />;
}

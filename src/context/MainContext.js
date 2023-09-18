import { createContext, useEffect, useState } from "react";
import axios from "axios";

import { END_POINT } from './../utils/constant';
import { message } from "antd";
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

export const MainContext = createContext();
const MainProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);
  const [refreshNoti, setRefreshNoti] = useState(1)
  const [dataWarehouse, setDataWarehouse] = useState({
    province: null,
    district: null
  })
  const [metadata, setMetadata] = useState({
    title: 'Tien Kim Thanh Logistics',
    description: 'Webapp of Tien Kim Thanh Logistics for logistic services',
    meta: {
      name: {
        title: 'Tien Kim Thanh Logistics',
        keywords: 'logistic,logistics,trucking,transport,TKTL,Tien Kim Thanh',
      }
    }
  })

  const [order, setOrder] = useState(null)

  const [aboutUs, setAboutUs] = useState({})
  const [contactUs, setContactUs] = useState({})
  const [dataSearchByKeyword, setDataSearchByKeyword] = useState([]) //this data is result of fetchDataByKeyword function

  const fetchDataByKeyword = async (keyword) => {
    try {
      const { data: res } = await axios.get(`${END_POINT}/blog`, {
        params: {
          current: 1,
          pageSize: 1000,
          total: 1000,
          page: 0,
          keyword: keyword,
          sortBy: null,
        }
      });
      let dataOfBlog = res.data.blog;
      setDataSearchByKeyword(dataOfBlog)
    } catch (error) {
      console.error(error.message);
    }

  };

  useEffect(async () => {
    fetchAboutUs()
    fetchContactUs()
  }, [])

  const fetchAboutUs = async () => {
    try {
      const res = await axios.get(`${END_POINT}/about`)
      setAboutUs(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchContactUs = async () => {
    try {
      const res = await axios.get(`${END_POINT}/contactUs`)
      setContactUs(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // const checkAuthenticated = async () => {
  //   let token = null, refresh = null
  //   if (!refreshToken)
  //     refresh = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_REFRESH_NAME)
  //   if (!accessToken)
  //     token = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN_NAME)
  //   if (!token) return false
  //   try {
  //     const res = await axios.post(`${END_POINT}/auth/verify-token`, { accessToken: token, refreshToken: refresh })
  //     const { data } = res.data
  //     setUser(data.user)
  //     if (data.accessToken)
  //       setAccessToken(data.accessToken)
  //     else
  //       setAccessToken(token)
  //     setRefreshToken(refresh)
  //   } catch (error) {
  //     return false
  //   }
  //   return true
  // }

  const checkAuthenticated = async () => {
    console.log("Running through here!!!")
    let accesstoken = null, refreshtoken = null
    if (!refreshToken)
      refreshtoken = Cookies.get('refreshToken')
    if (!accessToken)
      accesstoken = Cookies.get('accessToken')
    if (!accesstoken) return false
    console.log("REFRESH TOKEN HERE: ", refreshtoken)
    try {
      const result = await axios({
        url: `${END_POINT}/auth/new-token`,
        method: "post",
        headers: {'x-refresh-token': refreshtoken}
      })
      if (result.status === 200) {
        const { data } = result.data
        const user_data = jwt_decode(accesstoken)
        console.log("USER DATA ROLE: ", user_data.role)
        setUser(user_data.role)
        if (data.accessToken)
          setAccessToken(data.accessToken)
        else
          setAccessToken(accesstoken)
        setRefreshToken(refreshtoken)
      }
    } catch (error) {
      return false
    }
    return true
  }

  const loginHandle = (_accessToken, _refreshToken, user) => {
    setUser(user);
    setAccessToken(_accessToken);
    setRefreshToken(_refreshToken)
    localStorage.setItem(
      process.env.REACT_APP_LOCALSTORAGE_REFRESH_NAME,
      _refreshToken
    );
    localStorage.setItem(
      "login",
      "login"
    );
    localStorage.setItem(
      process.env.REACT_APP_LOCALSTORAGE_TOKEN_NAME,
      _accessToken
    );
    Cookies.set("accessToken", _accessToken)
    Cookies.set("refreshToken", _refreshToken)
  };

  const logoutHandle = async () => {
    console.log(accessToken)
    const refreshToken = localStorage.getItem(
      process.env.REACT_APP_LOCALSTORAGE_REFRESH_NAME
    );
    try {
      await axios.post(
        `${END_POINT}/auth/logout`,
        {
          refreshToken,
        },
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );

      console.log("Log out successfully.")
    }
    catch (err) {
      console.log(err);
    }
    finally {
      localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN_NAME);
      localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_REFRESH_NAME);
      localStorage.removeItem("login");
      setAccessToken(null);
      setRefreshToken(null)
      setUser(null);
      message.success({
        content: "Đăng xuất thành công",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
    }
  };
  /* useEffect(()=>{
   checkAuthenticated()
  },[]) */
  return (
    <MainContext.Provider
      value={{
        accessToken,
        user,
        loginHandle,
        logoutHandle,
        checkAuthenticated,
        metadata,
        setMetadata,
        dataWarehouse,
        setDataWarehouse,
        setOrder,
        order,
        refreshNoti,
        setRefreshNoti,
        aboutUs,
        contactUs,
        fetchAboutUs,
        fetchContactUs,
        dataSearchByKeyword,
        fetchDataByKeyword
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;

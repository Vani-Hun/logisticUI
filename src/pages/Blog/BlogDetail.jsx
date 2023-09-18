import { Col, Row, Typography } from "antd";
import { useParams } from "react-router-dom";

import { CalendarOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useContext } from "react";
import { END_POINT } from "../../../src/utils/constant";
import { MainContext } from "../../context/MainContext";
import axios from "axios";
import ListCardSmall from "../../components/Blog/ListCardSmall";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

function BlogDetail() {
  const [data, setData] = useState({});
  const [relatedBlog, setRelatedBlog] = useState([]);
  const [value, setValue] = useState('');
  const { accessToken } = useContext(MainContext);
  const urlParam = useParams();

  const fetchData = async () => {
    try {
      const res = await axios.get(`${END_POINT}/blog/${urlParam.blogId}`);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const params = {
    current: 1,
    pageSize: 1000,
    total: 1000,
    page: 0,
    keyword: null,
    sortBy: null,
    type: `${data.type}`,
  };

  // hàm gọi api lấy các type liên quan

  const getBlogList = async () => {
    try {
      const result = await axios({
        url: `${END_POINT}/blog`,
        method: "get",
        params: params,
        headers: {
          'x-access-token': `${accessToken}`
        }
      })
      setRelatedBlog(result.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [urlParam.blogId]);

  useEffect(() => {
    if (data.type) {
      params.type = data.type
      getBlogList();
    }
  }, [data.type]);

  console.log("type:", data.type)
  console.log("relatedBlog", relatedBlog);

  const splitDate = data.date?.split("-");
  
  //console.log("dataDetail",d[2].substr(0,2)+'-'+d[1]+'-'+d[0])
  return (
    <div>
      <div className="quill-container">
        <ReactQuill theme="snow" value={value} onChange={setValue}/>
      </div>
      <Row style={{ margin: "100px", marginTop: "150px" }} gutter={[30, 30]}>
        <Col span={16} style={{ marginBottom: "50px" }}>
          <Typography.Title level={1} style={{ fontWeight: "700" }}>
            {data.type}
          </Typography.Title>
          <div className="w-[700px] h-[450px] mb-[10px]">
            <img
              className="w-full h-full object-cover"
              src={`${data.picture}`}
              alt="anh bai viet"
            />
          </div>
          {/* <h1>{location.pathname}</h1> */}
          {
            <CalendarOutlined
              style={{ verticalAlign: "middle", marginRight: 8 }}
            />
          }
          <span style={{ verticalAlign: "middle" }}>
            {splitDate
              ? splitDate[2].substr(0, 2) +
                "-" +
                splitDate[1] +
                "-" +
                splitDate[0]
              : ""}
          </span>
          <Typography.Title>{data.title}</Typography.Title>
          <Typography.Text>{data.content}</Typography.Text>
        </Col>
        <Col span={8}>
          <Typography.Title level={3}>Bài Viết Liên Quan</Typography.Title>
          {relatedBlog.slice(0, 4).map((itemData, index) => (
            <ListCardSmall key={index} data={itemData} />
          ))}
        </Col>
      </Row>
    </div>
  );
}
export default BlogDetail;

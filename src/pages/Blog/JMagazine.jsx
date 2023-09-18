import { useEffect, useState, useContext } from "react";
import { Row, Col } from "antd";
import { END_POINT } from "../../../src/utils/constant";
import axios from "axios";

import BlogHeader from "../../components/Blog/BlogHeader";
import BlogCard from "../../components/Blog/BlogCard";
import { MainContext } from "../../context/MainContext";

function JMagazine() {
  const [data, setData] = useState([]);
  const { accessToken } = useContext(MainContext);
  const params = {
    current: 1,
    pageSize: 1000,
    total: 1000,
    page: 0,
    keyword: null,
    sortBy: null,
    categorys: "J-Magazine",
  };
  const fetchData = async () => {
    try {
      const result = await axios({
        url: `${END_POINT}/blog`,
        method: "get",
        params: {
          'page': '0',
          'pageSize': '20',
          'type': 'j_magazine'
        },
        headers: {
          'x-access-token': `${accessToken}`
        }
      })
      setData(result.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(" data", data);

  return (
    <>
      <BlogHeader tittle={"Blog"}/>
      <div className="px-[180px] pb-[50px]">
        <Row gutter={[16, 24]}>
        {data && data.length > 0 ?
          data.map((itemData, index) => (
            <Col className="gutter-row" span={8}>
              <BlogCard key={index} data={itemData} />
            </Col>
          )
          ) : (
            <p>Loading ...</p>
          )}
        </Row>
      </div>
    </>
  );
}

export default JMagazine;

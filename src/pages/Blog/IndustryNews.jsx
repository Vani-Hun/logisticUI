import { useEffect, useState, useContext } from "react";
import { Row, Col } from "antd";
import { END_POINT } from "../../../src/utils/constant";
import axios from "axios";
import { MainContext } from "../../context/MainContext";

import BlogHeader from "../../components/Blog/BlogHeader";
import BlogCard from "../../components/Blog/BlogCard";

function IndustryNews() {
  const [data, setData] = useState([]);
  const [image, setImage] = useState([])
  const { accessToken } = useContext(MainContext);
  const params = {
    current: 1,
    pageSize: 1000,
    total: 1000,
    page: 0,
    keyword: null,
    sortBy: null,
    categorys: "Industry news",
  };
  const fetchData = async () => {
    try {
      const result = await axios({
        url: `${END_POINT}/blog`,
        method: "get",
        params: {
          'page': '0',
          'pageSize': '20',
          'type': 'industry_news'
        },
        headers: {
          'x-access-token': `${accessToken}`
        }
      })
      console.log("result:", result)
      setData(result.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  console.log(" data", data);

  const dateArray = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  console.log("date:", dateArray)
  const newestElements = dateArray.slice(0, 2);
  const nextNewestElements = dateArray.slice(2, 6);
  const remainingElements = dateArray.slice(6);

  const blogStyle = {
    gridTemplateColumns: "1fr 317px",
    gridColumnGap: "63px"
  }

  return (
    <>
      <BlogHeader tittle={"Blog"} />
      <div>
        {data && data.length > 0 ?
        <div>
          <div className="px-[180px] pb-[50px]">
            <div style={blogStyle} className="grid container mx-auto px-4 lg:px-0 mb-[40px] lg:mb-[38px]">
              <Row className="lg:block h-[530px] hidden overflow-hidden">
                <div className="grid grid-cols-2 gap-x-[30px] h-[530px]">
                  {newestElements.map((itemData) => (
                    <Col key={itemData._id} className="gutter-row h-full max-w-full" span={8}>
                      <BlogCard data={itemData} width={"350px"} height={"350px"}/>
                    </Col>
                  ))}
                </div>
              </Row>
              <Col className="flex flex-col gap-y-[16px] mb-4 lg:mb-0">
                {nextNewestElements.map((itemData) => (
                  <Row key={itemData._id} className="gutter-row" span={8}>
                    <BlogCard 
                      data={itemData} 
                      width={"120px"} 
                      height={"120px"} 
                      widthImg={"120px"} 
                      heightImg={"120px"} 
                      display={"flex"}
                      alignItems={"center"}
                      />
                  </Row>
                ))}
              </Col>

            </div>
            <div className="container mx-auto flex flex-col-reverse lg:flex-row px-4 lg:px-0">
              <div className="w-full">
                <Col>
                  {remainingElements.map((itemData) => (
                    <Row key={itemData._id} className="mb-6" span={8}>
                      <BlogCard
                        data={itemData}
                        widthImg={"250px"}
                        heightImg={"250px"}
                        display={"flex"}
                        alignItems={"center"}
                      />
                    </Row>
                  ))}
                </Col>
              </div>
            </div>
          </div>
        </div>
        : (
          <p className="px-[180px] pb-[50px]">Loading ...</p>
        )}
      </div>
    </>
  );
}

export default IndustryNews;

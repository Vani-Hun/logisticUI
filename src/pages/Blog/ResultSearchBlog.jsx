import BlogHeader from "../../components/Blog/BlogHeader"
import BlogCard from "../../components/Blog/BlogCard"
import { useContext } from "react"
import { Row, Col } from "antd";
import { MainContext } from "../../context/MainContext";
const ResultSearchBlog = () => {
    const { dataSearchByKeyword, fetchDataByKeyword } = useContext(MainContext)
    return (
        <>
            <BlogHeader tittle={"Search Result"} />
            <div className="px-[180px] pb-[50px]">
                <Row gutter={[16, 24]}>
                    {dataSearchByKeyword.map((itemData) => (
                        <Col key={itemData._id} className="gutter-row" span={8}>
                            <BlogCard data={itemData} />
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}

export default ResultSearchBlog
import { Image, Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { END_POINT } from "../../../src/utils/constant";
import { AiOutlineCalendar } from "react-icons/ai";
import moment from 'moment';

function BlogCard({ data, width, height, widthImg, heightImg, display, alignItems, flexDirection }) {
  return (
    <>
      {data && (
        <div style={{display: display, alignItems: alignItems, flexDirection: flexDirection}}>
          <Link 
            to={`/chi-tiet-blog/${data._id}`} 
            style={{ width: widthImg, height: heightImg }}
            >
            <Card
              hoverable
              style={{ width: width, height: height }}
              cover={
                <Image
                  style={{ height: heightImg, width: widthImg }}
                  src={`${data.picture}`}
                />
              }
            >
            </Card>
          </Link>
          <Card.Meta
            className="ml-2 px-3 block"
            title={<a className="font-bold Montserrat-Medium text-[#161D25] text-[20px]">{data.title}</a>}
            description={
              <>
                <div className="flex items-center">
                  <AiOutlineCalendar /> <span className="text-[16px]">{moment(data.date).format('L')}</span> 
                </div>
                <p className="truncate text-[#000] text-[18px]">{data.description}</p>
              </>
            }
          />
        </div>
      )}
    </>
  );
}

export default BlogCard;

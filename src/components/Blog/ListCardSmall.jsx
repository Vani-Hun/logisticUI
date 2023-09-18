import { END_POINT } from "../../../src/utils/constant";
import { Avatar, Card, Typography } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const ListCardSmall = ({ data }) => {
  return (
    <div style={{ marginTop: "0px", marginBottom: "10px" }}>
      <Card hoverable style={{ height: "143px", paddingTop: 0 }}>
        <Link style={{ color: "red" }} to={`/chi-tiet-Blog/${data._id}`}>
          <Meta
            ellipsis
            avatar={
              <Avatar
                style={{
                  margin: 0,
                  padding: 0,
                  height: "80px",
                  width: "80px",
                }}
                shape="square"
                size={{ md: 140, lg: 140, xl: 140, xll: 140 }}
                src={`${data.picture}`}
              />
            }
            title={<h1>{data.title}</h1>}
            description={
              <>
                <p>{data.description}</p>
              </>
            }
          />
        </Link>
      </Card>
    </div>
  );
};

export default ListCardSmall;

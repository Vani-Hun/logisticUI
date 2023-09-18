import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Images from "../../utils/images";
import { Carousel } from "antd";
import styled from "styled-components";

const CarouselWrapper = styled(Carousel)`
  > ul {
    margin-bottom: 30px;
  }
  > .slick-dots li button {
    width: 11px;
    height: 11px;
    border-radius: 100%;
  }
  > .slick-dots li.slick-active button {
    width: 11px;
    height: 11px;
    border-radius: 100%;
    background: #fc8080;
  }
`;
const RecruitmentBanner = ({infor} ) => {
  return (
    <CarouselWrapper effect="fade" dots="true" autoplay autoplaySpeed={3500}>
     {Object.keys(infor).length !== 0 && infor.bottomPicture.length >0 && infor.bottomPicture.map((bottom,index)=>{
      return  <div className="relative"
      key={index}>
      <img
        src={bottom?.background}
        className="w-full h-[380px] md:h-[500px] object-cover"
        alt="pic"
      />
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <div className="flex items-center justify-center flex-col  mt-[60px] md:mt-[100px] ">
          <img
            src={bottom.logo}
            alt="#"
            className="rounded-[50%]  w-[68px] h-[68px] preventselect"
          ></img>
          <div className="mx-8 sm:mx-[70px] md:mx-[130px] lg:mx-[320px] mt-[12px]">
            <div className="text-white font-semibold text-lg text-center sm:text-xl md:text-2xl preventselect">
              {bottom?.content}
            </div>
          </div>
          <h1 className="text-white font-bold text-lg mt-[14px] preventselect">
           {bottom?.name}
          </h1>
          <div className="text-white text-base sm:text-lg preventselect">
           {bottom?.position}
          </div>
        </div>
      </div>
    </div>
     })}
    </CarouselWrapper>
  );
};

export default RecruitmentBanner;

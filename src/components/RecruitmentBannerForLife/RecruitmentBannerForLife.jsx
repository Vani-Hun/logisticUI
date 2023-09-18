import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import backGroundImg from '../../assets/images/slider-tuyen-dung.png';
import { Carousel } from "antd";
import styled from "styled-components";


// const RecruitmentBannerForLife = () => {
//     return (
//         <div className="mb-[60px] relative">
//             <img src={backGroundImg} alt="IMG" className="w-full h-[360px] lg:h-auto" />
//             <div className="text-[#fff] tracking-wide text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%]">
//                 <span className="flex">
//                     <FontAwesomeIcon icon={faQuoteLeft} className="text-[#e5a663] text-[60px] hidden lg:block" />
//                     <h2 className="text-[14px] lg:text-3xl text-[#fff]">
//                         "8h01p không phải 8h" là một trong những phong cách làm việc làm cho tôi ấn tượng ngay ngày đầu
//                         tiên. Tính "kỷ luật" chính là yếu tố mang lại cho tôi một định nghĩa mới về sự "chuyên nghiệp".
//                     </h2>
//                     <FontAwesomeIcon
//                         icon={faQuoteRight}
//                         className="text-[#e5a663]  text-[60px] place-self-end hidden lg:block"
//                     />
//                 </span>
//                 <p className="text-[14px] lg:text-2xl pt-[20px]">Vũ Mạnh Thắng</p>
//                 <p className="text-[12px]">Nhân viên bộ phận quy hoạch</p>
//             </div>
//         </div>
//     );
// };
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

const RecruitmentBannerForLife = ({ data }) => {
    return (
        <div className="">
            <CarouselWrapper
                effect="fade"
                dots="true"
                autoplay
                autoplaySpeed={3500}
            >
                {data.bottomPicture && data.bottomPicture.map((bt, index) => {
                    return (
                        <div className=" relative">
                            <img src={bt?.background} alt="IMG" className="w-full h-[100%] object-cover lg:h-auto" />
                            <div className="text-[#fff] tracking-wide text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%]">
                            <div className='flex justify-center w-[100%] mb-2'>
                                <img
                                    src={bt?.logo}
                                    alt="avatar"
                                    className="rounded-[50%]  w-[68px] h-[68px] preventselect object-cover"
                                ></img>
                            </div>
                                <span className="flex">
                                    <FontAwesomeIcon icon={faQuoteLeft} className="text-[#e5a663] text-[60px] hidden lg:block" />
                                    <h2 className="text-[14px] lg:text-3xl text-[#fff]">
                                        {bt?.content}
                                    </h2>
                                    {/* <FontAwesomeIcon
                                        icon={faQuoteRight}
                                        className="text-[#e5a663]  text-[60px] place-self-end hidden lg:block"
                                    /> */}

                                </span>

                                <p className="text-[14px] lg:text-2xl pt-[20px]">{bt?.name}</p>
                                <p className="text-[12px]">{bt?.position}</p>
                            </div>
                        </div>
                    )
                })
                }

            </CarouselWrapper>
        </div>
    );
};

export default RecruitmentBannerForLife;

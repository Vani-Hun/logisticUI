import { RightOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { END_POINT } from "../../utils/constant";
import { useTranslation } from 'react-i18next';

const HotJob = ({ setDetail }) => {
    const api = `${END_POINT}/career/isHot`;
    const [hotJob, setJob] = useState([]);


    useEffect(() => {
        const getDataFromApi = async () => {
            try {
                const res = await axios({
                    url: api,
                    method: "get",
                    // headers: "Bears" + TOKEN,
                })
                let item = res.data.data.careers;
                setJob(item)

                console.log(res)

                // if (res.status === 200) {
                //     let item = res.data.data.message;
                //     console.log(item)
                //     if (item.length > 1) {
                //         let newItem = item.sort((a, b) => a.applicants.length - b.applicants.length);
                //         let items = []
                //         for (let i = newItem.length - 1; i >= newItem.length - 5; i--) {
                //             items.push(newItem[i]);
                //         }
                //         setJob(items);
                //         console.log("item",items)
                //     }
                //  /*    console.log("job",hotJob); */

                // }
            }
            catch (error) {
                console.log(error);
            }
        }
        getDataFromApi()
    }, [])
    const { t } = useTranslation('Recruitment')
    return (
        <div className="w-[100%]">
            <h2 className="text-[24px] sm:text-[32px] font-bold mb-[16px] sm:mb-[28px] truncate">
                {t('Việc làm nổi bật')}
            </h2>

            {hotJob.length > 0 && (
                <>
                    {hotJob.map((job, index) => {
                         if(index >=5){
                            return <></>
                          }
                        return (
                            <Link
                                key={index}
                                to={`${job?._id}`}
                            >
                                <div
                                    style={{ cursor: 'pointer' }}
                                    className="border-[1px] rounded-r-xl before:content-['']  p-[16px] mb-[16px] overflow-hidden bg-[#f2f2f2] lg:hover:scale-105 duration-300"
                                >
                                    <h4 className="text-[16px] sm:text-[18px] font-bold tracking-wider whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer">
                                        {job?.position}-{job?.title}
                                    </h4>
                                    <p className="text-[16px] opacity-70 cursor-pointer truncate">
                                        <FontAwesomeIcon icon={faLocationDot} className=" pr-[16px]" />
                                        {job?.addressDescription}
                                    </p>
                                    <div
                                        className="text-[14px] text-[#e5a663] tracking-wider flex items-center gap-2 font-bold"

                                    >

                                        <FontAwesomeIcon icon={faAngleRight} className="pr-[10px]" />
                                        {t(' Xem chi tiết')}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default HotJob;
// ô muốn link đến trang nào

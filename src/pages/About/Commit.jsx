import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";
import hinh1 from "../../assets/images/01.png"
import hinh2 from "../../assets/images/02.png"
import hinh3 from "../../assets/images/03.png"
import hinh4 from "../../assets/images/04.png"
import hinh5 from "../../assets/images/05.png"
import hinh6 from "../../assets/images/06.png"

const imageURIs = [
  hinh1, hinh2, hinh3, hinh4, hinh5, hinh6
  // Thêm các URI hình ảnh khác theo nhu cầu
];

function Commit() {
  const { setMetadata, fetchAboutUs } = useContext(MainContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Cam kết | TKTL",
      };
    });

    

    const fetchApi = async () => {
      try {
        const res = await axios.get(`${END_POINT}/commitment`);
        res.status === 200 && setData(res.data.data.commits[0]);
        console.log("🚀 ~ file: Commit.jsx:22 ~ fetchApi ~ res.data.data.commits:", res.data.data.commits[0])
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchApi();
    fetchAboutUs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMetadata]);

  return (
    <div className="container mx-auto mb-12">
      {data.banner && (
        <img
          src={data.banner}
          alt="banner"
          // className="w-full h-[200px] md:h-[300px] lg:h-[550px] object-cover"
          className="w-full mb-12 b"
        />
      )}
      <div class="flex camket-wrapper px-4 lg:px-0">
        <div className="flex flex-col lg:flex-row mx-4 lg:mx-0 gap-x-4 ">
          {data.detail && <div className="flex-1 container mx-auto">
            <img
              src="https://jtexpress.vn/themes/jtexpress/assets/images/dd-about-us.png"
              className="w-[76px] h-[63px] hidden lg:block "
              alt="logo"
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 gap-x-4 mt-4 mb-4 rounded-2xl">
              {data.detail?.map((commit, index) => (
                <div
                  key={commit._id}
                  className="pr-6 lg:min-h-[350px] rounded-xl relative" //bg-[#F0B90B] even:bg-opacity-40
                >
                  <img
                    src={`${commit.logo}`}
                    className="mb-7"
                    alt="logo"
                  />
                  {/* <img src={imageURIs[index]} className="absolute h-20 w-32 top-12 z-[-10]"/> */}
                  <h5 className="uppercase text-lg tracking-wider text-black font-bold my-3 font-sans">
                    {commit.name}
                  </h5>
                  <span className=" tracking-wide font-normal text-lg leading-6 text-left font-sans inline-block">{commit.description}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end w-full">
              <img
              src="https://jtexpress.vn/themes/jtexpress/assets/images/dd-about-us.png"
              className="w-[76px] h-[63px] hidden lg:block rotate-180"
              alt="logo"
              />
            </div>
          </div>}
          {data.image && (
          <div class="w-full lg:w-[240px]">
              <img className="w-full h-auto object-cover" src={data.image} alt='banner'/>
          </div>
          )}  
        </div>
      </div>
    </div>
  );
}

export default Commit;

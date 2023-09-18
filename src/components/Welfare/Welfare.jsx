import React from "react";
import { useTranslation } from "react-i18next";

const Welfare = ({ data }) => {
  const { t } = useTranslation('Life')
  console.log(data)
  return (
    <div className="m-auto max-w-[1140px]  px-[16px] lg:px-[0px]">
      <div className="gap-8 tracking-wide lg:grid lg:grid-cols-2 mb-[60px]">
        {data.info && data.info.map((infor, index) => {
          return <article>
            {/* <div className="flex">
              <img src={`${infor?.logo}`} style={{width:'20px',height:'auto'}} />

              <h3 className="text-xl text-[#e5a663] my-3  font-bold ">{infor?.name}</h3>
            </div> */}
            <div class="flex items-center mb-2">
              <img src={`${infor?.logo}`} alt="J&amp;T Express Việt Nam - Cuộc sống tại J&amp;T" />
              <span class="ml-2 Montserrat-Bold text-[#D60009] w-full text-[20px]">
                {infor?.name}
              </span>
            </div>
            <hr />
            <p className="mt-3">
              {infor?.content}
            </p>
          </article>
        })}

      </div>
    </div>
  );
};

export default Welfare;

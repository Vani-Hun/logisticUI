import { AiOutlineUp } from "react-icons/ai";
import { TiMessages } from "react-icons/ti";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function ScrollOnTop() {
  const onTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [onTop, setOnTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      // setTop();
      if (window.scrollY > 300) {
        setOnTop(true);
      } else setOnTop(false);
    });
  }, []);
  return (
    <div className={`${
      onTop ? "opacity-100" : "opacity-0"
    } w-[100px] h-[130px] flex fixed flex-col right-[24px] bottom-[2%] z-[100] items-center `}>
      <Link
        to='/custom-chat'
        target="_blank"
        onClick={onTopHandler}
        className={`w-[65px] h-[65px] bg-[#F0B90B] border-0 rounded-full flex justify-center items-center cursor-pointer mb-3 shadow-2xl`}
      >
        <TiMessages size={28} className="text-white"/>
      </Link>
      <div
        onClick={onTopHandler}
        className={`${
          onTop ? "opacity-100" : "opacity-0"
        }  w-[50px] h-[50px] bg-white border border-[#454F5B] rounded-[2px] flex justify-center items-center cursor-pointer`}
      >
        <AiOutlineUp />
      </div>
    </div>
  );
}

export default ScrollOnTop;

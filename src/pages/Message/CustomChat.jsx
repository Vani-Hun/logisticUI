import React, { useState, useEffect } from "react";
import { RxImage } from "react-icons/rx";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { BsFolder2, BsStar } from "react-icons/bs";
import { Input, Button } from "antd";
import axios from "axios";
import { END_POINT, SOCKET_URL } from "../../utils/constant";
import { Link } from "react-router-dom";
// import io from "socket.io-client";
// const socket = io(SOCKET_URL, {
//   secure: true,
//   transports: ["websocket"],
// });

const { TextArea } = Input;

const CustomerChat = ({socket}) => {
  const [dataBoxChat, setDataBoxChat] = useState({});
  const [messageInput, setMessageInput] = useState("");
  const [select, setSelect] = useState("recommend");
  const [messages, setMessages] = useState(JSON.parse(sessionStorage.getItem("messageCustom"))||[]);

  const d = new Date();
  let h = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();

  // get message from admin
  useEffect(() => {
    socket.on("customer receive", (message) => {
      console.log('tin nhắn từ admin', message);
      setMessages([...messages, { obj: "admin", message }]);
      sessionStorage.setItem("messageCustom", JSON.stringify([...messages, {obj: 'admin', message, time: `${h}:${min}:${sec}` }]));
    });
    scrollDown();

    return () => {
      // socket.disconnect();
    };
    }, [messages]);

  const handleSendMessage = (str = "") => {
    if (messageInput.trim() !== "") {
      socket.emit("customer send", messageInput);
      setMessages([...messages, { obj: "customer", message: messageInput }]);
      sessionStorage.setItem("messageCustom", JSON.stringify([...messages, {obj: 'customer', message: messageInput, time: `${h}:${min}:${sec}` }]));
      setMessageInput("");
    }
    if (str !== "") {
      socket.emit("customer send", str);
      setMessages([...messages, { obj: "customer", message: str }]);
      sessionStorage.setItem("messageCustom", JSON.stringify([...messages, {obj: 'customer', message: str, time: `${h}:${min}:${sec}` }]));
      setMessageInput("");
    }
  };

  window.addEventListener("beforeunload", function (e) {        
    socket.disconnect();
  });

  const scrollDown = () => {
    var element = document.getElementById("message");
    if (element) {
      element.scrollTop = element.scrollHeight + 200;
    }
  };
  useEffect(() => {
    // get info ui box chat
    const getInfo = async () => {
      const res = await axios.get(`${END_POINT}/chat-info`);
      console.log(res.data.data);
      setDataBoxChat(res.data.data);
    };
    getInfo();
  }, []);

  return (
    <div className="w-full h-[100vh] bg-[#646566] flex items-center justify-center text-[13px]">
      <div className=" w-[60%] min-w-[1000px] h-[95%] bg-white overflow-hidden mx-[400px]">
        <header className="w-full relative text-white">
          <img
            src="https://imc.jtexpress.vn/assets/pc_head-0a94c176.webp"
            alt="logo"
          />
          <div className="absolute z-10 top-0 left-0 right-0 bottom-0 flex ">
            <p className="px-[15px] text-[16px] mr-[18px] mt-[12px]">
              {dataBoxChat.title}
            </p>
            <p className="opacity-80 text-[12px] mt-[15px]">
              {dataBoxChat.subject}
            </p>
          </div>
        </header>
        <section className="flex flex-row">
          <div className="flex flex-col border-r-[1px] border-[#e6e6e6] basis-3/4">
            <div className="h-[40px] p-[15px] flex items-center shadow-[0_0px_6px_#00000026]">
              <div className="w-[6px] h-[6px] bg-[#52d5ac] mr-[10px] rounded-full"></div>
              {dataBoxChat.onlineServiceTime}
            </div>
            <div
              className="py-[15px] w-full h-[376px] overflow-auto"
              id="message"
            >
              <div className="w-full h-full">
                <div className="mt-[15px]">
                  <div className="overflow-x-hidden overflow-y-auto ">
                    <ul className="mx-[15px]">
                      <li className="mr-[20px] flex">
                        <img
                          className="mr-[10px] w-[46px] h-[46px]"
                          alt="avatar"
                          src="https://imc.jtexpress.vn/assets/aside_image-54c49c18.webp"
                        />
                        <div className="inline-flex flex-col items-start relative ">
                          <div className="flex text-[#888] w-full text-[12px] mb-[5px] ">
                            <div className="chatname mr-[10px] text-ellipsis "></div>
                            <div className="chattime"></div>
                          </div>
                          <div className="flex items-center ">
                            <div className="relative before:l-[-5px] before:border-t-[#f2f2f2] before:absolute before:t-0 before:b-0 before:l-0 before:r-0 before:border-solid before:border-[5px] before:border-[transparent] before:border-t-[10px] before:border-t-solid">
                              <div className="text-[#222] bg-[#f2f2f2] leading-6 font-[400] rounded-[5px] p-[10px] mx-[4px]">
                                <div>{dataBoxChat.greetingChat}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="mr-[20px] mt-2 flex">
                        <img
                          className="mr-[10px] w-[46px] h-[46px]"
                          alt="avatar"
                          src="https://imc.jtexpress.vn/assets/aside_image-54c49c18.webp"
                        />
                        <div className="inline-flex flex-col items-start relative">
                          <div className="flex text-[#888] w-full text-[12px] mb-[5px]">
                            <div className="chatname mr-[10px] text-ellipsis"></div>
                            <div className="chattime"></div>
                          </div>
                          <div className="flex items-center">
                            <div className="relative before:l-[-5px] before:border-t-[#f2f2f2] before:absolute before:t-0 before:border-solid before:border-[5px] before:border-[transparent] before:border-t-[10px] before:border-t-solid">
                              <div className="text-[#222] bg-[#f2f2f2] leading-6 font-[400] rounded-[5px] mx-[4px]">
                                <div className="w-[382px] flex h-[175px]">
                                  <section className="relative w-[76px] flex flex-col justify-evenly items-center">
                                    <img
                                      className="w-full h-full absolute z-10 l-0 r-0"
                                      alt="banner"
                                      src="https://imc.jtexpress.vn/assets/guess-607099df.webp"
                                    />
                                  </section>
                                  <section className=" w-[280px] h-full mx-[8px] flex flex-col pt-[10px]">
                                    <div className="relative">
                                      <div className="h-[36px] border-b-2 flex justify-around items-center">
                                        <div className="text-center">
                                          <button
                                            type="text"
                                            className={`w-[40px] py-1 text-center ${
                                              select !== "recommend" &&
                                              "opacity-70"
                                            }`}
                                            onClick={() => {
                                              setSelect("recommend");
                                            }}
                                          >
                                            Gợi ý
                                          </button>
                                          {select === "recommend" && (
                                            <div className="w-[40px] h-[3px] bg-[#f5c736]"></div>
                                          )}
                                        </div>
                                        <div>
                                          <button
                                            type="text"
                                            className={`w-[40px] py-1 text-center ${
                                              select !== "hot" && "opacity-70"
                                            }`}
                                            onClick={() => {
                                              setSelect("hot");
                                            }}
                                          >
                                            HOT
                                          </button>
                                          {select === "hot" && (
                                            <div className="w-[40px] h-[3px] bg-[#f5c736]"></div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    {select === "recommend" ? (
                                      <div className="overflow-y-auto overflow-x-hidden">
                                        {dataBoxChat?.suggestChat?.map(
                                          (sug, index) => (
                                            <button
                                              key={index}
                                              className="w-[95%] hover:text-[#f5c736] mx-2 h-[36px] border-b-2"
                                              onClick={() => {
                                                handleSendMessage(sug);
                                              }}
                                            >
                                              <div className="flex w-full">
                                                <div className=" w-[90%] flex items-center truncate">
                                                  {sug}
                                                </div>
                                                <div className="flex items-center ml-4">
                                                  <AiOutlineDoubleRight />
                                                </div>
                                              </div>
                                            </button>
                                          )
                                        )}
                                      </div>
                                    ) : (
                                      <div className="overflow-y-auto overflow-x-hidden">
                                        {dataBoxChat?.hotChat?.map(
                                          (hot, index) => (
                                            <button
                                              key={index}
                                              className="w-[95%] hover:text-[#f5c736] mx-2 h-[36px] border-b-2"
                                              onClick={() => {
                                                handleSendMessage(hot);
                                              }}
                                            >
                                              <div className="flex w-full">
                                                <div className=" w-[90%] flex items-center truncate">
                                                  {hot}
                                                </div>
                                                <div className="flex items-center ml-4">
                                                  <AiOutlineDoubleRight />
                                                </div>
                                              </div>
                                            </button>
                                          )
                                        )}
                                      </div>
                                    )}
                                  </section>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <ul>
                      {messages?.map((message, index) =>
                        message.obj === "customer" ? (
                          <li
                            key={index}
                            className="mr-[20px] mt-2 flex flex-row-reverse"
                          >
                            <div className="flex flex-col items-end relative">
                              <div className="flex justify-end text-[#888] w-full text-[11px] mb-[1px]">
                                <div className="chatname mr-[10px] text-ellipsis"></div>
                                <div className="chattime">{h+":"+min+":"+sec}</div>
                              </div>
                              <div className="flex flex-wrap flex-row-reverse items-center">
                                <div className="flex flex-row-reverse relative before:t-0 before:border-t-[#f9e939] before:absolute before:border-solid before:border-[5px] before:border-[transparent] before:border-t-[10px] before:border-t-solid">
                                  <div className="text-[#222] max-w-[500px] bg-[#f9e939] break-words leading-6 font-[400] rounded-[5px] p-[10px] mx-[4px]">
                                    <div className="break-words">
                                      {message.message}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ) : (
                          <li key={index} className="mr-[20px] flex">
                            <img
                              className="mr-[10px] w-[46px] h-[46px]"
                              alt="avatar"
                              src="https://imc.jtexpress.vn/assets/aside_image-54c49c18.webp"
                            />
                            <div className="inline-flex flex-col items-start relative">
                              <div className="flex text-[#888] w-full text-[12px] mb-[5px]">
                                <div className="chatname mr-[10px] text-ellipsis">
                                  Thông tin hệ thống
                                </div>
                                <div className="chattime">{h+":"+min+":"+sec}</div>
                              </div>
                              <div className="flex items-center">
                                <div className="relative before:l-[-5px] before:border-t-[#f2f2f2] before:absolute before:t-0 before:b-0 before:l-0 before:r-0 before:border-solid before:border-[5px] before:border-[transparent] before:border-t-[10px] before:border-t-solid">
                                  <div className="text-[#222] bg-[#f2f2f2] leading-6 font-[400] rounded-[5px] p-[10px] mx-[4px]">
                                    <div className="">{message.message}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[175px] border-t-[1px] ">
              <div>
                <ul className="flex items-center mx-[10px] mt-[10px]">
                  <li className="pointer-cursor list-none ml-2">
                    <RxImage size={24} color="#999" />
                  </li>
                  <li className="pointer-cursor list-none ml-3">
                    <BsFolder2 size={26} color="#999" />
                  </li>
                  <li className="pointer-cursor list-none ml-3">
                    <BsStar size={24} color="#999" />
                  </li>
                </ul>
              </div>
              <div className="m-5">
                <TextArea
                  className="text-[12px]"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  autoSize={{
                    minRows: 2,
                    maxRows: 2,
                  }}
                  showCount
                  maxLength={1000}
                />
              </div>
              <div className="flex items-center justify-end pb-[20px] px-[15px]">
                <Button
                  onClick={() => handleSendMessage()}
                  className=" text-[13px] w-[100px] mr-3 text-[#F0B90B] border-[#F0B90B] rounded-[5px]"
                >
                  Kết thúc
                </Button>
                <Button
                  onClick={() => handleSendMessage()}
                  className="bg-[#F0B90B] text-[13px] w-[100px] border-0 rounded-[5px]"
                >
                  Gửi
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col basis-1/4">
            <img
              className="max-w-full"
              alt="logoRight"
              src="https://imc.jtexpress.vn/assets/aside_image-54c49c18.webp"
            />
            <div className="flex flex-col">
              <div className="relative min-w-full items-center">
                <div className="h-[26px] w-full text-center">
                  Xử lý nhanh chóng
                </div>
                <div className="w-[40px] h-[3px] bg-[#f5c736] mx-auto mb-8"></div>
              </div>
              <div className="pb-[15px] relative grab-cursor select-none w-full">
                <div className="flex-wrap flex items-center justify-center relative">
                  {dataBoxChat?.rightStrength?.map((item, index) => (
                    <div key={index} className="basis-1/2 h-[145px] flex flex-col items-center justify-center text-center">
                      <Link
                        to={item.link}
                        target="_blank"
                        className="w-[70px] h-[70px] text-[#3c3c3c] flex flex-col items-center justify-center"
                      >
                        <img
                          className="w-[50px] h-[50px]"
                          alt="icon"
                          src={item.logo}
                        />
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerChat;

import React, { useState, useEffect, useContext, useCallback } from "react";
import { RxImage } from "react-icons/rx";
import { BsFolder2, BsStar } from "react-icons/bs";
import { Input, Button, message } from "antd";
import axios from "axios";
import { MainContext } from '../../context/MainContext';
import { END_POINT} from "../../utils/constant";
// import io from "socket.io-client";
// import { SOCKET_URL } from "../../utils/constant";
// const socket = io(SOCKET_URL, {
//   secure: true,
//   transports: ["websocket"],
// });

const { TextArea } = Input;

const AdminChat = ({socket}) => {
  const [dataBoxChat, setDataBoxChat] = useState({});
  const [messageInput, setMessageInput] = useState("");
  const [select, setSelect] = useState("recommend");
  const [messages, setMessages] = useState([]);
  const [listUser, setListUser] = useState([]);
  const {accessToken} = useContext(MainContext)

  const scrollDown = () => {
    var element = document.getElementById("message");
    if (element) {
      element.scrollTop = element.scrollHeight + 200;
    }
  };

  // socket.on("admin notification", (customerId)=>{
  //   console.log(customerId);
  // })
  
  const d = new Date();
  let h = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();

  useEffect(() => {
    const getInfo = async () => {
      const res = await axios({
        url:`${END_POINT}/admin/chat-info`,
        method:"get",
        headers: { 'x-access-token': `${accessToken}` },
      })
      console.log(res.data.data);
      setDataBoxChat(res.data.data);
    };
    getInfo();
  }, []);


  const checkListUser = useCallback((item) =>{
    let count = 0;
    console.log(messages);
    messages.map((user, index)=>{
      if(item.customer === user.idCustomer) {
        const temp = messages;
        temp[index].detail = [...temp[index].detail, {obj: 'customer', message: item.message}]
        console.log(temp)
        setMessages(temp);
        count++;
      }
    })
    count===0 && setMessages([...messages, {idCustomer: item.customer, detail: [{obj: 'customer', message: item.message}] }]);
  },[socket])
  
  // get message from admin
  useEffect(() => {
    socket.on("admin receive", (item) => {
      console.log(item);
      console.log(messages);
      checkListUser(item);
      scrollDown();
    });

    return () => {
      // socket.disconnect();
    };
  },[socket]);

  const handleSendMessage = (str = "") => {
    if (messageInput.trim() !== "") {
      socket.emit("admin send", {messageInput});
      setMessages([...messages, { obj: "admin", message: messageInput }]);
      setMessageInput("");
    }
    if (str !== "") {
      socket.emit("admin send", str);
      setMessages([...messages, { obj: "admin", message: str }]);
      setMessageInput("");
    }
  };
  console.log(messages);

  return (
    // <div className="w-full h-[100vh] bg-[#646566] flex items-center justify-center ">
      <div className=" w-full h-full bg-white overflow-hidden text-[14px] ">
        <section className="flex flex-row">
          <div className="flex flex-col border-r-[1px] border-[#e6e6e6] basis-3/4">
            <div className="h-[40px] p-[15px] flex items-center shadow-[0_0px_6px_#00000026]">
              <div className="w-[6px] h-[6px] bg-[#52d5ac] mr-[10px] rounded-full"></div>
              {dataBoxChat.online_service_time}
            </div>
            <div
              className="py-[15px] w-full h-[420px] overflow-auto"
              id="message"
            >
              <div className="w-full h-full">
                <div className="mt-[15px]">
                  <div className="overflow-x-hidden overflow-y-auto ">
                    <ul>
                      {messages?.map((item) =>
                        item.idCustomer === select && item.detail.map((message, index) =>
                        message.obj === "admin" ? (
                          <li
                            key={index}
                            className="mr-[20px] mt-2 flex flex-row-reverse"
                          >
                            <div className="flex flex-col items-end relative">
                              <div className="flex justify-end text-[#888] w-full text-[11px] mb-[1px]">
                                <div className="chatname mr-[10px] text-ellipsis">
                                </div>
                                <div className="text-[11px] chattime">{h+":"+min+":"+sec}</div>
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
                              <div className="flex text-[#888] w-full text-[11px] mb-[5px]">
                                <div className="chatname mr-[10px] text-ellipsis">
                                  {item.idCustomer}
                                </div>
                                <div className="text-[11px] chattime">{h+":"+min+":"+sec}</div>
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
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[165px] border-t-[1px] ">
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
                  className="text-[14px]"
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
                  className="w-[100px] mr-3 text-[#F0B90B] border-[#F0B90B] rounded-[5px]"
                >
                  Kết thúc
                </Button>
                <Button
                  onClick={() => handleSendMessage()}
                  className="bg-[#F0B90B] w-[100px] border-0 rounded-[5px]"
                >
                  Gửi
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col basis-1/4 mt-2">
              {
                messages.map((user)=>(
                  <button onClick={()=>{setSelect(user.idCustomer)}} className="flex flex-row border-[1px] p-2" key={user.idCustomer}>{user.idCustomer}</button>
                ))
              }
          </div>
        </section>
      </div>
    // </div>
  );
};

export default AdminChat;

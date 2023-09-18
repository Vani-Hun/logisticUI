import { MainContext } from "../../context/MainContext";
import { UploadOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { TOKEN } from "./adminToken";
import { useEffect } from "react";
import { useRef } from "react";
import { END_POINT } from "../../utils/constant";
import { Input, Table } from "antd";
import { AiFillEdit, AiOutlineDelete, AiOutlineFileImage, AiOutlineMore } from "react-icons/ai";
import AddBannerLogo from "../../components/Admin/Service/AddBannerLogo";
import AddQuote from "../../components/Admin/Service/AddQuote";
import ConfirmModal from "../../components/ConfirmModal";
import Editquote from "../../components/Admin/Service/EditQuote";



export default function AdminQuote() {

  const { accessToken } = useContext(MainContext);

  const [quotes, setQuotes] = useState([]);
  const [showAddQuote, setShowAddQuote] = useState(false)
  const [showEditQuote,setShowEditQuote] = useState(false)


  const [dataForEdit, setDataForEdit] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [nameCompare, setNameCompare] = useState("");
  const [IdCompare, setValueCompare] = useState();

  useEffect(() => {
    const getService = async () => {
      const res = await axios.get(`${END_POINT}/quote`);
      // console.log(res);
      const { data } = res.data;
      // console.log(data);
      setQuotes(data);
    };
    getService()
  }, []);

  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    let data = []
    {
      quotes.map((quote, index) => {
        data.push({
          key: index,
          Avatar: `${quote.avatar}`,
          name: quote.name,
          quote: quote.quote,
          description: quote.description,
        })
      })
    }
    setDataSource(data)
  }, [quotes])
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'Avatar',
      key: 'Avatar',
      render: (e) => {
        return <img
          src={`${e}`}
          className="h-10 w-10"
        ></img>
      }
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'quote',
      dataIndex: 'quote',
      key: 'quote',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'feature',
      dataIndex: 'feature',
      key: 'feature',
    }, {
      title: "",
      width: 160,
      dataIndex: "action",
      render: (a, record) => {
        return <div className=" gap-y-1 gap-x-4 justify-around">

          <button
            className="flex items-baseline gap-x-1 hover:text-blue-600"
            onClick={()=>handleClickEdit(record)}
          >
            <AiFillEdit className="translate-y-[1px]" />D
            Sửa
          </button>
          {/* <button
            className="flex items-baseline gap-x-1 hover:text-blue-600"
          >
            <AiOutlineFileImage className="translate-y-[1px]" />
            Avatar
          </button> */}
          <button
            className="flex items-baseline gap-x-1 hover:text-red-600"
            onClick={() => {
              setIsDeleteVisible(true);
              setValueCompare(record.key);
              setNameCompare(record.name);
            }}
          >
            <AiOutlineDelete className="translate-y-[1px]" />
            Xóa
          </button>
        </div>
      },
    }
  ];
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${END_POINT}/quote`);
      const { data } = res.data;
      console.log(data);
      setQuotes(data);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  const acceptDelete = async () => {
    setLoading(true);
    setIsDisable(true);
    try {
      await axios.delete(`${END_POINT}/admin/quote/${quotes[IdCompare]._id}`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      setLoading(false);
      fetchData();
      setIsDisable(false);
      setIsDeleteVisible(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickEdit = (record) => {
    setShowEditQuote(true);
    // const [dataEdit] = data.filter((ele) => ele.name === record.name);
    setDataForEdit(quotes[record.key]);
  };
  console.log(dataForEdit)
  return (
    <>
      <div className="flex justify-between mb-4">
        <span className="text-3xl font-bold uppercase">Trích dẫn</span>
        {/* <Input.Search
          className="w-1/3 lg:w-[400px]"
          placeholder="Nhập từ khóa"
        // onSearch={searchByKeyword}
        /> */}
        <button
          className="px-5 py-2 border border-neutral-800 text-center hover:bg-slate-300"
          onClick={() => setShowAddQuote(true)}
        >
          + Thêm mới
        </button>
      </div>
      <Table dataSource={dataSource} columns={columns}
        rowKey={(record) => record._id}
      />;
      {showAddQuote &&
        <AddQuote
          onClose={() => setShowAddQuote(false)}
          refetchData={() => fetchData()}

        />
      }
      {showEditQuote &&
      <Editquote
        data={dataForEdit}
        onClose={()=>{setShowEditQuote(false)}}
        refetchData={() => fetchData()}

      />}
      <ConfirmModal //Modal delete department
        isVisible={isDeleteVisible}
        text={`xóa trich dẫn `}
        onClose={() => setIsDeleteVisible(false)}
        loading={loading}
        disable={isDisable}
        onOk={acceptDelete}
      />
    </>
  );
}

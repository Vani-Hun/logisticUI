import { Input, Table } from "antd";
import axios from "axios";
import React, { useState, useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AdminNewObject from "../../components/Admin/Object/AdminNewObject";
import AdminEditObject from "../../components/Admin/Object/AdminEditObject";
import ConfirmModal from "../../components/ConfirmModal";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { END_POINT } from "../../utils/constant";
import EditStrength from "../../components/Admin/Strength/EditStrength";
import AddnewStrength from "../../components/Admin/Strength/AddnewStrength";
import EditContentStrength from "../../components/Admin/Strength/EditContentStrength";
export default function AdminStrength() {
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const [IdCompare, setValueCompare] = useState("");
    const [nameCompare, setNameCompare] = useState("");
    const [dataForEdit, setDataForEdit] = useState({});
    const { accessToken } = useContext(MainContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 1000,
        total: 15,
    });
    const [params, setParams] = useState({
        ...pagination,
        page: pagination.current - 1,
        keyword: null,
        sortBy: null,
    });
    const [isEditVisibleContent,setIsEditVisibleContent] = useState(false)
    const [dataForEditContent, setDataForEditContent] = useState({});

    const fetchData = async () => {
        try {
            const res = await axios.get(`${END_POINT}/strength`);
            //   setData(response.data);
            setData(res.data.data.strength)
            setLoading(false);
            setPagination({
                total: params?.total,
                pageSize: params?.pageSize,
                current: params?.page + 1,
            });
        } catch (error) {
            console.error(error.message);
        }
    };
    useEffect(() => {
        fetchData(params);
    }, [params]);

    const handleClickEdit = (record) => {
        setIsEditVisible(true);
        setDataForEdit(record);
    };
    const handleClickEditContent = (record) => {
        setIsEditVisibleContent(true);
        setDataForEditContent(record);
    };
    const searchByKeyword = (value) => {
        setParams({
            ...params,
            page: 0,
            keyword: value,
        });
    };

    const handleTableChange = (newPagination, filters, sorter) => {
        const sort = sorter.order === "descend" ? `-${sorter.field}` : sorter.field;
        setParams({
            ...params,
            sortBy: sort,
            ...newPagination,
            page: newPagination.current - 1,
        });
    };

    const acceptDelete = async () => {
        setLoading(true);
        setIsDisable(true);
        try {
            const res = await axios.delete(
                `${END_POINT}/admin/strength/${IdCompare}`,
                {
                    headers: { 'x-access-token': `${accessToken}` },
                }
            );
            if (res.status === 200) {
                alert("đã xóa thành công ");
            }
            setLoading(false);
            fetchData({ ...pagination, page: pagination.current - 1 });
            setIsDisable(false);
            setIsDeleteVisible(false);
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            title: "Logo",
            dataIndex: "logo",
            key: "logo",
            width: "10%",
            render: (e) => (
                <img
                    src={`${e}`}
                    className="h-10 w-10"
                    alt=""
                ></img>
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "15%",
            sorter: (a, b) => a.name.length - b.name.length,
        },
       
        {
            title: "detail",
            dataIndex: "detail",
            key: "detail",
        },{
            title: "sub name",
            dataIndex: "sub_name",
            key: "sub_name",
        },{
            title: "description",
            dataIndex: "description",
            key: "description",
        },{
            title: "link",
            dataIndex: "link",
            key: "link",
        },
        {
            title: "Thao Tac",
            dataIndex: "_id",
            width: "20%",
            render: (a, record) => (
                <div className="flex flex-row justify-around gap-y-1 gap-x-3">
                    <button
                        className="flex items-baseline gap-x-1 hover:text-blue-600 "
                        onClick={() => {
                            handleClickEdit(record);
                        }}
                    >
                        <AiFillEdit className="translate-y-[1px]" />
                        Sửa logo
                    </button>
                    <button
                        className="flex items-baseline gap-x-1 hover:text-blue-600 "
                        onClick={() => {
                            handleClickEditContent(record);
                        }}
                    >
                        <AiFillEdit className="translate-y-[1px]" />
                        Sửa contents
                    </button>
                    <button
                        className="flex items-baseline gap-x-1 hover:text-red-600"
                        onClick={() => {
                            console.log(record)
                            setIsDeleteVisible(true);
                            setValueCompare(record._id);
                            setNameCompare(record.name);
                        }}
                    >
                        <AiOutlineDelete className="translate-y-[1px]" />
                        Xóa
                    </button>
                </div>
            ),
        },
    ];
    console.log(data)
    return (
        <>
            <div className="flex   justify-between mb-4 ">
                <span className="text-2xl font-blod py-4 px-2 uppercase ">Đối tượng</span>
                {/* <Input.Search
          onSearch={searchByKeyword}
          className="w-1/3 lg:w-[400px]"
          placeholder="Tìm dựa trên tên khách hàng"
          allowClear='true'
        /> */}

                <div className="relative">
                    <button
                        className=" justify-around flex items-center absolute right-10 w-32 border rounded-lg p-2 shadow-xl hover:bg-yellow-100"
                        onClick={() => setIsAddVisible(true)}
                    >
                        <AiOutlinePlus className="" />
                        Thêm mới
                    </button>
                </div>
            </div>
            <Table
                rowKey={(record) => record._id}
                columns={columns}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
            {isAddVisible && (
        <AddnewStrength
          onClose={() => setIsAddVisible(false)}
          refetchData={() => fetchData(params)}
        />
      )}
      {isEditVisible && (
        <EditStrength
          onClose={() => setIsEditVisible(false)}
          dataEdit={dataForEdit}
          refetchData={() => fetchData(params)}
        />
      )}
      {isEditVisibleContent && (
        <EditContentStrength
          onClose={() => setIsEditVisibleContent(false)}
          dataEdit={dataForEditContent}
          refetchData={() => fetchData(params)}
        />
      )}

      <ConfirmModal //Modal delete department
        isVisible={isDeleteVisible}
        text={`xóa đối tượng ${nameCompare}`}
        onClose={() => setIsDeleteVisible(false)}
        loading={loading}
        disable={isDisable}
        onOk={acceptDelete}
      /> 
        </>
    );
}

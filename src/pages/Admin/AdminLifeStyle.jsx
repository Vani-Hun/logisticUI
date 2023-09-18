import { Table, Input } from "antd";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { END_POINT } from "../../utils/constant";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AddDepartment from "../../components/Admin/Department/AddDepartment";
import EditDepartment from "../../components/Admin/Department/EditDepartment";
import ConfirmModal from "../../components/ConfirmModal";
import { MainContext } from "../../context/MainContext";
import AddImageLife from "../../components/Admin/LifeStyle/AddImageLife";
import EditImagelife from "../../components/Admin/LifeStyle/EditImagelife";
import AdminLifeContent from "../../components/Admin/LifeStyle/AdminLifeContent";

function AdminLifeStyle() {
    const columns = [
        {
            title: "Logo",
            dataIndex: "imageAboutUs",
            render: (e) => {
                return <img
                  src={`${e}`}
                  className="h-10 w-10"
                ></img>
              }
        },
        // {
        //   title: "Trưởng ban",
        //   dataIndex: "director",
        //   sorter: true
        // },
        // {
        //     title: 'Vị trí',
        //     dataIndex: 'location',
        // },
        {
            title: "List ảnh",
            dataIndex: "containerImage",
            width:'40%',
            render: (e) => {
                return <div className="grid grid-cols-3 gap-4">
                    {e.map((e,index)=>{
                    return <img
                    src={`${e}`}
                    key={index}
                    className="h-10 w-10"
                  ></img>
                    
                })
              }
                </div>}
        },
      
        {
            title: "",
            width: 160,
            dataIndex: "action",
            render: (a, record) => (
                <div className="flex flex-row gap-y-1 gap-x-3 justify-around">
                    <button
                        className="flex items-baseline gap-x-1 hover:text-blue-600"
                        onClick={() => handleClickEdit(record)}
                    >
                        <AiFillEdit className="translate-y-[1px]" />
                        Sửa
                    </button>
                    <button
                        className="flex items-baseline gap-x-1 hover:text-red-600"
                        onClick={() => {
                            console.log(record)
                            setIsDeleteVisible(true);
                            setValueCompare(record._id);
                            // setNameCompare(record.name);
                        }}
                    >
                        <AiOutlineDelete className="translate-y-[1px]" />
                        Xóa
                    </button>
                </div>
            ),
        },
    ];
    const { accessToken } = useContext(MainContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 6,
        total: 15,
    });
    const [params, setParams] = useState({
        ...pagination,
        page: pagination.current - 1,
        keyword: null,
        sortBy: null,
    });
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const [IdCompare, setValueCompare] = useState("");
    const [nameCompare, setNameCompare] = useState("");
    const [dataForEdit, setDataForEdit] = useState({});

    const [lifeStyles, setlifeStyles] = useState([])
    const getlifeStyles = async () => {
        const res = await axios.get(`${END_POINT}/admin/life-style`, {
            headers: { 'x-access-token': `${accessToken}` },
            // headers: { 'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM3NWE5MmQ4YTAzMWQ4OTVhOGNiMmUiLCJyb2xlIjoiYWRtaW4iLCJyb2xlSWQiOiI2NGM3NWE5MWQ4YTAzMWQ4OTVhOGNiMmMiLCJpYXQiOjE2OTM4MTc0MTEsImV4cCI6MTY5MzgzMTgxMX0.HgHs6xmAvTCq1Nb8YdWrOmyYNPy4hBXRt7-P7vZpJ04` },
        });
        console.log(res)
        setlifeStyles(res.data.data);
    };
    useEffect(() => {
        getlifeStyles();
    }, []);
    //   console.log(careerOfdepartment)
    const fetchData = async (params = {}) => {
        setLoading(true);
        try {
            // const { data: response } = await axios.get(`${END_POINT}/department`, {
            //     params: params,
            // });
            // setData(response.data.department);
            const res = await axios.get(`${END_POINT}/admin/life-style`, {
                headers: { 'x-access-token': `${accessToken}` },
                // headers: { 'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM3NWE5MmQ4YTAzMWQ4OTVhOGNiMmUiLCJyb2xlIjoiYWRtaW4iLCJyb2xlSWQiOiI2NGM3NWE5MWQ4YTAzMWQ4OTVhOGNiMmMiLCJpYXQiOjE2OTM4MTc0MTEsImV4cCI6MTY5MzgzMTgxMX0.HgHs6xmAvTCq1Nb8YdWrOmyYNPy4hBXRt7-P7vZpJ04` },
            });
            console.log(res)
            setlifeStyles(res.data.data);
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
    const acceptDelete = async () => {
        setLoading(true);
        setIsDisable(true);
        try {
            await axios.delete(`${END_POINT}/admin/life-style/${IdCompare}`, {
                headers: { 'x-access-token': `${accessToken}` },
                // headers: { 'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM3NWE5MmQ4YTAzMWQ4OTVhOGNiMmUiLCJyb2xlIjoiYWRtaW4iLCJyb2xlSWQiOiI2NGM3NWE5MWQ4YTAzMWQ4OTVhOGNiMmMiLCJpYXQiOjE2OTM4MTc0MTEsImV4cCI6MTY5MzgzMTgxMX0.HgHs6xmAvTCq1Nb8YdWrOmyYNPy4hBXRt7-P7vZpJ04` },

            });
            setLoading(false);
            fetchData({ ...pagination, page: pagination.current - 1 });
            setIsDisable(false);
            setIsDeleteVisible(false);
        } catch (error) {
            console.log(error);
        }
    };
    const handleClickEdit = (record) => {
        // console.log(record)
        setIsEditVisible(true);
        const [dataEdit] = data.filter((ele) => ele.name === record.name);
        setDataForEdit(record);
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
    return (
        <div>
            <div className="flex justify-between mb-4">
                <span className="text-3xl font-bold uppercase">Life Style</span>
                {/* <Input.Search
                    className="w-1/3 lg:w-[400px]"
                    placeholder="Nhập từ khóa"
                    onSearch={searchByKeyword}
                /> */}
                <button
                    className="px-5 py-2 border border-neutral-800 text-center hover:bg-slate-300"
                    onClick={() => setIsAddVisible(true)}
                >
                    + Thêm mới
                </button>
            </div>
            <Table
                rowKey={(record) => record._id}
                columns={columns}
                dataSource={lifeStyles}
                // pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
            {isAddVisible && (
                <AddImageLife
                    onClose={() => setIsAddVisible(false)}
                    refetchData={() => fetchData(params)}
                />
            )}
            {isEditVisible && (
                <EditImagelife
                    onClose={() => setIsEditVisible(false)}
                    dataEdit={dataForEdit}
                    refetchData={() => fetchData(params)}
                />
            )}
            <ConfirmModal //Modal delete department
                isVisible={isDeleteVisible}
                text={`bạn thực sự muốn xóa`}
                onClose={() => setIsDeleteVisible(false)}
                loading={loading}
                disable={isDisable}
                onOk={acceptDelete}
            />
            <AdminLifeContent/>

        </div>
    );
}

export default AdminLifeStyle;

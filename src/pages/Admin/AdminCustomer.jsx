import React, { useState, useRef, useContext, useEffect } from 'react'
import { Button, Input, Table, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai'
import EditCustomer from '../../components/Admin/Customer/EditCustomer';
import ConfirmModal from '../../components/ConfirmModal';
import { END_POINT } from '../../utils/constant';
import axios from 'axios';
import { MainContext } from '../../context/MainContext';

export default function AdminCustomer() {
  const [id, setId] = useState('')
  const [dataEdit, setDataEdit] = useState('')
  const [openEdit, setOpenEdit] = useState(false)
  const [openDel, setOpenDel] = useState(false)
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false)
  const { accessToken } = useContext(MainContext)

  const [data, setData] = useState([])

  // ____
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);


  const getDataFromApi = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${END_POINT}/admin/customer/list/customers`,
        headers: { 'x-access-token': `${accessToken}` },
      })
      setData(res.data.data.detail)
    }
    catch (e) {
      console.log(e);
    }
  }

  const editData = async (data, id) => {
    try {
      await axios({
        method: "put",
        url: `${END_POINT}/admin/customer/${id}`,
        headers: { 'x-access-token': `${accessToken}` },
        data: data,
      })
      // setData(res.data.data)
    }
    catch (e) {
      console.log(e);
    }
  }

  const deltDataFromApi = async () => {
    try {
      await axios({
        method: "delete",
        url: `${END_POINT}/admin/customer/${id}`,
        headers: { 'x-access-token': `${accessToken}` },
      })
      // setData(res.data.data)
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getDataFromApi();
  }, [])

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handledit = (e, selected) => {
    setDataEdit(selected);
    setId(selected.id)
    setOpenEdit(true);
  }

  const handleDel = (e, selected) => {
    console.log(selected);
    setOpenDel(true)
    setId(selected.id)
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });




  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
      width: "13%",
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
      ...getColumnSearchProps('name'),
    },
    {
      title: "Cấp",
      dataIndex: "level",
      key: "level",
      width: "13%",
      render: e => (
        <>
          {e && (
            <div>{e}</div>
          )}
        </>
      )
    },
    {
      title: "Điểm",
      dataIndex: "point",
      key: "point",
      width: "13%",
      render: e => (
        <>
          {e && (
            <div>{e}</div>
          )}
        </>
      )
    },
    {
      title: "Loại Khách Hàng",
      dataIndex: "customer_type",
      key: "customer_type",
      width: "13%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: "14%",

    },

    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "12%",

    },

    {
      title: "Mã code công ty",
      dataIndex: "companyTaxcode_business",
      key: "companyTaxcode_business",
      width: "12%",
      render: e => (
        <>{e && (
          <div>{e}</div>
        )}</>
      )
    },

    {
      title: "Ngày đăng ký",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "13%",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '',
      dataIndex: "action",
      // width: "14%",
      render: (e, data) => (
        <>

          <div className="flex flex-row justify-around">
            <button className="flex flex-row " role="button" onClick={(e) => handledit(e, data)}>
              <AiFillEdit style={{
                marginTop: "0.2rem",
                marginRight: "0.5rem"
              }} />
              Sửa
            </button>
            <button className="flex flex-row " role="button" onClick={(e) => handleDel(e, data)}>
              <AiOutlineDelete style={{
                marginTop: "0.2rem",
                marginRight: "0.5rem"
              }} />
              Xóa
            </button>
          </div>

        </>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const searchDataFromApi = async (key) => {
    const res = await axios({
      url: `${END_POINT}/admin/customer`,
      params: {
        keyword: key,
        sort: 1,
        id: '',
        filter:'',
      },
      headers: { 'x-access-token': `${accessToken}` },
      method: "get"
    })
    setData(res.data.data)
  }

  const { Search } = Input;

  const onSearch = (value) => {
    if (value === "" || value === undefined) {
      getDataFromApi();
    }
    else {
      searchDataFromApi(value)
    }
    console.log(data);

  };


  const acceptEditNewCustomer = async (e) => {
    setLoading(true)
    setIsDisable(true)
    const tableData = e.target.parentElement.parentElement.parentElement.querySelectorAll('input');
    const selectData = e.target.parentElement.parentElement.parentElement.querySelectorAll('select');
    console.log(tableData, selectData)
    const newData = {
      name: tableData[0].value,
      description: tableData[1].value,
      address: tableData[2].value,
      companyTaxcode_business: tableData[3].value,
      customer_type: selectData[0].value,
      rank_passers: {
        level: selectData[1].value,
        point: tableData[4].value,
      },
    }
    console.log(id);
    editData(newData, id);

    try {
      await setTimeout(() => {
        setLoading(false)
        setOpenEdit(false)
        setIsDisable(false)
        getDataFromApi();

      }, 2000)
    }
    catch {

    }
  }

  const acceptDelete = async () => {
    setLoading(true)
    setIsDisable(true)
    deltDataFromApi(id)
    try {
      await setTimeout(() => {
        setLoading(false)
        setOpenDel(false)
        setIsDisable(false)
        getDataFromApi();
      }, 2000)
    }
    catch {

    }
  }

  return (
    <div>
      <Search
        placeholder="Search"
        onSearch={onSearch}
        style={{
          width: 400,
          margin: "auto",
          display: "block",
          marginBottom: "20px"
        }}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
      >
      </Table>


      <EditCustomer
        isVisible={openEdit}
        onOk={acceptEditNewCustomer}
        loading={loading}
        disable={isDisable}
        dataEdit={dataEdit}
        onClose={() => setOpenEdit(false)}
      />

      <ConfirmModal
        isVisible={openDel}
        text={`xóa khách hàng`}
        onClose={() => setOpenDel(false)}
        loading={loading}
        disable={isDisable}
        onOk={(e) => acceptDelete(e)}
      />
    </div>
  )
}
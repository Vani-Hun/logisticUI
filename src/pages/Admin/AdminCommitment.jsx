import { Button, Descriptions,Form } from 'antd';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import { END_POINT } from '../../utils/constant';
import AddSubCommitToCommit from '../../components/Admin/Commit/AddSubCommitToCommit';

export default function AdminCommitment() {

  const form = useRef();
  const [checkLogo, setCheckLogo] = useState(false)
  const [checkBanner, setCheckBanners] = useState(false)
  const [fileListLogo, setLogo] = useState('')
  const [fileListBanner, setBanner] = useState('')
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idSub, setIdSub] = useState("");
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

  const fetchData = async () => {
    try {
       const { data: response } = await axios.get(`${END_POINT}/commitment`, {
        params: params,
      },
        {
          headers: { 'x-access-token': `${accessToken}` },
      });
      setData(response.data.commits[0]);
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
    fetchData();
  }, [isAddVisible, isDeleteVisible]);


  const searchByKeyword = (value) => {
    setParams({
      ...params,
      page: 0,
      keyword: value,
    });
  };

  const handleTableChange = (newPagination, filters, sorter) => {
    const sort = sorter.order === 'descend' ? `-${sorter.field}` : sorter.field;
    setParams({
      ...params,
      sortBy: sort,
      ...newPagination,
      page: newPagination.current - 1,
    });
  };

  const acceptDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${END_POINT}/admin/commitment/${idSub}`,
        {
          headers: { 'x-access-token': `${accessToken}` },
        }
      );
      if (res.status === 200) {
        alert('đã xóa thành công ');
      }
      setLoading(false);
      fetchData({ ...pagination, page: pagination.current - 1 });
      setIsDeleteVisible(false);
    } catch (error) {
      console.log(error);
    }
  };
  const acceptAddSub = async (nameSelected) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${END_POINT}/admin/commitment/`,{name: nameSelected},
        {
          headers: { 'x-access-token': `${accessToken}` },
        }
      );
      if (res.status === 200) {
        alert('đã thêm thành công ');
      }
      setLoading(false);
      fetchData({ ...pagination, page: pagination.current - 1 });
      setIsDeleteVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const postApiLogo = async (data) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/commitment/img`,
        method: "post",
        headers: { 'x-access-token': `${accessToken}` },
        data: data,
      });
      if (result.status === 200) {
        alert("Cập nhật Logo và thông tin thành công!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const postApiBanner = async (data) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/commitment/banner`,
        method: "post",
        headers: { 'x-access-token': `${accessToken}` },
        data: data,
      });
      if (result.status === 200) {
        alert("Cập nhật Banner và thông tin thành công!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const changeLogo = (e) => {
    const img = e.target.files[0];
    img.preview = URL.createObjectURL(img)
    setLogo(img);
    setCheckLogo(true)
  }

  const changeBanners = e => {
    const banner = e.target.files[0];
    banner.preview = URL.createObjectURL(banner)
    setBanner(banner)
    setCheckBanners(true)
  }

  const handleSubmit = () => {
    if (checkLogo === true) {
      let valueLogo = new FormData();
      valueLogo.append("img", fileListLogo)
      postApiLogo(valueLogo);
      
    }
    if (checkBanner === true) {
      let fileBanners = new FormData();
      fileBanners.append("banner", fileListBanner)

      postApiBanner(fileBanners);
      alert("Cập nhật Banner và thông tin thành công!")
    }
  }

  return (
    <>
      <h1 className="mb-[38px]" style={{ margin: "auto", fontSize: "25px", fontWeight: "600", }}>Cam kết</h1>
      <Form
        style={{ margin: "auto" }}
        ref={form}
        name="basic"
        layout="inline"
        autoComplete="off"
      >
        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Image">
          <input type='file' accept="image/*" onChange={changeLogo} />
          <div className="flex align-center" style={{ width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
            {fileListLogo !== "" ? (
              <img src={fileListLogo.preview} alt={fileListLogo.name} />
            ) : (<img src={`${data.image}`} alt={fileListLogo.name} />)}
          </div>
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }} label="Banner">
          <input type="file" accept="image/*" id="file-upload" onChange={changeBanners} />
          <div className="flex align-center" style={{ width: 100, height: 100, border: "1px solid #cccc", marginTop: 8, padding: 5 }}>
            {fileListBanner !== "" ? (
              <img src={fileListBanner.preview} alt={fileListBanner.name} />
            ) : (<img src={`${data.banner}`} alt={fileListBanner.name} />)}
          </div>
        </Form.Item>

        <Form.Item className="p-[5px]" style={{ fontWeight: "bold", }}
          wrapperCol={{
            offset: 10,
            // span: 20,
          }}
        >
          <Button
            type="primary"
            style={{
              color: "",
              padding: "16",
              display: "flex",
              alignItems: 'center',
              fontWeight: "bold"
            }}
            htmlType="submit"
            onClick={handleSubmit}
          >
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
      <Descriptions
        title=""
        layout="vertical"
        bordered
      >
        <Descriptions.Item label="Cam kết phụ" span={3}>
            <div style={{width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10}}>
              <Button
                onClick={() => {
                  setIsAddVisible(true);
                }}
              >
                Thêm mới
              </Button>
            </div>
            <div className="flex items-end">
              <table border="1" style={{width: "100%"}}>
                  {data.detail &&
                    data.detail.map((sub) => (
                      <tbody key={sub._id} style={{width: "100%"}}>
                          <tr style={{justifyContent:'center', width: "100%"}}>
                            <td style={{width: '10%'}}>
                              <img
                                src={sub.logo}
                                className="h-10 w-10 rounded-full"
                                alt=""
                              ></img>
                            </td>
                            <td style={{width: '25%'}}>{sub.name}</td>
                            <td style={{width: '50%'}}>{sub.description}</td>
                            <td style={{width: '15%', right: 0}}>
                              <button
                                style={{padding: '20px 0', marginLeft: '50%'}}
                                className="hover:text-red-600"
                                onClick={() => {
                                  setIdSub(sub._id);
                                  setIsDeleteVisible(true);
                                }}
                              >
                                Xoá
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td colspan='4'><hr/></td>
                          </tr>
                        </tbody>
                          ))}
              </table>
            </div>
          </Descriptions.Item>
        </Descriptions>
      {isAddVisible && (
        <AddSubCommitToCommit
          onClose={() => setIsAddVisible(false)}
          onClick={acceptAddSub}
          isVisible={isAddVisible}
          data={data.detail}
        />
      )}
      <ConfirmModal //Modal delete department
        isVisible={isDeleteVisible}
        text={`xóa cam kết`}
        onClose={() => setIsDeleteVisible(false)}
        loading={loading}
        onOk={acceptDelete}
      />
    </>
  );
}

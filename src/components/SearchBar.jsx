import React, { useEffect } from 'react';
import styled from "styled-components";
import { Input } from 'antd';
import { FaChevronDown } from "react-icons/fa";
import { locales } from "../i18n";
import { useTranslation } from 'react-i18next';
import "antd/dist/antd.css";
import { useContext } from 'react';
import { MainContext } from "../context/MainContext";
import { useNavigate } from 'react-router-dom'

const { Search } = Input;
const SearchBar = () => {
    const navigateToResultPage = useNavigate();
    // let's create a search function
    // why i use useContext hook ?
    // because i need to pass data of search input from SearchBar to ResultSearchBlog component
    const {fetchDataByKeyword} = useContext(MainContext)
    const onSearch = value => {
        fetchDataByKeyword(value);
        navigateToResultPage("search-result")
    };
    // ---------------------- >>
    // Set up Mutiple language feature
    const { i18n } = useTranslation();
    const changeLanguage = (lng) => {  // here's function for changes and displays current language 
        i18n.changeLanguage(lng)
    }
    const currentLanguage = locales[i18n.language];
    // I wanna customize style for Input Search of Antd library
    const CustomizeInputSearch = styled.div`
    .ant-input-search {
        width: 200px;
        height: 24px
    }
    .ant-input-group {
        
    }
    .ant-input {
        background-color: black;
        padding: 0px 11px !important;
        border-radius: 5px;
        color: white !important;
        &:focus {
            border-color: white !important;
        }
        &:hover {
            border-color: white !important ;
        }
    }
    .ant-input-group-addon {
        
    }
    .ant-input-search-button{
        height: 24px;
        background-color: black;   
        border-radius: 0px 4px 4px 0px !important
        &:focus {
            border-color: white !important;
        }
        &:hover {
            border-color: white !important ;
        }
    }
    .anticon-search{
        color: white
    }
    `
    return (
        <div className="fixed z-30 h-[32px] w-full bg-black">
            <div className="md:container mx-auto text-sm h-full flex items-center" style={{ color: "white" }}>
                <span className='hidden sm:hidden md:block flex w-full'>Copyright @TKT Express</span>
                <div className="h-full w-full flex items-center justify-between sm:justify-between md:justify-end md:px-0 px-4">
                    <div className='hidden sm:hidden md:block flex px-1 mx-1.5 whitespace-nowrap'>#TKT Logicstics</div>
                    <div className='hidden sm:hidden md:block flex px-1 mx-1.5'>#Promotion</div>
                    <div className='search_box flex items-center h-[24px] mx-1.5'>
                        <CustomizeInputSearch>
                            <Search
                                placeholder="input search text"
                                onSearch={onSearch}
                            />
                        </CustomizeInputSearch>
                    </div>
                    {/* <---- Change language feature ----> */}
                    <div className="group hover:bg-yellow-200 rounded-md">
                        <span
                            className={`inline-flex items-center px-2 py-1.5 mx-1.5 cursor-pointer`}
                        >
                            {currentLanguage}
                            <FaChevronDown className="h-4 w-4 pl-[6px]" />
                        </span>
                        <ul className="hidden group-hover:block absolute z-10 bg-white rounded-lg border shadow-lg animate-up">
                            <li>
                                <p
                                    className="flex px-4 py-2 w-auto rounded-lg hover:bg-yellow-100 cursor-pointer text-black"
                                    onClick={() => changeLanguage("vi")}
                                >VI</p>
                            </li>
                            <li>
                                <p
                                    className="flex px-4 py-2 w-auto rounded-lg hover:bg-yellow-100 cursor-pointer text-black"
                                    onClick={() => changeLanguage("en")}
                                >EN</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;
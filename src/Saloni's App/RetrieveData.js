import React, { useState } from "react"
import "./Index.css"
export default function Retrieve(){
    const [Search, setSearch] = useState("")
    const [SearchData, setSearchData] = useState([])
    const [Boolean, setBoolean] = useState(false)
    const searchData = (Search) => {
        const newarr = []
        setBoolean(true)
        const data1=JSON.parse(localStorage.getItem("filteredData"))
        console.log(data1);
        if (Search.length < 4 || Search.trim() === "") {
            alert("String length should be more than 4")
        }
        else {
            for (let i of data1) {
                if (i.Aadhar === Search) {
                    newarr.push(i)
                    setBoolean(true)
                    break
                }
                else {
                    setBoolean(false)
                }
            }
            setSearchData(newarr)
        }
        setSearch("")
    }
    return (
        <div>
            <div className="retrieveData">
                <input className="searchData" type="search" value={Search} placeholder="Search" onChange={(e) => {
                    setSearch(e.target.value)
                }} />
                <button className="findData" onClick={() => (searchData(Search))}>Find</button>
            </div>
            {Boolean ? SearchData.map((item, index) => {
                console.log(item);
                return (
                    <div className="retrieveDiv" key={index}>
                        <h4>{`Name:      ${item.Name}`}</h4>
                        <h4>{`DOB:       ${item.DOB}`}</h4>
                        <h4>{`Aadhar:    ${item.Aadhar}`}</h4>
                        <h4>{`Mobile No: ${item.Mobile}`}</h4>
                        <h4>{`Age:       ${item.Age}`}</h4>
                    </div>
                )
            }) :
                <div className="noData">
                    <h1>No Data</h1>
                </div>
            }
        </div>
    )
}
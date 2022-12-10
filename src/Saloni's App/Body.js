import React, { useState } from "react";
import Retrieve from "./RetrieveData";
import './Index.css'
import Header from "./Header";
const _ =require('lodash')
// import moment from 'moment'
function Details() {
    const [Filter, setFilter] = useState(true)
    const [inputFields, setInputFields] = useState([{isComplete: false, Name: '', DOB: '', Aadhar: '', Mobile: '', Age: '' }])

    const localStorageFunction=()=>{
        const filteredData = _.filter(inputFields,{"isComplete":true})

        localStorage.setItem("filteredData",JSON.stringify(filteredData))
    }
    const saveData=(index)=>{
        console.log(index)
        let tempArr=[...inputFields]
        if(tempArr[index].Name && tempArr[index].DOB && tempArr[index].Aadhar && tempArr[index].Mobile){
        tempArr[index].isComplete=true
        console.log(tempArr)    
        setInputFields(tempArr)
        }
        localStorageFunction()
        // console.log(data)
    }
    function countAge(date, index) {
        var currentYear = new Date()
        var birthYear = new Date(date)
        var age = currentYear.getFullYear() - birthYear.getFullYear()
        // setAge(age)
        inputFields[index].Age = age
        console.log(date);
    }
    function addPerson() {
        setFilter(true)
    }

    function retrieveData() {
        setFilter(false)
    }
    const addFields = () => {
        let newfield = {isComplete:false, Name: '', DOB: '', Aadhar: '', Mobile: '', Age: '' }

        setInputFields([...inputFields, newfield])
    }
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        data[index].isComplete=false
        setInputFields(data);
        countAge(data[index].DOB, index)
        localStorageFunction()
    }
    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
        localStorageFunction()
    }
    return (
        <div className="main">
            <Header />
            <div className="Button">
                <button className="button" onClick={() => { addPerson() }}>Add New Person</button>
                <button className="button" onClick={() => { retrieveData() }}>Retrieve Information</button>
            </div>
            <div className="body">
                <div className="change">
                    {Filter ? <h2>Add New Person</h2> : <h2>Retrieve Information</h2>}
                </div>
                {Filter ?
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Date Of Birth</th>
                                    <th>Aadhar Number</th>
                                    <th>Mobile Number</th>
                                    <th>Age</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inputFields.map((input, index) => {
                                    return (
                                        <tr>
                                            <td><input className="fields" type="text"
                                                name='Name'
                                                placeholder='Name'
                                                value={input.Name}
                                                onChange={event => handleFormChange(index, event)} /></td>
                                            <td><input className="fields" type="text" placeholder="YYYY-MM-DD"
                                                name='DOB'
                                                value={input.DOB}
                                                onChange={event => handleFormChange(index, event)} /></td>
                                            <td><input className="fields" type="text"
                                                name='Aadhar'
                                                value={input.Aadhar}
                                                onChange={event => handleFormChange(index, event)} /></td>
                                            <td><input className="fields" type="text"
                                                name='Mobile'
                                                value={input.Mobile}
                                                onChange={event => handleFormChange(index, event)} /></td>
                                            <td><input className="fields" type="text"
                                                name='Age'
                                                value={input.Age} /></td>
                                            <td><button className="action" onClick={()=>{saveData(index)}}>Save</button>
                                            <button className="action" onClick={() => removeFields(index)}>Delete</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <button className="add" onClick={() => { addFields() }}>Add</button>
                    </div> :<Retrieve/>
                }
            </div>
        </div>
    )
}

export default Details
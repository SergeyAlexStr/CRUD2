import React, {useEffect, useState} from 'react';
import axios from 'axios'
import Table from "./Table/Table";
import AddPerson from "./AddPerson/AddPerson";


const App = () => {
    const [users, setUsers] = useState([]);
    const [isEditMode, setMode] = useState(false);
    const apiURL = 'http://178.128.196.163:3000/api/records/';

    const getData = () => {
        const axiData = async () => {
            await axios(apiURL)
                .then(result => {
                    setUsers(result.data);
                })
                .catch(err => console.log(err.toString()))
        };
        axiData()
    };
    useEffect(() => {
        getData()
    }, []);

    return (
        <div>
            <h1>CRUD</h1>
            <AddPerson getData={getData} isEditMode={isEditMode} setMode={setMode}/>
            <Table users={users} isEditMode={isEditMode} setMode={setMode} getData={getData}/>
        </div>
    )


};
export default App




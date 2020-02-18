import React, {useEffect, useState} from "react";

import axios from 'axios'

const Table = (props) => {
    const [users, setUsers] = useState(props.users);
    const [updateData, setUpdateData] = useState(false);
    const apiURL = `http://178.128.196.163:3000/api/records/`;

    useEffect(() => {
        setUsers(props.users)
    }, [props]);

    const inputHandleChange = (value, changedUser) => {
        setUpdateData(true);
        let editUser = {...changedUser, data: {name: value}};
        users.forEach(user => {
            if (user._id === editUser._id) {
                user.data = editUser.data;
                user.edited = true;
            }
        })
    };

   const updateDate = () => {
        if (updateData) {
            users.forEach(user => {
                if (user.edited) {
                    axios.post(apiURL + user._id)
                        .then(res => {
                            if (res.status === 200){
                                props.getData();
                                props.setMode(false);
                                setUpdateData(false)
                            }
                        })
                .catch(error =>console.log(error.toString()) )
                }
        } )
} else props.setMode(false)


    };

    const deleteUser = (id) => {
        axios.delete(apiURL + id)
            .then(res => {
                if (res.status === 200) {
                    props.getData()
                }
            })
            .catch(err => console.log(err.toString()))
    };

    return(
        <table>
            <thead>
            <tr>
                <th>name</th>
            </tr>
            </thead>
            <tbody>
            {props.users.length > 0 ? (
                props.users.map(user => (
                    <tr key={user._id}>
                    <td>
                        <input type='text'
                               defaultValue={user.data.name}
                               disabled={!props.isEditMode}
                               onChange={e => {inputHandleChange(e.target.value, user)}}
                        />
                    </td>
                        <td>
                            {props.isEditMode ? (
                                <button onClick={updateDate}>
                                           save
                                </button>
                            ):(
                                <button onClick={() => props.setMode(true)}>
                                    edit
                                </button>
                            )}
                            <button
                                onClick={()=> deleteUser(user._id)}
                                disabled={!props.isEditMode}
                            >
                                delete
                            </button>

                        </td>
                    </tr>
                ))
            ):(
                <tr>
                    <td colSpan={3}/>
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default Table

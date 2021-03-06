import React, {useState} from "react";
import {Button, FormLabel} from "react-bootstrap";
import axios from 'axios'


const AddPerson = props => {
        const someState = {data: {name: ''}};
        const [userName, setUserName] = useState(someState);
        const apiURL = `http://178.128.196.163:3000/api/records/`;

  const  inputHandleChange = (e)=> {
        const {value} = e.target;
        setUserName({...userName, data: {name: value}})
    };
    return(
        <div>
            <FormLabel>Добавьте имя</FormLabel>
            <form onSubmit={e => {
                e.preventDefault();
                if (!userName.data.name) return;
                axios.put(apiURL, userName)
                    .then(res => {
                            console.log(res.data);
                            if (res.status === 200) {
                                props.getData();
                                setUserName(someState)
                            }
                        }
                    )
                    .catch(err => console.error(toString()))
            }}>
            <label> user name </label>
            <input className = 'mb-1'
                    type='text'
                   name='name'
                   value={userName.data.name}
                   onChange={inputHandleChange}
                   disabled={!!props.isEditMode}
            />
            <Button
            type='submit'
            disabled={!!props.isEditMode}
            >+</Button>
        </form>
        </div>
    )
};


export default AddPerson

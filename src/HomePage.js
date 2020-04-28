import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const HomePage = () => {
    const [selectValue, setSelectValue] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/users').then(
            response => setUsers(response.data),
            error => console.log(error)
        );
    }, []);

    return (
        <div>
            <h1>
                How are you feeling today, let us know:
            </h1>
            <FormControl>
                <InputLabel>Select your Username</InputLabel>
                <Select
                    value={selectValue}
                    onChange={newSelectValue => setSelectValue(newSelectValue.target.value)}
                >
                    {users.map(user => {
                                                return (
                                                    <MenuItem 
                                                        value={user.id}
                                                        key={user.id}
                                                    >
                                                        {user.name}
                                                    </MenuItem>
                                                );
                })}                          
                </Select>
                <Button component={Link} to={`/show-page/${selectValue}`} style={{ marginTop: '1em', backgroundColor: 'red', opacity: .75, border: '1pt solid black' }}>
                    <Typography>Proceed to Show Page</Typography>
                </Button>
            </FormControl>
        </div>
    );
};

export default HomePage;
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { LineChart, CartesianAxis, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import axios from 'axios';

const ShowPage = ({ history, match }) => {
    const id = match.params.id;

    const [happiness, setHappiness] = useState('');
    const [sadness, setSadness] = useState('');
    const [anger, setAnger] = useState('');
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [date, setDate] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:4000/users/${id}`).then(
            response => setData(response.data.feelings),
            error => console.log(error)
        );
    }, [id]);

    useEffect(() => {
        const tempArray = [];

        for (let i = 0; i < data.length; i++) {
            const tempObject = {
                'date': data[i].date,
                'Happiness': data[i].happiness_level,
                'Sadness': data[i].sadness_level,
                'Anger': data[i].anger_level
            };

            tempArray.push(tempObject);
        }

        setData2(tempArray);
    }, [data]);

    const handleSubmit = async event => {
        event.preventDefault();

        const formUploadObject = {
            'happiness_level': happiness,
            'sadness_level': sadness,
            'anger_level': anger,
            date
        };

        const response = await axios.post('http://localhost:4000/feelings', { feeling: formUploadObject });
        const feelingId = response.data.id;

        const userFeelingObject = {
            user_id: id,
            feeling_id: feelingId
        };

        await axios.post('http://localhost:4000/user_feelings', { user_feeling: userFeelingObject });

        setHappiness('');
        setSadness('');
        setAnger('');

        history.push('/');
    };

    return (
        <div>
            <h1>
                Welcome 
            </h1>
            <div>
                <h4>How are you feeling today?</h4>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <TextField 
                            type='text' 
                            label='Date' 
                            style={{ width: '10%' }} 
                            value={date}
                            onChange={newDate => setDate(newDate.target.value)}
                        />
                        <TextField 
                            type='number' 
                            label='Happiness' 
                            style={{ width: '10%' }} 
                            value={happiness}
                            onChange={newHappiness => setHappiness(newHappiness.target.value)}
                        />
                        <TextField 
                            type='number' 
                            label='Sadness' 
                            style={{ width: '10%' }} 
                            value={sadness}
                            onChange={newSadness => setSadness(newSadness.target.value)}
                        />
                        <TextField 
                            type='number' 
                            label='Anger' 
                            style={{ width: '10%' }} 
                            value={anger}
                            onChange={newAnger => setAnger(newAnger.target.value)}
                        />
                        <Button style={{ border: '1pt solid black', marginTop: '1em', backgroundColor: 'red', opacity: 0.75 }} type='submit'>
                            Submit Feelings
                        </Button>
                    </form>
                    <LineChart width={730} height={250} data={data2} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianAxis strokeDasharray='3 3' />
                        <XAxis dataKey='date' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type='monotone' dataKey='Happiness' stroke='#8884d8' />
                        <Line type='monotone' dataKey='Sadness' stroke='#82ca9d' />
                        <Line type='monotone' dataKey='Anger' stroke='black' />
                    </LineChart>
                </div>
            </div>
        </div>
    );
};

export default ShowPage;
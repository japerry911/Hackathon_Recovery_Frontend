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
    const [dogUrl, setDogUrl] = useState('');
    const [validationStatus, setValidationStatus] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:4000/users/${id}`).then(
            response => setData(response.data.feelings),
            error => console.log(error)
        );

        axios.get('https://dog.ceo/api/breeds/image/random').then(
            response => setDogUrl(response.data.message),
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

    useEffect(() => {
        if ((happiness >= 0 && happiness <= 10) &&
        (date.match(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)) && 
        (happiness >= 0 && happiness <= 10) && 
        (sadness >= 0 && sadness <= 10) &&
        (anger >= 0 && anger <= 10)) {
            setValidationStatus(true);
        } else {
            setValidationStatus(false);
        }
    }, [date, happiness, sadness, anger]);

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
                <img 
                    src={dogUrl}
                    alt='dog'
                    style={{ maxWidth: '30em', borderRadius: 10 }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <TextField 
                            type='text' 
                            label='Date (yyyy-MM-dd)' 
                            style={{ width: '20%' }} 
                            value={date}
                            onChange={newDate => setDate(newDate.target.value)}
                            error={!date.match(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)}
                        />
                        <TextField 
                            type='number' 
                            label='Happiness' 
                            style={{ width: '20%' }} 
                            value={happiness}
                            onChange={newHappiness => setHappiness(newHappiness.target.value)}
                            error={happiness === '' || happiness > 10 || happiness < 0}
                        />
                        <TextField 
                            type='number' 
                            label='Sadness' 
                            style={{ width: '20%' }} 
                            value={sadness}
                            onChange={newSadness => setSadness(newSadness.target.value)}
                            error={sadness === '' || sadness > 10 || sadness < 0}
                        />
                        <TextField 
                            type='number' 
                            label='Anger' 
                            style={{ width: '20%' }} 
                            value={anger}
                            onChange={newAnger => setAnger(newAnger.target.value)}
                            error={anger === '' || anger > 10 || anger < 0}
                        />
                        <Button 
                            style={{ border: '1pt solid black', marginTop: '1em', backgroundColor: 'red', opacity: 0.75 }} type='submit'
                            disabled={!validationStatus}
                        >
                            Submit Feelings
                        </Button>
                    </form>
                    <LineChart width={730} height={250} data={data2} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
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
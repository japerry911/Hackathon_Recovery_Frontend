import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { LineChart, CartesianAxis, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

const ShowPage = ({ history }) => {
    const [happiness, setHappiness] = useState('');
    const [sadness, setSadness] = useState('');
    const [anger, setAnger] = useState('');

    const data = [
        {
            'date': '2020-04-21',
            'Happiness': 1,
            'Sadness': 2,
            'Anger': 3
        },
        {
            'date': '2020-04-22',
            'Happiness': 4,
            'Sadness': 5,
            'Anger': 6
        },
        {
            'date': '2020-04-23',
            'Happiness': 7,
            'Sadness': 8,
            'Anger': 9
        },
        {
            'date': '2020-04-24',
            'Happiness': 10,
            'Sadness': 9,
            'Anger': 8
        },
        {
            'date': '2020-04-25',
            'Happiness': 7,
            'Sadness': 6,
            'Anger': 5
        }
    ];

    const handleSubmit = event => {
        event.preventDefault();

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
                    <LineChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
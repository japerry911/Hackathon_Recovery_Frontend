import React, { useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Chart } from 'react-charts';

const ShowPage = () => {
    const data = useMemo(
        () => [
            {
                label: 'Happiness',
                data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
            },
            {
                label: 'Sadness',
                data: [[0, 2], [1, 3], [2, 4], [3, 5], [4, 6]]
            },
            {
                label: 'Sadness',
                data: [[0, 3], [1, 4], [2, 5], [3, 6], [4, 7]]
            }
        ],
        []
    );

    const axes = useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    );

    return (
        <div>
            <h1>
                ShowPage 
            </h1>
            <div>
                <h4>How are you feeling today?</h4>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextField type='number' label='Happiness' style={{ width: '10%' }} />
                    <TextField type='number' label='Sadness' style={{ width: '10%' }} />
                    <TextField type='number' label='Anger' style={{ width: '10%' }} />
                    <Button style={{ border: '1pt solid black', marginTop: '1em', backgroundColor: 'red', opacity: 0.75 }} variant='filled'>
                        Submit Feelings
                    </Button>
                    <div style={{ width: '400px', height: '300px' }}>
                        <Chart data={data} axes={axes} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowPage;
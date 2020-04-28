import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const ShowPage = () => {
    return (
        <div>
            <h1>
                ShowPage 
            </h1>
            <div>
                <h4>How are you feeling today?</h4>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextField label='Happiness' style={{ width: '25%' }} />
                    <TextField label='Sadness' style={{ width: '25%' }} />
                    <TextField label='Anger' style={{ width: '25%' }} />
                    <Button style={{ border: '1pt solid black', marginTop: '1em', backgroundColor: 'red', opacity: 0.75 }} variant='filled'>
                        Submit Feelings
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ShowPage;
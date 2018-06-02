import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

const genderDatasource = ['Male', 'Female'].map((gender, i) => {
    return <MenuItem key={i} value={gender.toLowerCase()}>{gender}</MenuItem>
});

const ageDatasource = ['20-25', '25-30', '30-40', '40-50', '50-60', '60-100'].map((age, i) => {
    return <MenuItem key={i} value={age}>{age}</MenuItem>
});

const locationDatasource = ['Canada', 'Iran', 'United Kingdom', 'Estonia', 'Australia'].map((age, i) => {
    return <MenuItem key={i} value={age}>{age}</MenuItem>
});

const jobDatasource = ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard', 'Omar Alexander',
    'Carlos Abbott', 'Miriam Wagner', 'Bradley Wilkerson', 'Virginia Andrews', 'Kelly Snyder'];


export {
    genderDatasource,
    ageDatasource,
    locationDatasource,
    jobDatasource
};
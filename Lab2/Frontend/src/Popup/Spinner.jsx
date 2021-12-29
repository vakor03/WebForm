import React from 'react';
import classes from './Spinner.scss';

function Spinner() {
    return (
        <div className={classes['lds-default']}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default Spinner;

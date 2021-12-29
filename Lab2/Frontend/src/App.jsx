import React from 'react';
import classes from './App.scss';
import axios from 'axios';
import SendMailForm from './InputForms/SendMailForm';

function App() {
    return (
        <div className={classes.container}>
            <header>
                <h1>Send email</h1>
            </header>
            <main>
                <SendMailForm />
            </main>
        </div>
    );
}

export default App;

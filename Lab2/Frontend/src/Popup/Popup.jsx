import React from 'react';
import Spinner from './Spinner';
import classes from './Popup.scss';

class Popup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className={classes.backdrop}>{this.props.children}</div>;
    }
}

export default Popup;

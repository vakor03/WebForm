import React from 'react';
import classes from './FormsStyles.scss';

class TextAreaField extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onChange, value } = this.props;

        return (
            <div>
                <label>{this.props.label}</label>
                <textarea
                    placeholder={this.props.defaultValue}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                />
            </div>
        );
    }
}

export default TextAreaField;

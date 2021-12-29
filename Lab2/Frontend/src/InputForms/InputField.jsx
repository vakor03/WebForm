import React from 'react';
import classes from './FormsStyles.scss';

class InputField extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onChange, value } = this.props;

        return (
            <div>
                <label>{this.props.label}</label>
                <input
                    type={this.props.type}
                    value={value}
                    name={this.props.name}
                    placeholder={this.props.defaultValue}
                    onChange={e => onChange(e.target.value)}
                    required
                />
            </div>
        );
    }
}

export default InputField;

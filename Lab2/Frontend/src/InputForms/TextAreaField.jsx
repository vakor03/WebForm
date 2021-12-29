import React from 'react';
import './FormsStyles.scss'

class TextAreaField extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onChange, value } = this.props;

        return (
            <div className={'textAreaWrapper'}>
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

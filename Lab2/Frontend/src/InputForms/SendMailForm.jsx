import React from 'react';
import classes from './SendMailForm.scss';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Spinner from '../Popup/Spinner';
import Popup from '../Popup/Popup';
import Message from '../Popup/Message';
import { init } from 'emailjs-com';
import * as emailjs from 'emailjs-com';

class SendMailForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRequest: false,
            errorMessages: [],
            isSuccess: false,
            isPopupOnScreen: false,
            isRateLimit: false,
            name: '',
            email: '',
            message: '',
        };
        init('user_gUtuBxGEIMu06UvjR4R9u');
    }

    handleSubmit = event => {
        event.preventDefault();
        const sendMail = this;
        const templateParams = {
            to_name: this.state.name,
            message: this.state.message,
            to_email: this.state.email,
        };

        this.setState({ isRequest: true });
        this.setState({ isPopupOnScreen: true });
        emailjs
            .send('service_yvmj3xy', 'template_7sonasa', templateParams)
            .then(
                response => {
                    this.setState({
                        errorMessages: ['Successfully'],
                        isRequest: false,
                        isSuccess: true,
                        name: '',
                        email: '',
                        message: '',
                    });
                },
                error => {
                    this.setState({
                        isRequest: false,
                        isSuccess: false,
                    });

                    if (!error?.message) {
                        this.setState({
                            errorMessages: ['Something went wrong...'],
                        });
                        return;
                    }
                    this.setState({
                        errorMessages: error.message ?? [
                            'Something went wrong...',
                        ],
                    });
                },
            );
    };

    onOkClicked = () => {
        this.setState({ isPopupOnScreen: false });
    };

    render() {
        const { name, email, message } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <InputField
                        label="Name: "
                        type="text"
                        name="name"
                        defaultValue="Enter your name"
                        value={name}
                        onChange={newName => this.setState({ name: newName })}
                    />
                    <InputField
                        label="E-mail: "
                        type="email"
                        name="email"
                        defaultValue="Enter e-mail"
                        value={email}
                        onChange={newEmail =>
                            this.setState({ email: newEmail })
                        }
                    />
                    <TextAreaField
                        label="Your message: "
                        defaultValue="Enter your message"
                        value={message}
                        onChange={newMessage =>
                            this.setState({ message: newMessage })
                        }
                    />
                    <input
                        type="submit"
                        value="Submit"
                        disabled={this.state.isRequest}
                        className={classes.button}
                    />
                </form>
                {this.state.isPopupOnScreen ? (
                    <Popup>
                        {this.state.isRequest ? (
                            <Spinner />
                        ) : (
                            <Message
                                className={this.state.isSuccess}
                                onClose={this.onOkClicked}>
                                {this.state.errorMessages.map(element => (
                                    <div>{element}</div>
                                ))}
                            </Message>
                        )}
                    </Popup>
                ) : null}
            </div>
        );
    }
}

export default SendMailForm;

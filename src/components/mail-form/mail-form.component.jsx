import React from 'react';
import './mail-form.styles.css';
import Popup from '../pop-up/pop-up.component';
import Spinner from '../spinner/spinner.component';
import * as emailjs from '@emailjs/browser';

export class MailForm extends React.Component {
    constructor() {
        super();

        this.state = {
            isRequest: false,
            popupMessages: [],
            isSuccess: false,
            isPopupVisible: false,
            isRateLimit: false,
            name: '',
            email: '',
            message: '',
        };
        const user_id_secret = process.env.REACT_APP_EMAILJS_USER_TOKEN;
        emailjs.init(user_id_secret);
    }

    handleSubmit = event => {
        event.preventDefault();
        const templateParams = {
            to_name: this.state.name,
            message: this.state.message,
            to_email: this.state.email,
        };

        this.setState({ isRequest: true });
        this.setState({ isPopupVisible: true });
        emailjs
            .send(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                templateParams,
            )
            .then(
                () => {
                    this.setState({
                        popupMessages: ['Successfully'],
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
                            popupMessages: ['Something went wrong...'],
                        });
                        return;
                    }
                    this.setState({
                        popupMessages: error.message ?? [
                            'Something went wrong...',
                        ],
                    });
                },
            );
    };

    render() {
        const { name, email, message, popupMessages } = this.state;

        return (
            <>
                {this.state.isRequest ? <Spinner></Spinner> : null}
                <Popup
                    active={this.state.isPopupVisible && !this.state.isRequest}
                    setActive={newValue =>
                        this.setState({ isPopupVisible: newValue })
                    }>
                    {popupMessages.map(msg => (
                        <p>{msg}</p>
                    ))}
                </Popup>

                <div
                    className={
                        !this.state.isPopupVisible && !this.state.isRequest
                            ? 'container active'
                            : 'container'
                    }>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor={'email'}>Your email</label>
                        <input
                            className={'text'}
                            type={'email'}
                            id={'email'}
                            name={'email'}
                            placeholder={'Your email address..'}
                            value={email}
                            onChange={newEmail =>
                                this.setState({ email: newEmail.target.value })
                            }
                            required
                        />

                        <label htmlFor={'name'}>Name</label>
                        <input
                            className={'text'}
                            type={'text'}
                            id={'name'}
                            name={'name'}
                            value={name}
                            placeholder={'Your name..'}
                            onChange={newName =>
                                this.setState({ name: newName.target.value })
                            }
                            required
                        />

                        <label htmlFor={'message'}>Subject</label>
                        <textarea
                            id={'message'}
                            name={'message'}
                            value={message}
                            placeholder={'Write something..'}
                            onChange={newMsg =>
                                this.setState({ message: newMsg.target.value })
                            }
                            required
                        />

                        <input
                            className={'submit'}
                            type={'submit'}
                            value={'Submit'}
                            disabled={this.state.isRequest}
                        />
                    </form>
                </div>
            </>
        );
    }
}

import {useState} from "react";
import axios from "axios";
import './NewAttemptButton.css';

const NewAttemptButton = props => {
    const [newAttempt, setNewAttempt] = useState(false);

    const timeoutDuration = 60e3; //1 minute

    setTimeout(() => setNewAttempt(true), timeoutDuration);

    const newAttemptHandler = () => {
        setNewAttempt(false);

        const formData = {
            user_id: props.userId
        }
        axios.post(process.env.REACT_APP_API_DOMAIN + '/v1/public/new-code', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).catch(err => {
            console.error(err)
        });
    };

    let buttonJSX = <></>;
    if (newAttempt) {
        buttonJSX =
            <div className="new_attempt-button">
                <button className="new_attempt-button" onClick={newAttemptHandler}>Send a new code</button>
            </div>;
    }

    return buttonJSX;
};

export default NewAttemptButton;

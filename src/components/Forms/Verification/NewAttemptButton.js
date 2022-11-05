import {useState} from "react";
import axios from "axios";
import './NewAttemptButton.css';

/**
 * This component is responsible for the new button that appears after certain timeout and
 * is requesting a new phone verification code
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const NewAttemptButton = props => {
    const [newAttempt, setNewAttempt] = useState(false);

    const timeoutDuration = 60e3; //1 minute timeout after which the button appears

    setTimeout(() => setNewAttempt(true), timeoutDuration);

    /**
     * Makes a call to request a new code
     */
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

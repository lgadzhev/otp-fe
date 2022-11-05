import {useState} from "react";
import Card from "../../UI/Card";
import RegistrationForm from "./RegistrationForm";
import VerificationForm from "../Verification/VerificationForm";

/**
 * This component is responsible for handling the registration and verification logic
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Registration = props => {
    const [isVerification, setIsVerification] = useState(false);
    const [message, setMessage] = useState(false);
    const [userId, setUserId] = useState(false);

    /**
     * Sets the registered user's ID and triggers the verification component
     * @param userId
     */
    const onRegistration = (userId) => {
        setIsVerification(true);
        setUserId(userId);
        props.onRegistration(userId);
        setMessage(false);
    }

    /**
     * Upon successful verification, hides the verification component,
     * which shows the registration one for the next user
     */
    const onVerification = () => {
        setIsVerification(false);
        props.onRegistration();
    }

    return (
        <Card className="registration-form-inner">

            {!isVerification && (
                <RegistrationForm
                    registeruser={onRegistration}
                    triggerMessage={message => setMessage(message)}
                />
            )}

            {isVerification && (
                <VerificationForm
                    verificationPassed={onVerification}
                    triggerMessage={message => setMessage(message)}
                    userId={userId}
                />
            )}
            {message && <h4 className='message'>{message}</h4>}
        </Card>
    );
}

export default Registration;
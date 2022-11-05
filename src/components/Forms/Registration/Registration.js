import {useState} from "react";
import Card from "../../UI/Card";
import RegistrationForm from "./RegistrationForm";
import VerificationForm from "../Verification/VerificationForm";

const Registration = props => {
	const [isVerification, setIsVerification] = useState(false);
	const [message, setMessage] = useState(false);
	const [userId, setUserId] = useState(false);

	const onRegistration = (userId) => {
		setIsVerification(true);
		setUserId(userId);
		props.onRegistration(userId);
		setMessage(false);
	}

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
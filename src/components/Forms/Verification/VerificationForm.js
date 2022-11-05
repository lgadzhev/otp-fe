import {useState} from "react";
import './VerificationForm.css';
import axios from "axios";

/**
 * This component is responsible for verifying the user's phone by providing a verification code
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const VerificationForm = (props) => {
	const [enteredCode, setEnteredCode] = useState('');
	const [coolDown, setCoolDown] = useState(false);

	/**
	 * Makes a call to the API to check if the provided code is valid and verifies the user if it is
	 *
	 * @param event
	 */
	const submitHandler = (event) => {
		event.preventDefault();

		const formData = {
			code: enteredCode,
			user_id: props.userId
		}
		axios.post(process.env.REACT_APP_API_DOMAIN + '/v1/public/verify-phone', formData, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		}).then((response) => {
			//Tell the parent component that the user is verified
			props.verificationPassed();
			props.triggerMessage(response.data.status_message)
		}).catch(err => {
			//Show the failed verification message
			props.triggerMessage(err.response.data.status_message)

			if (err.response.data.fields.cooldown) {
				setCoolDown(true);
				setTimeout(() => {
					setCoolDown(false)
				}, 60e3);
			}
		});
	};

	return (
		<div className="verification-form">
			<form onSubmit={submitHandler}>
				<label>Verification Code:</label>
				<input minLength={5} maxLength={5} onChange={e => setEnteredCode(e.target.value)}/>

				<button disabled={coolDown} className={coolDown ? "disabled" : "enabled"}>Verify</button>
			</form>
		</div>
	);
};

export default VerificationForm;

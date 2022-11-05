import {useState} from "react";
import './VerificationForm.css';
import axios from "axios";

const VerificationForm = (props) => {
	const [enteredCode, setEnteredCode] = useState('');
	const [coolDown, setCoolDown] = useState(false);

	const submitHandler = (event) => {
		event.preventDefault();

		const formData = {
			code: enteredCode,
			user_id: props.userId
		}
		axios.post(process.env.REACT_APP_API_DOMAIN + '/v1/public/verify', formData, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		}).then((response) => {
			props.verificationPassed();
			props.triggerMessage(response.data.status_message)
		}).catch(err => {
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

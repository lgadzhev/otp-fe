import "./RegistrationForm.css";
import {useState} from "react";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";

const RegistrationForm = props => {
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [enteredPhone, setEnteredPhone] = useState("");

	const submitHandler = (event) => {
		event.preventDefault();

		const formData = {
			email: enteredEmail,
			password: enteredPassword,
			phone: enteredPhone,
		};

		axios.post(process.env.REACT_APP_API_DOMAIN + '/v1/public/register', formData, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		}).then((response) => {
			props.registeruser(response.data.fields['userId']);
		}).catch(err => {
			props.triggerMessage(err.response.data.status_message);
		});
	};

	return (
		<div className="registration-form">
			<form onSubmit={submitHandler}>
				<h3> New User </h3>

				<label>Email:</label>
				<input
					required
					placeholder="E-mail"
					type="email"
					id="femail"
					onChange={e => setEnteredEmail(e.target.value)}
				/>

				<label>Password</label>
				<input
					required
					minLength={6}
					maxLength={12}
					placeholder="*********"
					type="password"
					id="fpassword"
					onChange={e => setEnteredPassword(e.target.value)}
				/>

				<label>Phone</label>
				{/*Using a third-party library to make sure that all phone number input cases are covered*/}
				<PhoneInput
					required
					placeholder="Enter phone number"
					value={enteredPhone}
					onChange={setEnteredPhone}
				/>

				<button type="submit" id="submitBtn" className="submitBtn">
					Register
				</button>
			</form>
		</div>
	);
};

export default RegistrationForm;

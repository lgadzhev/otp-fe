import './Form.css';
import Card from "../UI/Card";

import {useState} from "react";
import NewAttemptButton from "./Verification/NewAttemptButton";
import Registration from "./Registration/Registration";

const Form = () => {
	const [userId, setUserId] = useState(false);

	return (
		<Card className="registration-form">
			<Registration onRegistration={userId => setUserId(userId)}/>
			{userId && <NewAttemptButton userId={userId}/>}
		</Card>
	);
};

export default Form;

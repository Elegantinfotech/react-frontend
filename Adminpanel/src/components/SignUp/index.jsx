import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Table, Pagination, Button, Modal, Form } from 'react-bootstrap';
import DeleteAll from "./DeleteAll";
const SignUp = () => {
	const [data, setData] = useState({
		fullName: "",
		userType: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const [showDelModal, setShowDelModal] = useState(false);

	const handleDelClose = () => setShowDelModal(false);
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:4040/api/users/register";
			const { data: res } = await axios.post(url, data);
			console.log("data ",res.message);
			navigate("/");

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.signUp_}>
			<div className={styles.signUp_form_container}>
				{/* <div className={styles.left}>
					<h1>E-computers and Tutorials</h1>

				</div> */}
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h3>Create An Account</h3>
						<input
							type="text"
							placeholder="Full Name"
							name="fullName"
							onChange={handleChange}
							value={data.fullName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="userType"
							name="userType"
							onChange={handleChange}
							value={data.phoneNumber}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
						{/* <input type="button" value="Delete All" 
						className={styles.red_btn}/> */}
						  <Button variant="danger" onClick={() => setShowDelModal(true)}>
      Delete All
      </Button>
	  <DeleteAll showModal={showDelModal} handleClose={handleDelClose} />
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
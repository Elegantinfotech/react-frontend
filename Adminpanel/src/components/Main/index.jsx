import styles from "./styles.module.css";
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Navbar from "../AdminNavbar";
const Main = () => {
	let navigate=useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.setItem("is_logged_in",false);
		console.log(localStorage)
	    navigate('/login');
	};
	return (
		<div>
		{/* <div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>E-computers and Tutorials</h1>
				<Header/>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>

		</div> */}
		{/* <Navbar /> */}
		 <Container>
		 <Row>
		   <Col xs={12} sm={6} md={4}>
			<div><h3>Admission</h3></div>
		   </Col>
		   <Col xs={12} sm={6} md={4}>
		   <div><h3>Invoice</h3></div>
		   </Col>
		   <Col xs={12} sm={12} md={4}>
		   <div><h3>Payment</h3></div>
		   </Col>
		 </Row>
	   </Container>
	   </div>
	);
};

export default Main;
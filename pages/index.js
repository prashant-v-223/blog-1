import { useState } from 'react';
import { Header, Layout, Modal, Pagination, Table } from "@/components";

function Landing() {
	const [password, setPassword] = useState(''); // Default password
	const [showForm, setShowForm] = useState(true); // State to control form visibility

	// Function to handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === "123123x123123") {
			setShowForm(!showForm)
		}
	};

	return (
		<Layout>
			<div>
				<h1>Enter Password</h1>
				{showForm ? (
					<form onSubmit={handleSubmit}>
						<label>
							Password:
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>
						<button type="submit">Submit</button>
					</form>
				) : <>
					<Header />
					<Table />
					<Pagination />
					<Modal />
				</>}
			</div>
		</Layout>
	);
}

export default Landing;

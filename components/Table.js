import { useSelector, useDispatch } from "react-redux";
import { PencilSVG, TrashSVG } from "@/icons";
import {
	deleteEmployee,
	fetchEmployees,
	setModalOpen,
	setSelectedEmployee,
} from "@/store";
import { useEffect, useState } from "react";

export function Table() {
	const [currentURL, setCurrentURL] = useState('');

	const state = useSelector((state) => state.employee);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchEmployees());
		setCurrentURL(window.location.href); // Capture current URL on mount
	}, [dispatch]);
	const handleCopy = (url,_id) => {
		navigator.clipboard.writeText(url)
			.then(() => {
				alert('Link copied to clipboard');
			})
			.catch((err) => {
				console.error('Failed to copy: ', err);
			});
	};
	return (
		<table className="table">
			<thead className="table__head">
				<tr>
					<th>Link</th>
					<th>Title</th>
					<th>Address</th>
					<th>Actions</th>
				</tr>
			</thead>

			<tbody className="table__body">
				{state.employeeList.map(({ _id, name, address }) => {
					const link = `${currentURL}play/${_id}`;
					return (
						<tr key={_id}>
							<td style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
								<a href={link}>{link}</a>
								<button onClick={() => handleCopy(link,_id)} className="btn btn__copy">
									Copy
								</button>
							</td>
							<td>{name}</td>
							<td>{address}</td>
							<td>
								<button
									className="btn btn__compact btn__edit"
									onClick={() => {
										dispatch(setSelectedEmployee(_id));
										dispatch(setModalOpen(true));
									}}
								>
									<PencilSVG />
								</button>
								<button
									className="btn btn__compact btn__delete"
									onClick={() => {
										dispatch(deleteEmployee(_id));
									}}
								>
									<TrashSVG />
								</button>
							</td>
						</tr>

					)
				})}
			</tbody>
		</table>
	);
}

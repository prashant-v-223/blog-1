import { useEffect } from "react";
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import cx from "clsx";

import { CheckSVG, CloseSVG } from "@/icons";
import {
	addEmployee,
	setModalOpen,
	setSelectedEmployee,
	updateEmployee,
} from "@/store";

export function Modal() {
	const { register, handleSubmit, errors, reset, setValue } = useForm();

	const state = useSelector((state) => state.employee);

	const dispatch = useDispatch();

	const closeModal = () => {
		reset();
		dispatch(setModalOpen(false));
		dispatch(setSelectedEmployee(undefined));
	};

	const onSubmitHandler = (data) => {
		if (data) {
			closeModal();
		}
		if (state.selectedEmployee) {
			dispatch(
				updateEmployee({
					_id: state.selectedEmployee._id,
					...data,
				})
			);
		} else {
			dispatch(addEmployee(data));
		}
	};

	useEffect(() => {
		if (state.selectedEmployee) {
			setValue("name", state.selectedEmployee.name);
			setValue("email", state.selectedEmployee.email);
			setValue("address", state.selectedEmployee.address);
			setValue("phone", state.selectedEmployee.phone);
		}
	}, [state.selectedEmployee, setValue]);

	return state.isModalOpen
		? ReactDOM.createPortal(
			<div className="modal">
				<div className="modal__content">
					<header className="header modal__header">
						<h1 className="header__h2">
							{state.selectedEmployee ? (
								<>
									Edit <span>Employee</span>
								</>
							) : (
								<>
									Add <span>Employee</span>
								</>
							)}
						</h1>
						<button
							className="btn btn__compact btn__close"
							onClick={closeModal}
						>
							<CloseSVG />
						</button>
					</header>

					<form
						className="form modal__form"
						onSubmit={handleSubmit(onSubmitHandler)}
						noValidate
					>
						<div className="form__element">
							<label
								htmlFor="nameInput"
								className={cx("label", errors.name && "label--error")}
							>
								{errors.name ? (
									"Full name is required!"
								) : (
									<>
										Full name&nbsp;<span className="label__required">*</span>
									</>
								)}
							</label>
							<input
								type="text"
								id="nameInput"
								name="name"
								placeholder="Full name"
								className={cx("input", errors.name && "input--error")}
								ref={register({ required: true })}
							/>
						</div>
						<div className="form__element">
							<label
								htmlFor="addressArea"
								className={cx("label", errors.address && "label--error")}
							>
								{errors.address ? (
									"Address is required!"
								) : (
									<>
										Address&nbsp;<span className="label__required">*</span>
									</>
								)}
							</label>
							<textarea
								type="text"
								id="addressArea"
								name="address"
								placeholder="Address"
								className={cx("area", errors.address && "input--error")}
								ref={register({ required: true })}
							/>
						</div>

						<div className="form__action">
							<button
								className="btn btn__icon btn__cancel"
								type="button"
								onClick={closeModal}
							>
								<CloseSVG /> Cancel
							</button>
							<button className="btn btn__primary btn__icon" type="submit">
								<CheckSVG /> {state.selectedEmployee ? "Update" : "Submit"}
							</button>
						</div>
					</form>
				</div>
			</div>,
			document.body
		)
		: null;
}

import classNames from "classnames";
import React, { useRef } from "react";
import "./Input.styles.scss";
interface InputInterface {
	value: string;
	setValue: (val: string) => void;
	className?: string;
	placeholder?: string;
	type?: "text" | "email" | "password";
	onMouseOver?: (event: Event) => void;
	onMouseOut?: (event: Event) => void;
	onClick?: (event: Event) => void;
	onFocus?: (event: any) => void;
	style: any;
	disabled?: boolean;
	error?: boolean;
	errorText?: string;
	buttonText?: string;
	buttonAction: () => void;
	animatePlaceholder: boolean;
	withoutError: boolean;
}
const Input = ({
	value,
	setValue,
	placeholder = "",
	className = "",
	type = "text",
	onMouseOver = () => {},
	onMouseOut = () => {},
	onClick = () => {},
	onFocus = () => {},
	disabled = false,
	error = false,
	errorText = "",
	buttonText = "",
	buttonAction = () => {},
	animatePlaceholder = false,
	withoutError = false,
}: InputInterface) => {
	const input = useRef();

	return (
		<div className="custom-input-wrapper">
			<div
				className={classNames("custom-input-container", {
					"custom-input-container-error": error,
				})}
			>
				<input
					className="custom-input"
					type={type}
					ref={input.current}
					placeholder={placeholder}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					disabled={disabled}
					onFocus={(e) => onFocus(e)}
				/>
				{placeholder && (
					<div
						className={classNames("custom-input-placeholder", {
							"custom-input-placeholder-static": !!animatePlaceholder,
						})}
					>
						{placeholder}
					</div>
				)}
				{!!buttonText && (
					<a className="custom-input-button" onClick={buttonAction}>
						<div>{buttonText}</div>
					</a>
				)}
			</div>
			{!withoutError && <div className="custom-input-error">{errorText}</div>}
		</div>
	);
};

export default Input;

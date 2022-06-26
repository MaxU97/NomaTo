import classNames from "classnames";
import React, { useRef } from "react";
import "./Input.styles.scss";
interface InputInterface {
	value: string;
	setValue: (val: string) => void;
	className?: string;
	placeholder?: string;
	type?: "text" | "email" | "password";
	onMouseOver?: (event: any) => void;
	onMouseOut?: (event: any) => void;
	onClick?: (event: any) => void;
	onFocus?: (event: any) => void;
	onKeyDown?: (event: any) => void;
	style: any;
	disabled?: boolean;
	error?: boolean;
	errorText?: string;
	buttonText?: string;
	buttonAction: () => void;
	animatePlaceholder: boolean;
	withoutError: boolean;
	showInformation: boolean;
	informationText: string;
	inputRef?: any;
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
	animatePlaceholder = true,
	withoutError = false,
	showInformation = false,
	informationText = "",
	onKeyDown = () => {},
	inputRef,
}: InputInterface) => {
	// const input = useRef();

	return (
		<div className="custom-input-wrapper">
			<div
				className={classNames("custom-input-container", {
					"custom-input-container-error": error,
				})}
				onMouseOver={onMouseOver}
				onMouseOut={onMouseOut}
			>
				<input
					className="custom-input"
					type={type}
					ref={(el) => {
						if (inputRef) inputRef.current = el;
					}}
					placeholder={placeholder}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					disabled={disabled}
					onFocus={(e) => onFocus(e)}
					onKeyDown={(e) => onKeyDown(e)}
				/>
				{placeholder && (
					<div
						className={classNames("custom-input-placeholder", {
							"custom-input-placeholder-static": !animatePlaceholder,
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
			{!withoutError &&
				(showInformation ? (
					<div className="custom-input-information">{informationText}</div>
				) : (
					<div className="custom-input-error">{error && errorText}</div>
				))}
		</div>
	);
};

export default Input;

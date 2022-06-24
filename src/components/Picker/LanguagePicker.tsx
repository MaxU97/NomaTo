import classNames from "classnames";
import React from "react";
import "./Picker.styles.scss";
const LanguagePicker = ({
	languages,
	placeholder,
	selectedValues,
	onDelete,
	onSelect,
	error,
	errorText,
}) => {
	const toggleSelect = (e, lang) => {
		if (selectedValues.includes(lang)) {
			onDelete(e, lang);
		} else {
			onSelect(e, lang);
		}
	};
	return (
		<>
			<div
				className={classNames("custom-picker", {
					"custom-picker-error": error,
				})}
			>
				{languages.map((lang: string, key: number) => (
					<div
						className={classNames("custom-picker-item", {
							"custom-picker-item-selected": selectedValues.includes(lang),
						})}
						key={key}
						onClick={(e) => toggleSelect(e, lang)}
					>
						<div className="custom-picker-item-circle"></div>
						{lang}
					</div>
				))}
				<div className="custom-picker-placeholder">{placeholder}</div>
			</div>
			<div className="custom-picker-error-message">{error && errorText}</div>
		</>
	);
};
export default LanguagePicker;

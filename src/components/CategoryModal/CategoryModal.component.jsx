import React, { useState } from "react";
import Modal from "../Modal/Modal.component";
import { useUtilityContext } from "../../context/utility";
import { useTranslation } from "react-i18next";
import { MoveIcon } from "../../assets/Icons";
import { apiUrl } from "../../api/config";
import "./catmodal.scss";
import { getCurrentLanguage } from "../../services/language.service";
const CategoryModal = ({
	modalOpen,
	toggleModal,
	style,
	title = "Categories",
	setCategory = () => {},
	setSubCategory = () => {},
}) => {
	const { state } = useUtilityContext();
	const categories = state.categories;

	const titleLanguage = `title${getCurrentLanguage().toUpperCase()}`;

	const { t } = useTranslation();
	const [selectedCat, setSelectedCat] = useState(false);

	return (
		<Modal modalOpen={modalOpen} toggleModal={toggleModal} style={style}>
			<div className="cat-modal">
				<h1>{title}</h1>
				{!!selectedCat ? (
					<div className="categories-sub">
						<a
							className="back-button"
							onClick={() => {
								setSelectedCat(false);
							}}
						>
							<MoveIcon className="move-left-icon" />
						</a>
						<hr></hr>
						{selectedCat.subcats.map((sub, index) => (
							<div key={`cat-${index}`}>
								<div
									className="categories-sub-cat"
									onClick={() => {
										setSelectedCat(false);
										setCategory(selectedCat);
										setSubCategory(sub);
										toggleModal(false);
									}}
								>
									<img src={`${apiUrl + "/" + selectedCat.imageURL}`}></img>
									<h4>{sub[titleLanguage]}</h4>
								</div>
								<hr></hr>
							</div>
						))}
					</div>
				) : (
					<div className="categories">
						{categories.map((cat, index) => (
							<div
								key={`cat-${index}`}
								className="category"
								onClick={() => {
									setSelectedCat(cat);
									if (cat.subcats.length == 0) {
										setSelectedCat(false);
										setCategory(cat);
										setSubCategory("");
										toggleModal(false);
									}
								}}
							>
								<img src={`${apiUrl + "/" + cat.imageURL}`}></img>
								<h3>{cat[titleLanguage]}</h3>
							</div>
						))}
					</div>
				)}
			</div>
		</Modal>
	);
};

export default CategoryModal;

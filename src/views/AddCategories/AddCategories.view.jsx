import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ImagePicker from "../../components/ImagePicker/ImagePicker.component";
import Input from "../../components/Input/Input.component";
import classNames from "classnames";
import "./addcategories.scss";
import { CSSTransition } from "react-transition-group";
import {
  CloseIcon,
  MinusIcon,
  MoveIcon,
  PlusIcon,
  SpinnerAnimationIcon,
  SpinnerIcon,
  TrashIcon,
} from "../../assets/Icons";
import {
  checkCategoryDependancies,
  checkExistingCategory,
  createCategory,
  deleteCategory,
} from "../../api/utility";
import { apiUrl } from "../../api/config";
import { useUtilityContext } from "../../context/utility";
import { set } from "lodash";
import { useNotificationHandler } from "../../components/NotificationHandler/NotificationHandler.component";
import useWindowDimensions, {
  useIntersection,
  useScrollDirection,
} from "../../services/responsive.service";
import { usePromptHandler } from "../../components/Prompt/Prompt.component";
import { getCurrentLanguage } from "../../services/language.service";

const AddCategories = () => {
  const { prompt } = usePromptHandler();
  const { isMobile } = useWindowDimensions();
  const [editType, setEditType] = useState(false);
  const { notification } = useNotificationHandler();
  const {
    state: utilityState,
    ADD_CATEGORY,
    GET_CAT,
    DELETE_CATEGORY,
  } = useUtilityContext();
  const titleLanguage = `title${getCurrentLanguage().toUpperCase()}`;
  const { t } = useTranslation();

  const [deletedSubcats, setDeletedSubcats] = useState([]);
  const [titleRU, setTitleRU] = useState();
  const [titleEN, setTitleEN] = useState();
  const [titleLV, setTitleLV] = useState();
  const [subcats, setSubcats] = useState([]);
  const errors = {};
  const [isLoading, setIsLoading] = useState(false);

  const [titleError, setTitleError] = useState();
  const [image, setImage] = useState([]);
  const [subcatErrors, setSubcatErrors] = useState([]);
  const [subcatError, setSubcatError] = useState("");
  const [imageError, setImageError] = useState("");

  const [existingDependancies, setExistingDependancies] = useState(false);

  useEffect(async () => {
    await GET_CAT();
  }, []);

  const resetFields = () => {
    setTitleRU("");
    setTitleEN("");
    setTitleLV("");
    setSubcats([]);
    setTitleError("");
    setImage([]);
    setSubcatErrors([]);
    setSubcatError("");
    setImageError("");
    setExistingDependancies(false);
  };
  useEffect(() => {
    const prepareForm = async () => {
      if (editType) {
        if (!(editType === "new")) {
          const dependancies = await checkCategoryDependancies(editType._id);
          setExistingDependancies(dependancies);
          setTitleRU(editType.titleRU);
          setTitleEN(editType.titleEN);
          setTitleLV(editType.titleLV);
          let subErrors = [];
          editType.subcats.forEach((sub) => {
            subErrors.push({ error: false });
          });
          setSubcatErrors(subErrors);
          setSubcats(editType.subcats);
          setImage([apiUrl + "/" + editType.imageURL]);
        }
      }
    };
    prepareForm();
  }, [editType]);

  const addCategory = () => {
    setSubcats([...subcats, { titleRU: "", titleLV: "", titleEN: "" }]);
    setSubcatErrors([...subcatErrors, { error: false }]);
  };

  const setSubTitleEN = (event, index) => {
    let newArray = subcats;
    newArray[index].titleEN = event;
    setSubcats([...newArray]);
  };
  const setSubTitleRU = (event, index) => {
    let newArray = subcats;
    newArray[index].titleRU = event;
    setSubcats([...newArray]);
  };
  const setSubTitleLV = (event, index) => {
    let newArray = subcats;
    newArray[index].titleLV = event;
    setSubcats([...newArray]);
  };

  const setCatEN = (event) => {
    setTitleEN(event);

    resetCategories();
  };
  const setCatRU = (event) => {
    setTitleRU(event);
    resetCategories();
  };
  const setCatLV = (event) => {
    setTitleLV(event);
    resetCategories();
  };

  const removeSubcat = (index) => {
    if ("_id" in subcats[index]) {
      setDeletedSubcats([...deletedSubcats, subcats[index]._id]);
    }
    let newArray = subcats;
    newArray.splice(index, 1);
    setSubcats([...newArray]);
  };

  const resetSubcat = (index) => {
    if (subcatErrors[index].error) {
      Object.values(subcats[index]).every((title) => {
        if (!!!title) {
          var newSubcatErrors = subcatErrors;
          newSubcatErrors[index].error = true;
          setSubcatErrors(newSubcatErrors);
          setSubcatError(t("add-category.fill-highlighted"));
          return false;
        } else {
          var newSubcatErrors = subcatErrors;
          newSubcatErrors[index].error = false;
          setSubcatErrors(newSubcatErrors);
          setSubcatError("");
          return true;
        }
      });
    }
  };

  const resetCategories = () => {
    if (titleError) {
      if (!!!titleRU || !!!titleEN || !!!titleLV) {
        setTitleError(t("add-category.fill-in"));
      } else {
        setTitleError("");
      }
    }
  };
  const validateFields = async (onSend = true) => {
    let error = false;

    if (!!!titleRU || !!!titleEN || !!!titleLV) {
      setTitleError(t("add-category.fill-in"));
      error = true;
    } else {
      if (editType === "new") {
        const exists = await checkExistingCategory({
          titleRU,
          titleEN,
          titleLV,
        });
        if (exists) {
          setTitleError(t("add-category.exists"));
          error = true;
        }
      }
    }

    subcats.map((subcat, index) => {
      const titles = [subcat.titleEN, subcat.titleRU, subcat.titleLV];
      titles.every((title) => {
        if (!!!title) {
          var newSubcatErrors = subcatErrors;
          newSubcatErrors[index].error = true;
          setSubcatErrors(newSubcatErrors);
          setSubcatError(t("add-category.fill-highlighted"));
          error = true;
          return false;
        } else {
          var newSubcatErrors = subcatErrors;
          newSubcatErrors[index].error = false;
          setSubcatErrors(newSubcatErrors);
          setSubcatError("");
          return true;
        }
      });
    });
    if (image.length == 0) {
      setImageError(t("add-category.include-an-image"));
      error = true;
    }
    return error;
  };

  const submitCategory = () => {
    const send = async () => {
      setIsLoading(true);

      const error = await validateFields();

      if (!error) {
        let promises = [];
        image.forEach((blob) => {
          if (blob.includes("blob")) {
            promises.push(fetch(blob).then((r) => r.blob()));
          }
        });
        Promise.all(promises).then(async (results) => {
          let data = new FormData();
          if (results.length > 0) {
            data.append(
              "image",
              new File([results[0]], Date.now(), {
                type: results[0].type,
              })
            );
          }
          data.append("titleRU", titleRU);
          data.append("titleEN", titleEN);
          data.append("titleLV", titleLV);
          data.append("subcats", JSON.stringify(subcats));

          if (deletedSubcats.length > 0) {
            data.append("deletedSubcats", JSON.stringify(deletedSubcats));
          }
          if (editType !== "new") {
            if ("_id" in editType) {
              data.append("_id", editType._id);
            }
          }

          try {
            const res = await ADD_CATEGORY(data);
            if (res) {
              setIsLoading(false);
              window.location.reload();
            } else {
              setIsLoading(false);
            }
          } catch (err) {
            setIsLoading(false);
            notification([err.message], true);
          }
        });
      } else {
        setIsLoading(false);
      }
    };
    send();
  };
  const onSelectIcon = (e) => {
    e.preventDefault();
    var newImage;
    if (e.target.files) {
      newImage = URL.createObjectURL(e.target.files[0]);
    } else {
      return;
    }
    if (imageError) {
      setImageError("");
    }
    setImage([newImage]);
  };

  const deleteCat = async (id) => {
    try {
      await DELETE_CATEGORY(id);
      window.location.reload();
    } catch (err) {
      notification([err.message], true);
    }
  };

  return (
    <div className="add-category">
      <div
        className="container-m"
        style={{ paddingTop: "140px", paddingBottom: "0px" }}
      >
        <div className="category-form">
          {!editType ? (
            <>
              <h1>{t("add-category.edit-categories")}</h1>
              <div className="category-form-types">
                {utilityState.categories &&
                  utilityState.categories.map((cat) => (
                    <div
                      className="category-form-types-type"
                      onClick={() => {
                        setEditType(cat);
                      }}
                    >
                      <img src={`${apiUrl + "/" + cat.imageURL}`}></img>
                      <h3>{cat[titleLanguage]}</h3>
                    </div>
                  ))}
                <div
                  className="category-form-types-type"
                  onClick={() => {
                    setEditType("new");
                  }}
                >
                  <PlusIcon />
                  <h3>{t("add-category.new-cat")}</h3>
                </div>
              </div>
            </>
          ) : (
            <>
              <a
                className="back-button"
                onClick={() => {
                  setEditType(false);
                  resetFields();
                }}
              >
                <MoveIcon className="move-left-icon" />
              </a>
              {editType != "new" && !existingDependancies && (
                <TrashIcon
                  className="delete-category"
                  onClick={async () => {
                    debugger;
                    prompt(
                      t("add-category.delete-prompt", {
                        category_title: editType[titleLanguage],
                      }),
                      t("utility.prompt.irreversible"),
                      async () => {
                        await deleteCat(editType._id);
                        setEditType(false);
                      }
                    );
                  }}
                ></TrashIcon>
              )}
              <h1>
                {editType == "new"
                  ? t("add-category.add-category")
                  : t("add-category.edit-category")}
              </h1>
              <div className="category-form-field-center">
                <ImagePicker
                  buttonClassName="category-form-icon-picker"
                  onClick={() => {
                    document.getElementById("selectedFile").click();
                  }}
                  image={image[0]}
                  imageList={image}
                  setImages={setImage}
                  showLegend={false}
                >
                  <CSSTransition
                    in={imageError}
                    timeout={500}
                    unmountOnExit
                    classNames="error-container"
                  >
                    <div className="hover-error">
                      <div className="hover-error-content m">
                        {imageError}
                        <div class="arrow-right"></div>
                      </div>
                    </div>
                  </CSSTransition>
                </ImagePicker>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onSelectIcon}
                  id="selectedFile"
                  style={{ display: "none" }}
                />
              </div>

              <div className="category-form-field">
                <CSSTransition
                  in={titleError}
                  timeout={500}
                  unmountOnExit
                  classNames="error-container"
                >
                  <div className="hover-error">
                    <div className="hover-error-content m">
                      {titleError}
                      <div class="arrow-right"></div>
                    </div>
                  </div>
                </CSSTransition>
                <Input
                  placeholder={t("add-category.title-EN")}
                  className={classNames("category-form-input")}
                  value={titleEN}
                  setValue={setCatEN}
                  withoutError={true}
                  error={titleError}
                ></Input>
                <Input
                  placeholder={t(t("add-category.title-RU"))}
                  className={classNames("category-form-input")}
                  value={titleRU}
                  setValue={setCatRU}
                  withoutError={true}
                  error={titleError}
                ></Input>
                <Input
                  placeholder={t("add-category.title-LV")}
                  className={classNames("category-form-input")}
                  value={titleLV}
                  setValue={setCatLV}
                  withoutError={true}
                  error={titleError}
                ></Input>
              </div>
              <h2>{t("add-category.subcats")}:</h2>
              <div className={classNames("category-form-subcats")}>
                <CSSTransition
                  in={subcatError}
                  timeout={500}
                  unmountOnExit
                  classNames="error-container"
                >
                  <div className="hover-error">
                    <div className="hover-error-content m">
                      {subcatError}
                      <div class="arrow-right"></div>
                    </div>
                  </div>
                </CSSTransition>
                <PlusIcon
                  className="add-subcat"
                  onClick={addCategory}
                ></PlusIcon>
                <div
                  className={classNames(
                    "category-form-subcats-scroll",
                    subcatError && "error"
                  )}
                >
                  <div className="category-form-subcats-container">
                    {subcats.map((subcat, index) => (
                      <div className="category-form-subcats-subcat">
                        <MinusIcon
                          className="delete-subcat"
                          onClick={() => {
                            removeSubcat(index);
                          }}
                        ></MinusIcon>
                        <Input
                          placeholder={t("add-category.title-EN")}
                          value={subcat.titleEN}
                          setValue={(event) => {
                            setSubTitleEN(event, index);
                            resetSubcat(index);
                          }}
                          withoutError={true}
                          error={subcatErrors[index].error}
                          // containerClass={classNames(
                          //    && "error"
                          // )}
                        ></Input>
                        <Input
                          placeholder={t(t("add-category.title-RU"))}
                          value={subcat.titleRU}
                          setValue={(event) => {
                            setSubTitleRU(event, index);
                            resetSubcat(index);
                          }}
                          withoutError={true}
                          error={subcatErrors[index].error}
                          // containerClass={classNames(
                          //   subcatErrors[index].error && "error"
                          // )}
                        ></Input>
                        <Input
                          placeholder={t("add-category.title-LV")}
                          value={subcat.titleLV}
                          setValue={(event) => {
                            setSubTitleLV(event, index);
                            resetSubcat(index);
                          }}
                          error={subcatErrors[index].error}
                          withoutError={true}
                          // containerClass={classNames(
                          //   subcatErrors[index].error && "error"
                          // )}
                        ></Input>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={classNames(
                  "category-form-submit",
                  isLoading && "disabled"
                )}
                onClick={submitCategory}
              >
                {isLoading ? (
                  <>
                    <SpinnerIcon className="category-form-loading" />
                    {t("add-category.loading")}
                  </>
                ) : editType == "new" ? (
                  t("add-category.add")
                ) : (
                  t("add-category.save-changes")
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
{
}

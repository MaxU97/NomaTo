import Flag from "react-world-flags";
import { ReactComponent as MoveIcon } from "./move-icon.svg";
import { ReactComponent as CloseIcon } from "./close-icon.svg";
import { ReactComponent as StarIcon } from "./star.svg";
import { ReactComponent as DownIcon } from "./down-icon.svg";
import { ReactComponent as ProfileIcon } from "./profile-icon.svg";
import { ReactComponent as PlusIcon } from "./plus.svg";
import { ReactComponent as RotatingArrowIcon } from "./rotating-arrow.svg";
import { ReactComponent as CheckIcon } from "./check-mark.svg";
import { ReactComponent as TrashIcon } from "./trash-icon.svg";
import { ReactComponent as CrownIcon } from "./crown.svg";
import { ReactComponent as ThumbUpIcon } from "./thumb-up.svg";
import { ReactComponent as ThumbDownIcon } from "./thumb-down.svg";
import { ReactComponent as SpinnerIcon } from "./spinner.svg";
import { ReactComponent as DefaultCardIcon } from "./card-default2.svg";
import { ReactComponent as VisaCardIcon } from "./visa-card.svg";
import { ReactComponent as MinusIcon } from "./minus-icon.svg";
import { ReactComponent as PencilIcon } from "./pencil-icon.svg";
import { ReactComponent as EyeOpenIcon } from "./eye-open-icon.svg";
import { ReactComponent as EyeClosedIcon } from "./eye-closed-icon.svg";
import { ReactComponent as MenuIcon } from "./menu-3line.svg";
import { ReactComponent as SmileyIcon } from "./smiley.svg";
import { ReactComponent as QuestionIconCircle } from "./question-circle.svg";
import { ReactComponent as QuestionIcon } from "./question-icon.svg";
import { ReactComponent as OptionsIcon } from "./options-icon.svg";
import { ReactComponent as ConfusedSmileyIcon } from "./confused-smiley.svg";
import EnFlagIcon from "./fl-en.png";
import LvFlagIcon from "./fl-lv.png";
import RuFlagIcon from "./fl-ru.png";
import "./icons.scss";

export const SpinnerAnimationIcon = ({ scale, style = "" }) => {
  return (
    <div
      className="lds-default"
      style={{
        transform: `scale(${scale})`,
        ...{ alignSelf: "center", justifySelf: "center" },
      }}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export {
  MenuIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  PencilIcon,
  MoveIcon,
  CloseIcon,
  StarIcon,
  DownIcon,
  ProfileIcon,
  RuFlagIcon,
  LvFlagIcon,
  EnFlagIcon,
  PlusIcon,
  RotatingArrowIcon,
  CheckIcon,
  TrashIcon,
  CrownIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  SpinnerIcon,
  DefaultCardIcon,
  VisaCardIcon,
  MinusIcon,
  SmileyIcon,
  QuestionIcon,
  QuestionIconCircle,
  OptionsIcon,
  ConfusedSmileyIcon,
};

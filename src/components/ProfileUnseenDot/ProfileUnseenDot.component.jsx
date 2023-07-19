import classNames from "classnames";
import "./profileunseendot.scss";

const ProfileUnseenDot = ({ isPulsing, isOrange }) => {
    return (<div className={classNames(
        "profile-unseen-dot", 
        { "profile-unseen-dot--pulse": isPulsing, "profile-unseen-dot--orange": isOrange }
        )}></div>)
};

export default ProfileUnseenDot;
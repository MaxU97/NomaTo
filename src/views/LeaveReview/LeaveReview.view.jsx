import LeaveReviewForm from "../../components/LeaveReview/LeaveReviewForm.component,";
import { useParams, useLocation } from "react-router-dom";
import useWindowDimensions from "../../services/responsive.service";
const LeaveReview = () => {
  const isMobile = useWindowDimensions();
  const { id } = useParams();
  const containerStyle = isMobile
    ? {}
    : {
        border: "1px solid #e0e0e0",
        borderRadius: "15px",
        padding: "20px",
      };
  return (
    <div className="container-s" style={{ paddingTop: "100px" }}>
      <div className="leave-review-container" style={containerStyle}>
        <LeaveReviewForm id={id}></LeaveReviewForm>
      </div>
    </div>
  );
};

export default LeaveReview;

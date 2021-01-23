const SubReviewBox = ({ reviews }) => {
  const total_reviews = () => {
    let sum = reviews.reduce((a, b) => a + (b["value"] || 0), 0);
    return sum / reviews.length;
  };
  const reviewsText = () => {
    if (total_reviews > 4.49) {
      return "Superb";
    }
    if (total_reviews > 3.99 && total_reviews < 4.5) {
      return "Very Good";
    }
    if (total_reviews > 3.49 && total_reviews < 4.0) {
      return "Good";
    }
    if (total_reviews > 2.49 && total_reviews < 3.5) {
      return "Average";
    }
    if (total_reviews < 2.5) {
      return "Low";
    }
  };
  return (
    <li>
      <div className="score">
        <span>
          {reviewsText}
          <em>{reviews.length} Reviews</em>
        </span>
        <strong>{total_reviews}</strong>
      </div>
    </li>
  );
};
export default SubReviewBox;

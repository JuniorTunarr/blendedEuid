function ReviewItems({ currentIndex, reviews }) {
  return (
    <ul className="carousel__slider">
      {reviews?.items?.slice(currentIndex, currentIndex + 4).map((review) => (
        <li key={review.id} className="react-multi-carousel-item">
          <div className="carousel__item">
            <div className="carousel__item--wrapper">
              <figure className="star-rating">
                {Array.from({ length: review.star }, (_, index) => (
                  <img
                    key={index}
                    src="/assets/starFill.svg"
                    alt="채워진별"
                    width={29}
                    height={27}
                  />
                ))}
                {Array.from({ length: 5 - review.star }, (_, index) => (
                  <img
                    key={index}
                    src="/assets/starNonFill.svg"
                    alt="안채워진별"
                    width={29}
                    height={27}
                  />
                ))}
              </figure>
              <h3 className="carousel__item--title">{review.title}</h3>
              <blockquote className="carousel__item--quotation">
                <p className="carousel__item--comment"> {review.description}</p>
                <cite className="carousel__item--reviewer">
                  {review.writer}
                </cite>
              </blockquote>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ReviewItems;

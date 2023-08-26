import { useState } from "react";
import SubTitleWrapper from "@/components/Common/SubTitleWrapper";
import ReviewItems from "./ReviewItems";
import { useEffect } from "react";
import Spinner from "@/components/Common/Spinner";

function Review() {
  const [reviews, setReviews] = useState(null);
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setStatus("loading");

    fetch(
      "https://blended-euid.pockethost.io/api/collections/Reviews/records",
      { signal }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setStatus("success");
        setReviews(responseData);
      })
      .catch((error) => {
        if (!(error instanceof DOMException)) {
          setStatus("error");
          setError(error);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);
  if (status === "loading") {
    return <Spinner size={160} title="데이터 가져오는 중이에요." />;
  }
  if (status === "error") {
    return (
      <div role="alert">
        <h2>{error.type}</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  const handlePreviousClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < (reviews?.items?.length || 0) - 4) {
      setCurrentIndex(currentIndex + 4);
    }
  };
  return (
    <div className="review">
      <SubTitleWrapper
        id="review"
        title="리뷰"
        contents="'이듬' 블렌디드 러닝 강의 수강생의 강의 리뷰입니다. 강의 장/단점에 대한 의견을 남겨주셨습니다."
      />
      <div className="review-carousel">
        <ReviewItems currentIndex={currentIndex} reviews={reviews} />
        {currentIndex > 0 && (
          <button
            type="button"
            className="carousel-control left-1 absolute w-[2.625rem] h-[1.9375rem] rotate-180 bottom-0 -translate-y-1/2"
            aria-label="이전 보기"
            onClick={handlePreviousClick}
            style={{
              background:
                "url(/assets/carouselControl.svg) center/cover no-repeat",
            }}
          />
        )}
        {currentIndex + 4 < (reviews?.items?.length || 0) && (
          <button
            type="button"
            className="carousel-control right-5 absolute  w-[2.625rem]  h-[1.9375rem] bottom-0 -translate-y-1/6"
            aria-label="다음 보기"
            onClick={handleNextClick}
            style={{
              background:
                "url(/assets/carouselControl.svg) center/cover no-repeat",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Review;

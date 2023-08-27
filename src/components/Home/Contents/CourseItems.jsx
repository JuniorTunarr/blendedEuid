import { useEffect, useState } from "react";
import Spinner from "@/components/Common/Spinner";
import CarouselArrow from "/assets/carouselArrow.svg";
import Carousel1 from "/assets/carousel1.svg";
import Carousel2 from "/assets/carousel2.svg";
import Carousel3 from "/assets/carousel3.svg";
import Carousel4 from "/assets/carousel4.svg";
function CourseItems() {
  const [courses, setCourses] = useState(null);
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState(null);
  const carouselImages = [Carousel1, Carousel2, Carousel3, Carousel4];
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setStatus("loading");

    fetch(
      "https://blended-euid.pockethost.io/api/collections/courses/records",
      { signal }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setStatus("success");
        setCourses(responseData);
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

  return (
    <ul className="react-multi-carousel-track carousel__slider">
      {courses?.items?.map((course) => (
        <li
          className="react-multi-carousel-item react-multi-carousel-item--active carousel__slide"
          key={course.id}
        >
          <div className="carousel__item type-course">
            <div className="carousel__item--wrapper">
              <a className="carousel__item--link" href="">
                <h3 className="carousel__title">{course.title}</h3>
                <img
                  className="carousel__item--image"
                  src={carouselImages[course.index % carouselImages.length]}
                  alt={course.title}
                />
                <p className="carousel__item--tags">
                  {course.tags.map((tag, index) => (
                    <span key={index} className="carousel__item--tag">
                      {tag}
                    </span>
                  ))}
                </p>
                <img
                  src={CarouselArrow}
                  alt="바로가기 화살표"
                  className="tracking-[-0.02em] select-none w-[16] h-[16] box-border opacity-100 absolute right-5 bottom-[22px]"
                />
              </a>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CourseItems;

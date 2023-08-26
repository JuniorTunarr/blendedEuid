import { useEffect, useState } from "react";
import Spinner from "@/components/Common/Spinner";

function CourseItems() {
  const [courses, setCourses] = useState(null);
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState(null);

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
                  src={`/assets/carousel${course.index}.svg`}
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
                  src="/assets/carouselArrow.svg"
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

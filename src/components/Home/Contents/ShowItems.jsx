import { useEffect } from "react";
import { useState } from "react";
import Spinner from "@/components/Common/Spinner";

function ShowItems() {
  const [showCases, setShowCases] = useState(null);
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setStatus("loading");

    fetch(
      "https://blended-euid.pockethost.io/api/collections/Showcases/records",
      { signal }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setStatus("success");
        setShowCases(responseData);
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
    <ul className="react-multi-carousel-track">
      {showCases?.items?.map((caseItem) => (
        <li key={caseItem.id} className="react-multi-carousel-item">
          <div
            className="carousel__item"
            style={{
              background: `
                linear-gradient(rgba(255, 255, 255, 0) 20%, rgba(38, 43, 66, 0.55) 55%),
                url(/assets/showcase${caseItem.index}.jpg) center center / cover no-repeat`,
            }}
          >
            <div className="carousel__item--wrapper">
              <a href="" className="carousel__item--link">
                <h3 className="carousel__item--title">{caseItem.title}</h3>
                <p className="carousel__item--description">
                  {caseItem.description}
                </p>
                <img
                  src="/assets/carouselArrow1.svg"
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

export default ShowItems;

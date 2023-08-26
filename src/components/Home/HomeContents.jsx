import OpeningDay from "./Contents/OpeningDay";
import LectureHall from "./Contents/LectureHall";
import CourseCategory from "./Contents/CourseCategory";
import ShowCase from "./Contents/ShowCase";
import Review from "./Contents/Review";

const HomeContents = () => {
  return (
    <div
      id="homeContainer"
      className="grid-layout tracking-[-0.02em] select-none box-border grid grid-rows-[458px_368px_370px_410px] grid-cols-[380px_1fr_1fr] gap-5 max-w-[1180px] mt-[60px] mx-auto"
    >
      <OpeningDay />
      <LectureHall />
      <CourseCategory />
      <ShowCase />
      <Review />
    </div>
  );
};

export default HomeContents;

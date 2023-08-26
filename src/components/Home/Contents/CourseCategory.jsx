import SubTitleWrapper from "../../Common/SubTitleWrapper";
import CourseItems from "./CourseItems";

function CourseCategory() {
  return (
    <div className="courseCategory">
      <SubTitleWrapper
        id="courseCategory"
        title="강의 카테고리"
        contents="'이듬' 블렌디드 러닝 카테고리의 각 카드를 선택하면 강의에 대한 상세 정보를 개별 페이지에서 확인할 수 있습니다."
      />
      <div className="react-multi-carousel-list carousel course-carousel">
        <CourseItems />
      </div>
    </div>
  );
}

export default CourseCategory;

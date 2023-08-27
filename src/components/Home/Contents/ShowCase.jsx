import SubTitleWrapper from "@/components/Common/SubTitleWrapper";
import ShowItems from "./ShowItems";

function ShowCase() {
  return (
    <div className="showCase">
      <SubTitleWrapper
        id="showCase"
        title="쇼케이스"
        contents="'이듬' 블렌디드 러닝 강의 실습 결과물 쇼케이스입니다. 각 카드를 선택하면 결과물을 볼 수 있습니다."
      />
      <div className="react-multi-carousel-list">
        <ShowItems />
      </div>
    </div>
  );
}

export default ShowCase;

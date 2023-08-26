import { useEffect } from "react";

import SubTitleWrapper from "../../Common/SubTitleWrapper";

function LectureHall() {
  useEffect(() => {
    let mapContainer = document.getElementById("map"), //? 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.5485385, 127.06038), //? 지도의 중심좌표
        level: 3, //? 지도의 확대 레벨
      };

    let map = new kakao.maps.Map(mapContainer, mapOption); //? 지도를 생성합니다
    // 주소-좌표 변환 객체를 생성합니다
    let geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(
      "서울시 성동구 광나루로 275",
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          let marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          let infowindow = new kakao.maps.InfoWindow({
            content:
              '<a style="width:150px; padding:6px 0; border-radius:10px;white-space: nowrap; line-height: normal; background-color: transparent; box-sizing: border-box; color: #333; text-decoration: none;" href="https://map.kakao.com/?from=roughmap&eName=소시오비즈니스센터&eX=513344.0&eY=1124725.0"> <span style="text-align: center; white-space: nowrap; box-sizing: border-box; display: block; position: relative; z-index: 10; border-radius: 3px; font-weight: 600; line-height: 15px; background-color: #fff; color: #000; padding: 6px 8px 5px; font-size: 12px;">소시오비즈니스센터</span></a>',
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      }
    );

    //@ 지도에 컨트롤 표시
    //? 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, []);
  return (
    <div className="flex-col lectureHall">
      <SubTitleWrapper
        id="lectureHall"
        title="강의장"
        contents="서울 성동구 광나루로 275 금용빌딩 3층 이듬(EUID) 성수역 2번 출구 (도보 약 10분, )"
      ></SubTitleWrapper>
      <div id="map" style={{ width: "380px", height: "282px" }}></div>
    </div>
  );
}

export default LectureHall;

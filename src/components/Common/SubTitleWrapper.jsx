function SubTitleWrapper({ id, title, contents }) {
  return (
    <div className="wrapper">
      <section
        id={id}
        className="headline tracking-[-0.02em] select-none box-border;"
      >
        <h2 className="subTitleHeading tracking-[-0.02em] select-none box-border text-xl leading-none text-[#373e6a] mt-0 font-bold">
          {title}
        </h2>
        <p className="tracking-[-0.02em] select-none box-border text-[0.84375rem] leading-[1.54] text-[#6c6c6c] my-3">
          {contents}
        </p>
        {id === "openingDay" ? (
          <figure className="openingDay tracking-[-0.02em] select-none box-border relative m-0 w-[23.75rem] h-[22.8125rem]">
            <a className="tracking-[-0.02em] select-none bg-transparent box-border overflow-hidden block h-[22.8125rem] transition-all duration-[0.4s] ease-[cubic-bezier(.175,0.885,0.32,1.275)] no-underline text-[#5382f6] rounded-[10px]">
              <img
                src="/assets/openingDay.jpg"
                alt="오프닝 데이"
                className="tracking-[-0.02em] select-none text-[#5382f6] aspect-[auto_335_/_274] box-border w-full h-auto relative z-[-1] rounded-[10px] border-none"
              />
              <figcaption
                aria-label="2023년 09월 26일"
                title="2023년 09월 26일"
                className="tracking-[-0.02em] select-none box-border absolute leading-[1.12] font-light text-justify text-[#4a5960] text-3xl left-[22px] top-[22px]"
              >
                2023
                <br />
                <b className>0926</b>
              </figcaption>
              <img
                src="/assets/topLeftArrow.svg"
                alt="바로가기 화살표"
                className="tracking-[-0.02em] select-none w-[16] h-[16] box-border opacity-100 absolute right-5 bottom-[22px]"
              />
            </a>
          </figure>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}

export default SubTitleWrapper;

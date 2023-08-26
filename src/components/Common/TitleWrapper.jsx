function TitleWrapper() {
  return (
    <div
      id="homWrapper"
      className="tracking-[-0.02em] select-none box-border w-full max-w-[1180px] mx-auto px-0 py-5"
    >
      <h1
        id="motto"
        className="box-border select-none relative font-normal leading-[1.1] tracking-[-0.01em] text-[#373e6a] transition-all duration-[0.4s] ease-[cubic-bezier(1,0,0,1)] text-[6.25rem] mt-5 mb-0 mx-0"
      >
        <span className="select-none font-normal leading-[1.1] tracking-[-0.01em] text-[#373e6a] text-[6.25rem] box-border inline-block mr-4">
          User Interface
        </span>
        <br />
        <span className="select-none font-normal leading-[1.1] tracking-[-0.01em] text-[#373e6a] text-[6.25rem] box-border inline-block mr-4">
          <span>Develop</span>
          <span className="leading-[1.1] tracking-[-0.01em] text-[#373e6a] text-[6.25rem] box-border absolute h-0.5 transition-all duration-[0.45s] ease-/[cubic-bezier(1,0,0,1)] w-[740px] right-[15px] top-[60%]"></span>
        </span>
      </h1>
    </div>
  );
}

export default TitleWrapper;

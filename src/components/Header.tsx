const Header = () => {
  // Destructuring logo data
  const logoData = [
    { name: "Tesla", src: "/assets/images/logos/TESLA.svg" },
    { name: "Libra", src: "/assets/images/logos/Libra 2.svg" },
    { name: "Binance", src: "/assets/images/logos/Binance logo.svg" },
    { name: "Facebook", src: "/assets/images/logos/Facebook 7.svg" },
    { name: "Microsoft", src: "/assets/images/logos/Microsoft 6.svg" },
  ];

  // Destructuring statistics data
  const statisticsData = [
    { label: "Comfortable Space", value: "580M+" },
    { label: "Startups Succeed", value: "98%" },
    { label: "Countries", value: "90+" },
    { label: "Supportive Events", value: "139M+" },
  ];

  return (
    <>
      <section
        id="Hero-Banner"
        className="relative flex h-[720px] md:h-[600px] sm:h-[500px] max-[639px]:h-[450px] -mb-[93px] md:-mb-[70px] sm:-mb-[50px] max-[639px]:-mb-[40px]"
      >
        <div
          id="Hero-Text"
          className="relative flex flex-col w-full max-w-[650px] md:max-w-[500px] sm:max-w-full h-fit rounded-[30px] md:rounded-[25px] sm:rounded-[20px] max-[639px]:rounded-[15px] border border-[#E0DEF7] p-10 md:p-8 sm:p-6 max-[639px]:p-4 gap-[30px] md:gap-6 sm:gap-4 max-[639px]:gap-3 bg-white mt-[70px] md:mt-[60px] sm:mt-[40px] max-[639px]:mt-[140px] ml-[calc((100%-1130px)/2)] lg:ml-[calc((100%-1130px)/2)] md:ml-8 sm:ml-4 max-[639px]:mx-3 z-10"
        >
          <div className="flex items-center w-fit rounded-full py-2 px-4 sm:py-1 sm:px-3 max-[639px]:py-1 max-[639px]:px-2 gap-[10px] sm:gap-2 max-[639px]:gap-1.5 bg-[#000929]">
            <img
              src="/assets/images/icons/crown-white.svg"
              className="w-5 h-5 sm:w-4 sm:h-4 max-[639px]:w-3 max-[639px]:h-3"
              alt="icon"
            />
            <span className="font-semibold text-white text-sm sm:text-xs max-[639px]:text-[10px]">
              We've won top productivity 500 fortunes
            </span>
          </div>
          <h1 className="font-extrabold text-[50px] md:text-[40px] sm:text-[28px] max-[639px]:text-[22px] leading-[60px] md:leading-[48px] sm:leading-[36px] max-[639px]:leading-[28px]">
            All Great Offices.
            <br />
            Grow Your Business.
          </h1>
          <p className="text-lg md:text-base sm:text-sm max-[639px]:text-xs leading-8 md:leading-7 sm:leading-6 max-[639px]:leading-5 text-[#000929]">
            Kantor yang tepat dapat memberikan impact pekerjaan menjadi lebih
            baik dan sehat dalam tumbuhkan karir.
          </p>
          <div className="flex items-center gap-5 md:gap-4 sm:flex-col sm:gap-3 max-[639px]:gap-2 sm:w-full">
            <a
              href="#"
              className="flex items-center justify-center rounded-full p-[20px_26px] md:p-[16px_22px] sm:p-[12px_18px] max-[639px]:p-[10px_16px] gap-3 sm:gap-2 max-[639px]:gap-1.5 bg-[#0D903A] sm:w-full"
            >
              <img
                src="/assets/images/icons/slider-horizontal-white.svg"
                className="w-[30px] h-[30px] md:w-6 md:h-6 sm:w-5 sm:h-5 max-[639px]:w-4 max-[639px]:h-4"
                alt="icon"
              />
              <span className="font-bold text-xl md:text-lg sm:text-base max-[639px]:text-sm leading-[30px] md:leading-7 sm:leading-6 max-[639px]:leading-5 text-[#F7F7FD]">
                Explore Now
              </span>
            </a>
            <a
              href="#"
              className="flex items-center justify-center rounded-full border border-[#000929] p-[20px_26px] md:p-[16px_22px] sm:p-[12px_18px] max-[639px]:p-[10px_16px] gap-3 sm:gap-2 max-[639px]:gap-1.5 bg-white sm:w-full"
            >
              <img
                src="/assets/images/icons/video-octagon.svg"
                className="w-[30px] h-[30px] md:w-6 md:h-6 sm:w-5 sm:h-5 max-[639px]:w-4 max-[639px]:h-4"
                alt="icon"
              />
              <span className="font-semibold text-xl md:text-lg sm:text-base max-[639px]:text-sm leading-[30px] md:leading-7 sm:leading-6 max-[639px]:leading-5">
                Watch Story
              </span>
            </a>
          </div>
        </div>
        <div
          id="Hero-Image"
          className="absolute right-0 w-[calc(100%-((100%-1130px)/2)-305px)] lg:w-[calc(100%-((100%-1130px)/2)-305px)] md:w-[calc(100%-280px)] sm:w-full h-[720px] md:h-[600px] sm:h-[500px] max-[639px]:h-[450px] rounded-bl-[40px] md:rounded-bl-[30px] sm:rounded-bl-[20px] max-[639px]:rounded-bl-[15px] overflow-hidden"
        >
          <img
            src="/assets/images/backgrounds/banner.png"
            className="w-full h-full object-cover"
            alt="hero background"
          />
        </div>
      </section>
      {/* Logo Client and Statistics Section */}
      <div className="flex flex-col pt-[150px] md:pt-[120px] sm:pt-[80px] max-[639px]:pt-[60px] pb-10 md:pb-8 sm:pb-6 max-[639px]:pb-4 px-[120px] lg:px-[120px] md:px-16 sm:px-4 max-[639px]:px-3 gap-10 md:gap-8 sm:gap-6 max-[639px]:gap-4 bg-[#0D903A]">
        <div className="logo-contianer flex items-center justify-center flex-wrap max-w-[1130px] h-[38px] md:h-[32px] sm:h-auto max-[639px]:h-auto mx-auto gap-[60px] md:gap-10 sm:gap-6 max-[639px]:gap-4">
          {logoData.map(({ name, src }, index) => (
            <img
              key={`${name}-${index}`}
              src={src}
              alt="clients logo"
              className="h-full sm:h-6 max-[639px]:h-5 object-contain max-[639px]:my-1"
            />
          ))}
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center max-w-[1130px] mx-auto gap-[50px] md:gap-8 sm:gap-6 max-[639px]:gap-4">
          {statisticsData.map(({ label, value }, index) => (
            <div
              key={`stat-${index}`}
              className="flex flex-col gap-[2px] max-[639px]:gap-[1px] text-center"
            >
              <p className="text-xl md:text-lg sm:text-base max-[639px]:text-sm leading-[30px] md:leading-7 sm:leading-6 max-[639px]:leading-5 text-[#F7F7FD]">
                {label}
              </p>
              <p className="font-bold text-[38px] md:text-[32px] sm:text-[24px] max-[639px]:text-[20px] leading-[57px] md:leading-[48px] sm:leading-[36px] max-[639px]:leading-[30px] text-white">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;

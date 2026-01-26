export default function Atmosphere() {
  return (
    <section className="atmosphere py-10 px-3.75 text-(--accent-color)">
      <div className="container max-w-360 mx-auto  min-h-[175px] rounded-3xl bg-white flex flex-col md:flex-row p-10 relative gap-4">
        <img
          src="/images/atmosphere/logo.webp"
          alt="logo"
          className="hidden sm:block absolute right-20 bottom-1 w-12.5"
        />
        <span className="text-[16px] sm:text-[18px] md:text-[22px] uppercase md:w-1/2 flex md:justify-center justify-start	">
          Приготовьтесь погрузиться <br /> в атмосферу качественного <br />{" "}
          отдыха
        </span>
        <p className="md:w-1/2 flex justify-center ">
          Где нет места суете и шуму, где вид из окна куда интересней ТВ и
          телефона, где можно снова стать собой и насладиться простыми, но
          ценными вещами - душевным общением, свежим воздухом, глубоким сном
        </p>
      </div>
    </section>
  );
}

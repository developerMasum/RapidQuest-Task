const Home = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A347ece48-0f69-11e9-a3aa-118c761d2745?source=ig)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full h-full text-white p-6 lg:p-12">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-center mb-4">
          Welcome To Chart Dashboard
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-6 text-center">
          Explore your data like never before with our interactive charts and
          insights.
        </p>
        {/* <a
          href="#explore"
          className="bg-yellow-400 text-black text-lg py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
        >
          Explore Now
        </a> */}
      </div>
    </div>
  );
};

export default Home;

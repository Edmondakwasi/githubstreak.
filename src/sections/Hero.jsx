const Hero = () => {
  return (
    <>
      <div className="hero min-h-[60vh] xl:min-h-screen bg-base-200">
        <div className="text-center hero-content">
          <div>
            <h1 className="text-3xl font-bold text-gray-200 md:text-6xl xl:text-8xl">
              Welcome to{" "}
              <span className="font-extrabold text-green-700">Githubstreak</span>
            </h1>
            <p className="py-6 text-xl md:text-3xl xl:text-6xl">
              Level up your coding game, set new records, and revel in the
              camaraderie of GitHub CodeStreak's Leaderboard
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

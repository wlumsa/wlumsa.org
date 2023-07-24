const Hero: React.FC = () => {
  return (
    <div className="hero min-h-screen" style={{backgroundImage: "url(https://img.freepik.com/premium-photo/abstract-rainbow-colorful-bright-feather-closeup-up-macro-view-background-plumage-texture-with-dew-drops_753134-644.jpg)"}}>
      <div className="hero-overlay bg-opacity-80"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Welcome</h1>
              <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
              <button className="btn btn-primary">  Join Us  </button>
              <button className="arrow" style={{ width: 24, height: 24, backgroundImage: `url(https://img.icons8.com/ios-filled/50/expand-arrow--v1.png" alt="expand-arrow--v1)` }}></button>
            </div>
          </div>
    </div>
  );
};

export default Hero;

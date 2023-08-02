const Hero: React.FC = () => {
  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://dsai.ca/wp-content/uploads/WLU-Hero.jpg)'}
                                           || {backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg))'}}>
        <div className="hero-overlay bg-opacity-50 bg-primary" />
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold text-secondary">Salam!</h1>
            <p className="mb-5 text-base-100">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <div className="join">
              <button className="btn btn-ghost text-base-100 border-0 hover:text-secondary hover:bg-transparent duration-200 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
              </button>
              <button className="btn btn-ghost text-base-100 border-0 hover:text-secondary hover:bg-transparent duration-200 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
              </button>
              <button className="btn btn-ghost text-base-100 border-0 hover:text-secondary hover:bg-transparent duration-200 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
              </button>
              <button className="btn btn-ghost text-base-100 border-0 hover:text-secondary hover:bg-transparent duration-200 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Hero;

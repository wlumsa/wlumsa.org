import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mb-28 mt-28 flex-grow px-4 md:px-10">
        <div className="flex-1 " id="services">
          <h2 className="mb-4 text-center text-4xl font-bold text-primary">
            Recordings
          </h2>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
            <div
              className="card card-compact w-fit bg-base-100 shadow-xl sm:w-96"
              key={0}
            >
              <div className="card-body">
                <h3 className="card-title mb-2 text-2xl font-semibold text-secondary">
                  Jummah Kutbahs
                </h3>
                <p className="text-neutral">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Tortor aliquam nulla facilisi cras fermentum odio eu.
                  Facilisis volutpat est velit egestas dui id ornare. Erat
                  imperdiet sed euismod nisi porta lorem mollis. Dui id ornare
                  arcu odio.
                </p>

                <div className="card-actions justify-end">
                  <a
                    href="/recordings/Jummah"
                
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary"
                  >
                    <button className="btn btn-primary mt-4 border-0 text-secondary shadow duration-200 hover:scale-105 hover:bg-secondary hover:text-primary">
                      View Recordings
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div
              className="card card-compact w-fit bg-base-100 shadow-xl sm:w-96"
              key={1}
            >
              <div className="card-body">
                <h3 className="card-title mb-2 text-2xl font-semibold text-secondary">
                  Halaqahs
                </h3>
                <p className="text-neutral">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Tortor aliquam nulla facilisi cras fermentum odio eu.
                  Facilisis volutpat est velit egestas dui id ornare. Erat
                  imperdiet sed euismod nisi porta lorem mollis. Dui id ornare
                  arcu odio.
                </p>

                <div className="card-actions justify-end">
                  <a
                    href="/recordings/halaqah"
    
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary"
                  >
                    <button className="btn btn-primary mt-4 border-0 text-secondary shadow duration-200 hover:scale-105 hover:bg-secondary hover:text-primary">
                      View Recordings
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div
              className="card card-compact w-fit bg-base-100 shadow-xl sm:w-96"
              key={2}
            >
              <div className="card-body">
                <h3 className="card-title mb-2 text-2xl font-semibold text-secondary">
                  Guest Speakers
                </h3>
                <p className="text-neutral">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Tortor aliquam nulla facilisi cras fermentum odio eu.
                  Facilisis volutpat est velit egestas dui id ornare. Erat
                  imperdiet sed euismod nisi porta lorem mollis. Dui id ornare
                  arcu odio.
                </p>

                <div className="card-actions justify-end">
                  <a
                    href="/recordings/"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary"
                  >
                    <button className="btn btn-primary mt-4 border-0 text-secondary shadow duration-200 hover:scale-105 hover:bg-secondary hover:text-primary">
                      View Recordings
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

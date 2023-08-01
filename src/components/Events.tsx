const Events: React.FC = () => {
    return (
        <>
            <div className="hero h-fit bg-base-100">
                <div className="hero-content flex-col lg:flex-row lg:gap-32">
                    <img src="https://northdallasgazette.com/wp-content/uploads/2019/09/WhatsApp-Image-2019-09-15-at-9.08.28-PM-1024x641.jpeg" className="max-w-xs sm:max-w-sm rounded-lg shadow-2xl" />
                    <div className="px-8 max-w-md lg:max-w-xl">
                        <h3 className="text-3xl text-center font-bold text-accent pt-4 lg:pt-0">Halaqas</h3>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <p className="font-bold">Wednesdays  @ 5:30 PM - 6:00 PM in P110.</p>
                    </div>
                </div>
            </div>
            <div className="hero h-fit bg-base-100">
                <div className="hero-content flex-col lg:flex-row-reverse lg:gap-32">
                    <img src="https://iqna.ir/files/en/news/2018/5/10/28671_904.jpg" className="max-w-xs sm:max-w-sm rounded-lg shadow-2xl" />
                    <div className="px-8 max-w-md lg:max-w-xl">
                        <h3 className="text-3xl text-center font-bold text-accent pt-4 lg:pt-0">Quran Circles</h3>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <p className="font-bold">Tuesdays  @ 4:00 PM - 4:30 PM in P110.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Events;
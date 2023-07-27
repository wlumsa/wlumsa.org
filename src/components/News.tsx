const News: React.FC = () => {
    return (
        <div className="flex flex-col px-6 pt-6 justify-center items-start">
            <h3 className="text-2xl text-center pb-4 font-bold text-accent">Latest News</h3>
            <div className="carousel rounded-box gap-2">
                <div id="key1" className="carousel-item">
                    <img className="w-72 md:w-[19rem] lg:w-80 rounded-xl" src="https://s3.amazonaws.com/www-inside-design/uploads/2020/10/aspect-ratios-blogpost-1x1-1-1024x1024.png" alt="Burger" />
                </div>
                <div id="key2" className="carousel-item">
                    <img className="w-72 md:w-[19rem] lg:w-80 rounded-xl" src="https://s3.amazonaws.com/www-inside-design/uploads/2020/10/aspect-ratios-blogpost-1x1-1-1024x1024.png" alt="Burger" />
                </div>
                <div id="key3" className="carousel-item">
                    <img className="w-72 md:w-[19rem] lg:w-80 rounded-xl" src="https://s3.amazonaws.com/www-inside-design/uploads/2020/10/aspect-ratios-blogpost-1x1-1-1024x1024.png" alt="Burger" />
                </div>
            </div>
        </div>
    );
}

export default News;
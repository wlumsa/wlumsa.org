const CtaForm: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-full py-2 bg-base-10">
            <div className="w-4/5 md:max-w-xl">
                <div className="card-body">
                    <h3 className="card-title text-3xl lg:text-4xl text-accent">Become a member!</h3>
                    <p className="lg:text-lg text-neutral-content">You'll receive all the latest news and information.</p>
                    <div className="flex flex-col gap-2 py-2">
                        <input type="text" placeholder="First Name" className="input input-bordered w-full text-base-content focus:border-accent" />
                        <input type="text" placeholder="Last Name" className="input input-bordered w-full text-base-content focus:border-accent" />
                        <input type="text" placeholder="MyLaurier Email" className="input input-bordered w-full text-base-content focus:border-accent" />
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn text-primary border-primary hover:bg-primary hover:text-base-100 duration-200">Submit ➜</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CtaForm;
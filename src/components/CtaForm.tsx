const CtaForm: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-full py-2 bg-base-100">
            <div className="max-w-xl px-2">
                <div className="card-body">
                    <h3 className="card-title text-3xl lg:text-4xl text-primary">Become a member!</h3>
                    <p className="lg:text-lg text-neutral">You'll receive all the latest news and information.</p>
                    <div className="flex flex-col gap-2 py-2">
                        <input type="text" placeholder="First Name" className="input input-bordered w-full text-neutral focus:border-secondary" />
                        <input type="text" placeholder="Last Name" className="input input-bordered w-full text-neutral focus:border-secondary" />
                        <input type="text" placeholder="MyLaurier Email" className="input input-bordered w-full text-neutral focus:border-secondary" />
                        <input type="text" placeholder="Student ID" className="input input-bordered w-full text-neutral focus:border-secondary" />
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn text-secondary bg-primary hover:bg-secondary hover:text-primary border-0 shadow duration-200">Submit ➜</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CtaForm;
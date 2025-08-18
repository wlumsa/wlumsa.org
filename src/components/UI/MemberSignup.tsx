'use client'
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { memberSignup } from '@/Utils/actions';
import { useFormStatus } from 'react-dom';
import { useTransition } from "react";

const MemberSignup: React.FC = () => {
  const { pending } = useFormStatus();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const res = await memberSignup(formData);
      if (res?.errors) {
        toast.error(res.message || "Failed to sign up");
      } else {
        toast.success(res?.message || "Successfully signed up!");
      }
    });
  };

  return (
    <div className="flex w-full items-center justify-center bg-base-100 py-2">
      <div className="max-w-xl px-2">
        <h3 className="card-title text-3xl text-primary duration-200 hover:scale-105 lg:text-4xl">
          Become a member!
        </h3>
        <p className="text-base-content/80 lg:text-lg">
          You'll receive all the latest news and information as well as a free MSA resource guide.
        </p>
        <form className="card-body text-base-content" action={handleSubmit}>
          <div className="flex flex-col gap-2 py-2">
            <input
              type="text"
              required
              name="firstName"
              placeholder="First Name"
              className="input input-bordered w-full text-base-content focus:border-secondary bg-base-100"
              aria-describedby="firstName-error"
            />
            <input
              type="text"
              required
              name="lastName"
              placeholder="Last Name"
              className="input input-bordered w-full text-base-content focus:border-secondary bg-base-100"
              aria-describedby="lastName-error"
            />
            <input
              type="email"
              required
              name="email"
              placeholder="MyLaurier Email"
              className="input input-bordered w-full text-base-content focus:border-secondary bg-base-100"
              aria-describedby="email-error"
            />
            <input
              type="text"
              required
              name="studentId"
              placeholder="Student ID"
              className="input input-bordered w-full text-base-content focus:border-secondary bg-base-100"
              aria-describedby="studentId-error"
            />
            <label className="label cursor-pointer">
              <span className="label-text text-base-content">Newsletter Signup</span>
              <input
                type="checkbox"
                name="newsLetter"
                className="toggle"
                defaultChecked={true}
              />
            </label>
          </div>
          <div className="card-actions justify-end">
            <button
              type="submit"
              className="btn border-0 btn-primary text-secondary shadow duration-200 hover:scale-105 hover:bg-primary/90"
              disabled={isPending}
            >
              {isPending ? 'Submitting...' : 'Submit ➜'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberSignup;

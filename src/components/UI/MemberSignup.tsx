'use client'
import { toast } from "react-hot-toast";
import { memberSignup } from '@/Utils/actions';
import { useTransition } from "react";

const MemberSignup: React.FC = () => {
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
        <div className="rounded-xl border border-base-300 bg-base-100 p-5 sm:p-6">
          <form className="text-base-content" action={handleSubmit}>
            <div className="mb-7 grid grid-cols-1 gap-4 md:mb-8 md:grid-cols-2 md:gap-6">
              <label className="form-control w-full gap-2">
                <span className="label-text text-sm font-medium text-base-content">First Name</span>
                <input
                  type="text"
                  required
                  name="firstName"
                  autoComplete="given-name"
                  placeholder="First Name…"
                  className="input input-bordered w-full bg-base-100 text-base-content focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  aria-describedby="firstName-error"
                />
              </label>
              <label className="form-control w-full gap-2">
                <span className="label-text text-sm font-medium text-base-content">Last Name</span>
                <input
                  type="text"
                  required
                  name="lastName"
                  autoComplete="family-name"
                  placeholder="Last Name…"
                  className="input input-bordered w-full bg-base-100 text-base-content focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  aria-describedby="lastName-error"
                />
              </label>
              <label className="form-control w-full gap-2">
                <span className="label-text text-sm font-medium text-base-content">MyLaurier Email</span>
                <input
                  type="email"
                  required
                  name="email"
                  autoComplete="email"
                  spellCheck={false}
                  placeholder="name@mylaurier.ca…"
                  className="input input-bordered w-full bg-base-100 text-base-content focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  aria-describedby="email-error"
                />
              </label>
              <label className="form-control w-full gap-2">
                <span className="label-text text-sm font-medium text-base-content">Student ID</span>
                <input
                  type="text"
                  required
                  name="studentId"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="Student ID…"
                  className="input input-bordered w-full bg-base-100 text-base-content focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  aria-describedby="studentId-error"
                />
              </label>
            </div>

            {/* Newsletter Toggle */}
            <div className="mb-7 md:mb-8">
              <label className="label cursor-pointer rounded-lg bg-base-200/70 p-4">
                <div className="flex flex-col gap-1 flex-1 pr-4">
                  <span className="label-text text-base-content font-medium">
                    Stay Updated
                  </span>
                  <span className="text-xs text-base-content/70">
                    Get weekly updates on events, prayers, and community news
                  </span>
                </div>
                <input
                  type="checkbox"
                  name="newsLetter"
                  className="toggle toggle-primary shrink-0"
                  defaultChecked={true}
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary w-full rounded-full border border-primary/40 px-8 font-medium sm:w-auto"
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing Up…
                  </>
                ) : (
                    "Join Community"
                )}
              </button>
            </div>
          </form>
        </div>

  );
};

export default MemberSignup;

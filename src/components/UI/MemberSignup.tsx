'use client'
import { toast } from "react-hot-toast";
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
        <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-5 sm:p-7 md:p-8">
          <form className="text-base-content" action={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-7 md:mb-8">
              <div className="space-y-4">
                <input
                  type="text"
                  required
                  name="firstName"
                  placeholder="First Name"
                  className="input input-bordered w-full text-base-content focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-base-100 transition-all duration-200"
                  aria-describedby="firstName-error"
                />
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="MyLaurier Email"
                  className="input input-bordered w-full text-base-content focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-base-100 transition-all duration-200"
                  aria-describedby="email-error"
                />
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  required
                  name="lastName"
                  placeholder="Last Name"
                  className="input input-bordered w-full text-base-content focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-base-100 transition-all duration-200"
                  aria-describedby="lastName-error"
                />
                <input
                  type="text"
                  required
                  name="studentId"
                  placeholder="Student ID"
                  className="input input-bordered w-full text-base-content focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-base-100 transition-all duration-200"
                  aria-describedby="studentId-error"
                />
              </div>
            </div>

            {/* Newsletter Toggle */}
            <div className="mb-7 md:mb-8">
              <label className="label cursor-pointer bg-base-200 rounded-lg p-4 hover:bg-base-300 transition-colors">
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
                className="btn btn-primary btn-lg w-full sm:w-auto sm:min-w-[240px] md:px-12 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing Up...
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

'use client'
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { memberSignup } from '@/Utils/actions';
import { useFormStatus } from 'react-dom';
import { useTransition } from "react";
import { Users, CheckCircle } from "lucide-react";

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
    <div className="flex w-full items-center justify-center bg-gradient-to-br from-base-100 to-base-200 py-8 sm:py-12">
      <div className="max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h3 className="pb-4 text-center text-3xl font-bold text-primary duration-200 hover:scale-105">
            Join Our Community!
          </h3>
          <p className="text-base-content/80 text-base sm:text-lg lg:text-xl mb-4 leading-relaxed max-w-2xl mx-auto">
            Stay connected with the latest MSA events, prayer times, and exclusive resources. Plus, get your free MSA Resource Guide!
          </p>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2 bg-success text-success-content px-4 py-2 rounded-full text-sm sm:text-base shadow-sm">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Join 500+ students already signed up!</span>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-6 sm:p-8">
          <form className="text-base-content" action={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
            <div className="mb-6">
              <label className="label cursor-pointer bg-base-200 rounded-lg p-4 hover:bg-base-300 transition-colors">
                <span className="label-text text-base-content font-medium">📧 Newsletter Signup</span>
                <input
                  type="checkbox"
                  name="newsLetter"
                  className="toggle toggle-primary"
                  defaultChecked={true}
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary text-primary-content text-lg px-8 py-3 shadow-lg hover:shadow-xl duration-200 hover:scale-105 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing Up...
                  </>
                ) : (
                  <>
                    Join Community ➜
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberSignup;

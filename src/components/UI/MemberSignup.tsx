'use client'
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { memberSignup } from '@/Utils/actions';
import { useFormStatus } from 'react-dom';
import { useTransition } from "react";
import { CheckCircle } from "lucide-react";
import { GetStartedButton } from "@/components/UI/button";

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
              <GetStartedButton
                type="submit"
                disabled={isPending}
                isLoading={isPending}
              >
                {isPending ? "Signing Up..." : "Join Community"}
              </GetStartedButton>
            </div>
          </form>
        </div>
     
  );
};

export default MemberSignup;

"use client";
import { toast } from "react-hot-toast";
import { memberSignup } from "@/Utils/actions";
import { useTransition } from "react";

const fieldClassName =
  "min-h-11 w-full rounded-lg border border-base-content/45 bg-base-100 px-3 py-2 text-base text-base-content placeholder:text-base-content/55 focus:border-primary focus:outline-2 focus:outline-offset-2 focus:outline-primary";

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
          <label className="grid min-w-0 gap-2">
            <span className="label-text text-sm font-medium text-base-content">
              First Name
            </span>
            <input
              type="text"
              required
              name="firstName"
              autoComplete="given-name"
              className={fieldClassName}
            />
          </label>
          <label className="grid min-w-0 gap-2">
            <span className="label-text text-sm font-medium text-base-content">
              Last Name
            </span>
            <input
              type="text"
              required
              name="lastName"
              autoComplete="family-name"
              className={fieldClassName}
            />
          </label>
          <label className="grid min-w-0 gap-2">
            <span className="label-text text-sm font-medium text-base-content">
              MyLaurier Email
            </span>
            <input
              type="email"
              required
              name="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="name@mylaurier.ca"
              className={fieldClassName}
            />
          </label>
          <label className="grid min-w-0 gap-2">
            <span className="label-text text-sm font-medium text-base-content">
              Student ID
            </span>
            <input
              type="text"
              required
              name="studentId"
              autoComplete="off"
              spellCheck={false}
              className={fieldClassName}
            />
          </label>
        </div>

        <div className="mb-7 md:mb-8">
          <label className="flex cursor-pointer items-start gap-3 rounded-lg bg-base-200/70 p-4">
            <input
              type="checkbox"
              name="newsLetter"
              aria-labelledby="member-newsletter-label"
              aria-describedby="member-newsletter-description"
              className="mt-0.5 size-5 shrink-0 cursor-pointer accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              defaultChecked
            />
            <span className="grid gap-1">
              <span id="member-newsletter-label" className="text-sm font-medium">
                Stay Updated
              </span>
              <span id="member-newsletter-description" className="text-sm text-base-content/70">
                Get weekly updates on events, prayers, and community news
              </span>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2 text-center">
          <button
            type="submit"
            disabled={isPending}
            className="btn w-full rounded-full border border-primary/40 px-8 font-medium btn-primary sm:w-auto"
          >
            {isPending ? (
              <>
                <span className="loading loading-sm loading-spinner"></span>
                Signing Up…
              </>
            ) : (
              "Join the Community"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberSignup;

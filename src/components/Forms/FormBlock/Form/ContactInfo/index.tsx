import type { ContactInfoField } from "./types";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import React from "react";

import { Error } from "../Error";

export const ContactInfo: React.FC<
  {
    errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>;
    register: UseFormRegister<any & FieldValues>;
  } & ContactInfoField
> = ({
  name,
  first_name,
  first_name_placeholder,
  last_name,
  last_name_placeholder,
  studentID,
  studentID_placeholder,
  email,
  email_placeholder,
  errors,
  label,
  register,
  required: requiredFromProps,
  width,
}) => {
  return (
    <div className="mx-auto flex max-w-3xl flex-col">
      <div className="items-center justify-center">
        <div>
          <label className="block text-xl font-semibold text-slate-800 md:text-2xl dark:text-base-content">
            {label}{" "}
            {requiredFromProps && (
              <span className="text-red-700 dark:text-error">*</span>
            )}
          </label>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 text-slate-700 md:grid-cols-2 dark:text-base-content">
          <div className="flex flex-col">
            <label
              className="text-sm font-medium dark:text-base-content/90"
              htmlFor={first_name}
            >
              First Name
            </label>
            <input
              type="text"
              className="mt-2 w-full border-b-2 border-slate-200 bg-transparent px-1 py-2 text-lg font-light text-slate-900 outline-none transition focus:border-primary md:text-xl dark:border-base-300 dark:text-base-content"
              placeholder={first_name_placeholder}
              id={first_name}
              {...register(`${name}.first_name`, {
                required: requiredFromProps,
              })}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-sm font-medium dark:text-base-content/90"
              htmlFor={last_name}
            >
              Last Name
            </label>
            <input
              type="text"
              className="mt-2 w-full border-b-2 border-slate-200 bg-transparent px-1 py-2 text-lg font-light text-slate-900 outline-none transition focus:border-primary md:text-xl dark:border-base-300 dark:text-base-content"
              placeholder={last_name_placeholder}
              id={last_name}
              {...register(`${name}.last_name`, {
                required: requiredFromProps,
              })}
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 text-slate-700 dark:text-base-content">
          <div className="flex flex-col">
            <label
              className="text-sm font-medium dark:text-base-content/90"
              htmlFor={studentID}
            >
              Student ID
            </label>
            <input
              type="text"
              className="mt-2 w-full border-b-2 border-slate-200 bg-transparent px-1 py-2 text-lg font-light text-slate-900 outline-none transition focus:border-primary md:text-xl dark:border-base-300 dark:text-base-content"
              placeholder={studentID_placeholder}
              id={studentID}
              {...register(`${name}.studentID`, {
                required: requiredFromProps,
              })}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-sm font-medium dark:text-base-content/90"
              htmlFor={email}
            >
              Email
            </label>
            <input
              type="text"
              className="mt-2 w-full border-b-2 border-slate-200 bg-transparent px-1 py-2 text-lg font-light text-slate-900 outline-none transition focus:border-primary md:text-xl dark:border-base-300 dark:text-base-content"
              placeholder={email_placeholder}
              id={email}
              {...register(`${name}.email`, { required: requiredFromProps })}
            />
          </div>
        </div>
      </div>
      {requiredFromProps && errors[name] && <Error />}
    </div>
  );
};

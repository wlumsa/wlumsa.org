import type { TextField } from "@payloadcms/plugin-form-builder/types";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import React from "react";

import { Error } from "../Error";
import { Width } from "../Width";

export const Number: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
    register: UseFormRegister<any & FieldValues>;
  } & TextField
> = ({ name, errors, label, register, required: requiredFromProps, width }) => {
  return (
    <div className="w-full">
      <Width width={width}>
        <div className="max-w-3xl">
          <label
            className="block text-xl font-semibold text-slate-800 md:text-2xl dark:text-base-content"
            htmlFor={name}
          >
            {label}{" "}
            {requiredFromProps && (
              <span className="text-red-700 dark:text-error">*</span>
            )}
          </label>
          <input
            type="number"
            className="mt-4 w-full border-b-2 border-slate-200 bg-transparent px-1 py-2.5 text-xl font-light text-slate-900 outline-none transition focus:border-primary md:text-2xl dark:border-base-300 dark:text-base-content"
            placeholder="+1 234 567 891"
            id={name}
            min={0}
            {...register(name, {
              required: requiredFromProps ? `${label} is required` : false,
            })}
          />

          {requiredFromProps && errors[name] && <Error />}
        </div>
      </Width>
    </div>
  );
};

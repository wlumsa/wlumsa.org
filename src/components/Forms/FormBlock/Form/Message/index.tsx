import type { MessageField } from "@payloadcms/plugin-form-builder/types";

import React from "react";

import RichText from "@/Utils/RichText";
import { Width } from "../Width";

export const Message: React.FC<MessageField> = ({ message }) => {
  return (
    <Width width={100}>
      <div className="my-4 h-fit w-full max-w-full overflow-hidden px-4 text-left text-sm leading-relaxed text-slate-700 md:px-8 md:text-lg dark:text-base-content">
        <RichText enableGutter={false} enableProse={false} content={message} />
      </div>
    </Width>
  );
};

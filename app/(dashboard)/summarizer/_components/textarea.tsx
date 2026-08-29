"use client";

import { useState } from "react";
import { JSX } from "react/jsx-runtime";

export default function TextArea({
  textProp,
}: {
  textProp: string;
}): JSX.Element {
  const [text, setText] = useState<string>(textProp);

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <textarea
      name=""
      id=""
      cols={70}
      rows={5}
      className="w-full px-2 py-3 outline-none border-none bg-[#0F141A] border-gray-700 border rounded-lg"
      placeholder="Paste your long article, report, or any text you want to summarize ..."
      value={text}
      onChange={onTextChange}
    />
  );
}

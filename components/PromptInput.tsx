"use client";
import useSWR from "swr";
import toast from "react-hot-toast";

import { FormEvent, useState } from "react";
import fetchSuggestion from "@/lib/fetchSuggestion";
import fetchImages from "@/lib/fetchImages";

function PromptInput() {
  const [input, setInput] = useState("");
  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestion, {
    revalidateOnFocus: false,
  });

  const { mutate: refreshImages } = useSWR("images", fetchImages, {
    revalidateOnFocus: false,
  });

  const loading = isLoading || isValidating;
  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    setInput("");
    // p=prompt

    const p = useSuggestion ? suggestion : inputPrompt;
    const notificationPrompt = p;
    const notificationPromptShort = notificationPrompt.slice(0, 20);

    const notification = toast.loading(
      `DALL·E is creating: ${notificationPromptShort}...`
    );
    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: p,
      }),
    });

    const data = await res.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(`Your AI Art has been Generated!`, {
        id: notification,
      });
    }

    refreshImages();

    // https://ai-image-sanity-app.azurewebsites.net/api/getimages
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };

  return (
    <div className="m-10">
      <form
        className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x"
        onSubmit={handleSubmit}
      >
        <textarea
          className="flex-1 p-4 outline-none rounded-md"
          placeholder={
            (loading && "ChatGpt is thinking of a suggestion...") ||
            suggestion ||
            `Enter a prompt...`
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className={`p-4 font-bold ${
            input
              ? "bg-violet-500 text-white transition-colors duration-200"
              : "text-gray-300 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!input}
        >
          Generate
        </button>
        <button
          onClick={() => submitPrompt(true)}
          type="button"
          className="p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Use Suggestion
        </button>
        <button
          type="button"
          onClick={mutate}
          className="p-4 bg-white text-violet-500 border-none transition-colors duration-200 rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold"
        >
          New Suggestion
        </button>
      </form>
      {input && (
        <p className="italic pt-2 pl-2 font-light">
          Suggestion:{" "}
          <span className="text-violet-500">
            {loading ? "ChatGpt is thinking...." : suggestion}
          </span>
        </p>
      )}
    </div>
  );
}

export default PromptInput;

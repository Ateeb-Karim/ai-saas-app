"use client";

import { JSX, useState } from "react";
import toast from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast("Message sent successfully", {
      icon: "✅",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
      position: "top-center",
      duration: 3000,
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          required
          className="w-full rounded-lg px-3 py-2 text-sm bg-gray-900 border border-gray-700"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="your email"
          required
          className="w-full rounded-lg px-3 py-2 text-sm bg-gray-900 border border-gray-700"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="How can we help?"
          required
          className="w-full rounded-lg px-3 py-2 text-sm bg-gray-900 border border-gray-700"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        Send Message
      </button>
    </form>
  );
}

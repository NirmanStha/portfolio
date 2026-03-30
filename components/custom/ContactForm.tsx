"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  const isValidEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in name, email and message.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject: "", message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to send message.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError("Unexpected error. Try again later.");
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="py-32 px-6 md:px-20 bg-white text-black rounded-t-[50px] md:rounded-t-[100px]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              data-cursor="text"
              className="text-5xl md:text-8xl font-serif mb-8 leading-tight"
            >
              Let's make <br /> something <br />{" "}
              <span className="italic opacity-50">great</span>.
            </motion.h2>
            <div className="space-y-4">
              <p className="text-xl font-medium">nirmans39@gmail.com</p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-black text-white p-10 rounded-[40px] shadow-2xl"
          >
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-4 focus:border-white outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-4 focus:border-white outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="What's on your mind?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-4 focus:border-white outline-none transition-colors resize-none"
                />
              </div>

              {error && <div className="text-sm text-red-300">{error}</div>}
              {status === "success" && (
                <div className="text-sm text-emerald-300">
                  Message sent — thanks!
                </div>
              )}

              <button
                className="w-full py-6 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-slate-200 transition-colors disabled:opacity-50"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

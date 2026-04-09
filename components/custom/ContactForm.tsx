"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const socialLinks = [
  {
    label: "LinkedIn",
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL,
  },

  {
    label: "GitHub",
    href: process.env.NEXT_PUBLIC_GITHUB_URL,
  },
].filter((item): item is { label: string; href: string } => Boolean(item.href));

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(""); // Added subject state
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => setStatus("idle"), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // 1. Client-side validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all required fields.");
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
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message.");
      }

      // 2. Reset form on success
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Unexpected error. Try again later.";
      setError(errorMessage);
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="py-32 sm:px-6 md:px-20 bg-white text-black rounded-t-[50px] md:rounded-t-[100px]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-serif mb-8 leading-tight"
            >
              Let&apos;s make <br /> something <br />{" "}
              <span className="italic opacity-50">great</span>.
            </motion.h2>
            <div className="space-y-4">
              <p className="text-xl font-medium">nirmans39@gmail.com</p>
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-black text-white p-10 rounded-[40px] shadow-2xl"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                  Subject (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Project Inquiry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="What's on your mind?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:border-white outline-none transition-colors resize-none"
                />
              </div>

              {/* Status Messages */}
              <div className="min-h-6">
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-red-400 font-medium"
                    >
                      {error}
                    </motion.div>
                  )}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-emerald-400 font-medium"
                    >
                      ✓ Message sent successfully!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                className="w-full py-6 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-slate-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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

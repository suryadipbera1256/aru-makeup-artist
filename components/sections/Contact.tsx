"use client";

import { useState, type FormEvent } from "react";
import { HiWave } from "@/components/ui/HiWave";

const SERVICES = ["Bridal Makeup", "Party & Event", "Hair Styling", "Editorial / Photoshoot", "Other"];

const inputCls =
  "w-full rounded-xl border border-line bg-card px-4 py-3 text-sm text-fg outline-none placeholder:text-muted focus:border-accent";

/**
 * Contact — "Let's work together".
 * 50/50 split: left avatar column (340x476 portrait card + 120px Hi badge,
 * mirroring the hero) and right contact column (heading, intro, form).
 * 1200px container, 120px vertical padding, 40px column gap on the right.
 */
export function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="w-full">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-16 px-10 py-[120px] lg:flex-row lg:items-center lg:gap-0">
        {/* Avatar column (50%) */}
        <div className="flex w-full justify-center lg:w-1/2">
          <div className="relative h-[476px] w-[340px]">
            <div className="absolute inset-0 overflow-hidden rounded-[20px] bg-gradient-to-br from-[#2c3324] to-ink ring-1 ring-line">
              <div className="grain absolute inset-0 opacity-[0.15] mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-6 -left-14 z-10">
              <HiWave />
            </div>
          </div>
        </div>

        {/* Contact column (50%) */}
        <div className="flex w-full flex-col gap-10 lg:w-1/2">
          <div className="flex flex-col gap-5">
            <h2 className="font-display text-[42px] font-bold uppercase leading-[1.3em] text-fg md:text-[48px] lg:text-[60px]">
              Let&apos;s work together
            </h2>
            <p className="max-w-[500px] font-sans text-[16px] font-light leading-[1.5em] text-fg lg:text-[18px]">
              Let&apos;s create something beautiful together — whether it&apos;s
              your wedding day, an editorial shoot, or your next celebration.
            </p>
          </div>

          {sent ? (
            <div className="flex min-h-[200px] items-center justify-center rounded-3xl border border-line bg-card p-10 text-center">
              <p className="text-lg text-fg">
                Thank you — your inquiry is in.
                <br />
                <span className="text-muted">I&apos;ll be in touch shortly.</span>
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name">
                  <input required type="text" placeholder="Your name" className={inputCls} />
                </Field>
                <Field label="Email">
                  <input required type="email" placeholder="you@email.com" className={inputCls} />
                </Field>
              </div>
              <Field label="Service needed">
                <select required defaultValue="" className={inputCls}>
                  <option value="" disabled>
                    Select a service…
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="What can I do for you">
                <textarea rows={4} placeholder="Date, location, and the look you want…" className={`${inputCls} resize-none`} />
              </Field>
              <button
                type="submit"
                className="w-full rounded-full border border-accent bg-transparent px-6 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-fg active:scale-95"
              >
                Send inquiry →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-accent">{label}</span>
      {children}
    </label>
  );
}

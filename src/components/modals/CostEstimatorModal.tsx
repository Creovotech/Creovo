"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Calculator, Globe, HelpCircle, Layers, Send, Sparkles, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Message = { id: string; role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  { icon: Globe, label: "Website", prompt: "I want to build a marketing website." },
  { icon: Layers, label: "Full-stack app", prompt: "I need a full-stack web app with a backend." },
  { icon: Sparkles, label: "AI agent", prompt: "I'm looking to build an AI / agentic solution." },
  { icon: HelpCircle, label: "Not sure yet", prompt: "I'm not sure what I need yet — can you help me scope it?" },
];

const GREETING: Message = {
  id: "init",
  role: "assistant",
  content: "Hi — tell me what you're looking to build (a website, an app, an AI agent) and I'll put together a rough estimate.",
};

export const CostEstimatorModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) => {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    if (taRef.current) taRef.current.style.height = "auto";
    setLoading(true);

    try {
      const res = await fetch("/api/cost-estimator", {
        method: "POST",
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { id: crypto.randomUUID(), role: "assistant", content: data.reply || "Sorry, I couldn't get an estimate. Try rephrasing?" }]);
    } catch {
      setMessages((p) => [...p, { id: crypto.randomUUID(), role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-grow the textarea up to a cap so longer project descriptions stay readable
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const ta = taRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
    }
  };

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] w-[95%] h-[620px] max-h-[88vh] p-0 gap-0 bg-zinc-950 border border-zinc-800 text-zinc-100 overflow-hidden rounded-2xl shadow-2xl shadow-black/60 flex flex-col">
        <DialogHeader className="relative p-4 pr-12 border-b border-zinc-800 bg-zinc-900/40 backdrop-blur-xl shrink-0 text-left space-y-0">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg flex items-center justify-center bg-linear-to-b from-neutral-800 to-neutral-950 border border-zinc-800">
              <Calculator className="size-4 text-zinc-300" />
            </div>
            <div className="flex flex-col">
              <DialogTitle className="text-sm font-semibold text-white tracking-tight">Cost Estimator</DialogTitle>
              <span className="text-xs text-zinc-500">Tell us about your project for a rough quote</span>
            </div>
          </div>
        </DialogHeader>

        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 overscroll-contain [scrollbar-width:thin]"
          data-lenis-prevent
        >
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={cn("flex gap-3 max-w-[88%]", m.role === "user" ? "ml-auto flex-row-reverse" : "")}
              >
                <div className={cn("size-7 rounded-lg flex items-center justify-center shrink-0 border text-xs font-bold", m.role === "user" ? "bg-zinc-800 border-zinc-700 text-zinc-400" : "bg-zinc-900 border-zinc-800 text-white")}>
                  {m.role === "user" ? <User className="size-3.5" /> : "C"}
                </div>
                <div className={cn("px-3.5 py-2.5 rounded-xl text-sm leading-relaxed border whitespace-pre-wrap", m.role === "user" ? "bg-zinc-800 border-zinc-700 text-zinc-100 rounded-tr-sm" : "bg-zinc-900/60 border-zinc-800 text-zinc-300 rounded-tl-sm")}>
                  {m.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 max-w-[88%]">
              <div className="size-7 rounded-lg flex items-center justify-center shrink-0 border bg-zinc-900 border-zinc-800 text-white text-xs font-bold">C</div>
              <div className="flex gap-1 items-center px-3.5 py-3 rounded-xl rounded-tl-sm bg-zinc-900/60 border border-zinc-800">
                <span className="size-1.5 rounded-full bg-zinc-500 animate-bounce" />
                <span className="size-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:0.15s]" />
                <span className="size-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:0.3s]" />
              </div>
            </motion.div>
          )}
          <div ref={endRef} />
        </div>

        {showSuggestions && (
          <div className="px-4 pb-1 flex flex-wrap gap-2 shrink-0">
            {SUGGESTIONS.map(({ icon: Icon, label, prompt }) => (
              <button
                key={label}
                onClick={() => sendMessage(prompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors cursor-pointer"
              >
                <Icon className="size-3.5 text-zinc-500" />
                {label}
              </button>
            ))}
          </div>
        )}

        <div className="p-4 bg-zinc-900/30 border-t border-zinc-800 shrink-0">
          <div className="flex items-end gap-2">
            <textarea
              ref={taRef}
              value={input}
              onChange={handleInput}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              rows={1}
              placeholder="Describe your project..."
              className="flex-1 resize-none max-h-30 rounded-lg bg-zinc-950 border border-zinc-800 px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none transition-colors focus:border-zinc-600 [scrollbar-width:thin]"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="size-10 shrink-0 rounded-md flex items-center justify-center bg-white text-black font-bold transition duration-200 hover:-translate-y-0.5 hover:bg-neutral-200 disabled:translate-y-0 disabled:bg-zinc-800 disabled:text-zinc-600 cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="size-4" />
            </button>
          </div>
          <p className="mt-2.5 text-center text-[11px] text-zinc-600">
            Rough estimates · final quote after a quick call
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Send, Bot, User } from "lucide-react";

type Message = { id: string; role: "user" | "assistant"; content: string };

export const CostEstimatorModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', role: "assistant", content: "Hey! Let me know what you're looking to build (app, website, AI agent?), and I'll give you a rough estimate." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: input };
    setMessages(p => [...p, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/cost-estimator", {
        method: "POST",
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages(p => [...p, { id: crypto.randomUUID(), role: "assistant", content: data.reply || "Error getting estimate." }]);
    } catch {
      setMessages(p => [...p, { id: crypto.randomUUID(), role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] w-[95%] h-[600px] max-h-[90vh] p-0 gap-0 bg-zinc-950 border-zinc-800 text-zinc-100 overflow-hidden shadow-2xl shadow-black/40 flex flex-col">
        <DialogHeader className="p-4 border-b border-zinc-800 flex flex-row items-center justify-between bg-zinc-900/50 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3">
            <DialogTitle className="text-sm font-medium text-zinc-200">Cost Estimator</DialogTitle>
          </div>
        </DialogHeader>

        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 overscroll-contain"
          data-lenis-prevent
        >
          {messages.map((m) => (
            <div key={m.id} className={cn("flex gap-3 max-w-[85%]", m.role === "user" ? "ml-auto flex-row-reverse" : "")}>
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border", m.role === "user" ? "bg-zinc-800 border-zinc-700" : "bg-violet-950/30 border-violet-500/20")}>
                {m.role === "user" ? <User className="w-4 h-4 text-zinc-400" /> : <Bot className="w-4 h-4 text-violet-400" />}
              </div>
              <div className={cn("p-3 rounded-2xl text-sm leading-relaxed border whitespace-pre-wrap", m.role === "user" ? "bg-zinc-800 border-zinc-700 text-zinc-200 rounded-tr-none" : "bg-zinc-900/50 border-zinc-800 text-zinc-300 rounded-tl-none")}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border bg-violet-950/30 border-violet-500/20">
                <Bot className="w-4 h-4 text-violet-400" />
              </div>
              <div className="flex gap-1 items-center p-3 rounded-2xl rounded-tl-none bg-zinc-900/50 border border-zinc-800">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce delay-75" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce delay-150" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="p-4 bg-zinc-900/30 border-t border-zinc-800 flex gap-2 shrink-0">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Describe your project..."
            className="bg-zinc-950 border-zinc-800 focus-visible:ring-violet-500/20 text-zinc-300 placeholder:text-zinc-600"
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()} size="icon" className="bg-violet-600 hover:bg-violet-700 text-white shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)]">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
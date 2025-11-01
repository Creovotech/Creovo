'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Send, Bot, User, Sparkles } from 'lucide-react';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Message = { id: string; role: 'user' | 'assistant'; content: string };

export const CostEstimatorModal = ({ open, onOpenChange }: Props) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      content:
        "Hey! Tell me what you need (pages, features, timeline, examples). I'll give a quick ballpark estimate.",
    },
  ]);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ 
        top: scrollRef.current.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  }, [messages, isTyping, open]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    
    const userMsg: Message = { 
      id: crypto.randomUUID(), 
      role: 'user', 
      content: text 
    };
    
    setMessages((m) => [...m, userMsg]);
    setDraft('');
    setIsTyping(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const placeholder: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          'Got it. (AI pricing not wired yet—plug your API and replace this message with a real estimate + scope notes.)',
      };
      setMessages((m) => [...m, placeholder]);
      setIsTyping(false);
    }, 1000);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 bg-zinc-950 border-zinc-800">
        <div className="flex flex-col h-[600px]">
          {/* Header */}
          <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
            <DialogHeader className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-semibold text-zinc-100">
                    AI Cost Estimator
                  </DialogTitle>
                  <DialogDescription className="text-sm text-zinc-400 mt-0.5">
                    Describe your project and get an instant estimate
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef} 
            className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-950"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  'flex gap-3 items-start',
                  m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    'h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0',
                    m.role === 'user'
                      ? 'bg-zinc-800'
                      : 'bg-gradient-to-br from-violet-500 to-purple-600'
                  )}
                >
                  {m.role === 'user' ? (
                    <User className="h-4 w-4 text-zinc-300" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={cn(
                    'max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                    'shadow-sm transition-all duration-200',
                    m.role === 'user'
                      ? 'bg-zinc-100 text-zinc-900 rounded-tr-sm'
                      : 'bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-tl-sm'
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 items-start">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="h-2 w-2 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="h-2 w-2 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-zinc-800 bg-zinc-900/30 backdrop-blur-xl p-4">
            <div className="flex gap-2">
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Describe your project requirements..."
                disabled={isTyping}
                className={cn(
                  'h-12 bg-zinc-900 border-zinc-800 text-zinc-100',
                  'placeholder:text-zinc-500 focus-visible:ring-zinc-700',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              />
              <Button 
                onClick={send} 
                disabled={!draft.trim() || isTyping}
                className={cn(
                  'h-12 px-5 bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'transition-all duration-200'
                )}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
              <span>Press Enter to send</span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                AI Ready
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
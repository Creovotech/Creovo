'use client';

import { useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Clock, CalendarDays, CheckCircle2 } from 'lucide-react';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const IST_OFFSET_MINUTES = 5 * 60 + 30;
const START_HOUR_IST = 9;
const END_HOUR_IST = 23;

const CALENDLY_URL = 'https://calendly.com/sayandeysarkar2003/client-meet';

function istToUtcDate(y: number, m: number, d: number, h: number, minute = 0) {
  const millis = Date.UTC(y, m, d, h, minute) - IST_OFFSET_MINUTES * 60 * 1000;
  return new Date(millis);
}

type Slot = {
  id: string;
  label: string;
  start: Date;
  end: Date;
};

export const BookCallModal = ({ open, onOpenChange }: Props) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const userTimeZone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    } catch {
      return 'UTC';
    }
  }, []);

  const slots: Slot[] = useMemo(() => {
    if (!date) return [];
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();

    const out: Slot[] = [];
    const timeOpts: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: userTimeZone,
    };

    for (let h = START_HOUR_IST; h <= END_HOUR_IST - 1; h++) {
      const startUtc = istToUtcDate(y, m, d, h);
      const endUtc = new Date(startUtc.getTime() + 60 * 60 * 1000);

      const startLabel = startUtc.toLocaleTimeString([], timeOpts);
      const endLabel = endUtc.toLocaleTimeString([], timeOpts);

      out.push({
        id: startUtc.toISOString(),
        label: `${startLabel} – ${endLabel}`,
        start: startUtc,
        end: endUtc,
      });
    }
    return out;
  }, [date, userTimeZone]);

  const selectedSlot = useMemo(
    () => slots.find((s) => s.id === selectedSlotId) || null,
    [slots, selectedSlotId]
  );

  const businessHoursLocalLabel = useMemo(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();

    const startUtc = istToUtcDate(y, m, d, START_HOUR_IST);
    const endUtc = istToUtcDate(y, m, d, END_HOUR_IST);

    const opts: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: userTimeZone,
    };

    const start = startUtc.toLocaleTimeString([], opts);
    const end = endUtc.toLocaleTimeString([], opts);

    return `${start} – ${end}`;
  }, [userTimeZone]);

  const disabled = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const test = new Date(d);
    test.setHours(0, 0, 0, 0);
    return test < today;
  };

  const handleConfirm = () => {
    if (!selectedSlot) return;

    // If you *really* want to, you could log selectedSlot to your own backend
    // before sending them to Calendly, but Calendly will still be the source of truth.
    window.open(CALENDLY_URL, '_blank', 'noreferrer');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 gap-0 bg-zinc-950 border-zinc-800">
        <div className="grid lg:grid-cols-[380px_1fr] min-h-[600px]">
          {/* Left Panel */}
          <div className="bg-zinc-900/50 border-r border-zinc-800 p-6 flex flex-col">
            <DialogHeader className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-zinc-400" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-semibold text-zinc-100">
                    Book a Discovery Call
                  </DialogTitle>
                  <DialogDescription className="text-sm text-zinc-400 mt-1">
                    60-minute consultation
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="flex-1 flex items-start justify-center">
              <div className="w-full">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d);
                    setSelectedSlotId(null);
                  }}
                  disabled={disabled}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800">
              <div className="flex items-start gap-3 text-sm text-zinc-400">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-medium text-zinc-300">
                    Business Hours (IST → your time)
                  </p>
                  <p className="text-xs text-zinc-500">
                    9:00 AM – 11:00 PM IST
                  </p>
                  <p className="text-xs text-zinc-500">
                    Shown as {businessHoursLocalLabel} in your timezone ({userTimeZone})
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="p-6 flex flex-col">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-zinc-100 mb-1">
                {date ? 'Select a time slot' : 'Choose a date first'}
              </h3>
              <p className="text-sm text-zinc-400">
                {date
                  ? `Available times for ${date.toLocaleDateString('en-IN', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })} (shown in your timezone)`
                  : 'Pick a date from the calendar to see available times'}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto">
              {slots.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Clock className="h-12 w-12 text-zinc-700 mx-auto" />
                    <p className="text-sm text-zinc-500">
                      Select a date to view available time slots
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 pb-4">
                  {slots.map((s) => {
                    const active = selectedSlotId === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSlotId(s.id)}
                        className={cn(
                          'relative rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200',
                          'hover:scale-[1.02] active:scale-[0.98]',
                          active
                            ? 'bg-zinc-100 text-zinc-900 border-zinc-100 shadow-lg'
                            : 'bg-zinc-900/50 text-zinc-300 border-zinc-800 hover:bg-zinc-800/50 hover:border-zinc-700'
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span>{s.label}</span>
                          {active && (
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800 space-y-4">
              {selectedSlot && (
                <div className="rounded-lg bg-zinc-900/50 border border-zinc-800 p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-300 mb-1">
                        Selected Time
                      </p>
                      <p className="text-sm text-zinc-400 truncate">
                        {selectedSlot.start.toLocaleString(undefined, {
                          timeZone: userTimeZone,
                          dateStyle: 'full',
                          timeStyle: 'short',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1 bg-transparent border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={!selectedSlot}
                  className="flex-1 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Schedule Meeting
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

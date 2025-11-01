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

const START_HOUR = 10;
const END_HOUR = 19;

function toCalendarUTC(d: Date) {
  const pad = (n: number) => `${n}`.padStart(2, '0');
  const y = d.getUTCFullYear();
  const m = pad(d.getUTCMonth() + 1);
  const day = pad(d.getUTCDate());
  const hh = pad(d.getUTCHours());
  const mm = pad(d.getUTCMinutes());
  const ss = pad(d.getUTCSeconds());
  return `${y}${m}${day}T${hh}${mm}${ss}Z`;
}

export const BookCallModal = ({ open, onOpenChange }: Props) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  const slots = useMemo(() => {
    if (!date) return [];
    const day = new Date(date);
    const out: { label: string; start: Date; end: Date }[] = [];
    for (let h = START_HOUR; h <= END_HOUR - 1; h++) {
      const start = new Date(
        new Date(day).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
      );
      start.setHours(h, 0, 0, 0);
      const startIST = new Date(
        Date.UTC(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours() - (start.getTimezoneOffset() / 60),
          0,
          0,
          0
        )
      );
      const endIST = new Date(startIST.getTime() + 60 * 60 * 1000);
      const label = `${String(h).padStart(2, '0')}:00 – ${String(h + 1).padStart(2, '0')}:00`;
      out.push({ label, start: startIST, end: endIST });
    }
    return out;
  }, [date]);

  const selectedSlot = useMemo(() => {
    if (selectedHour == null || !date) return null;
    return slots.find((s) => s.label.startsWith(String(selectedHour).padStart(2, '0')));
  }, [selectedHour, date, slots]);

  const gcalLink = useMemo(() => {
    if (!selectedSlot) return '';
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: 'Discovery Call — Your Agency',
      details: '60-minute discovery call to discuss your website requirements.',
      ctz: 'Asia/Kolkata',
      dates: `${toCalendarUTC(selectedSlot.start)}/${toCalendarUTC(selectedSlot.end)}`,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, [selectedSlot]);

  const disabled = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const test = new Date(d);
    test.setHours(0, 0, 0, 0);
    return test < today;
  };

  const handleConfirm = () => {
    if (gcalLink) {
      window.open(gcalLink, '_blank', 'noreferrer');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 gap-0 bg-zinc-950 border-zinc-800">
        <div className="grid lg:grid-cols-[380px_1fr] min-h-[600px]">
          {/* Left Panel - Calendar */}
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
                    setSelectedHour(null);
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
                  <p className="font-medium text-zinc-300">Business Hours (IST)</p>
                  <p>10:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Time Slots */}
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
                      day: 'numeric' 
                    })}`
                  : 'Pick a date from the calendar to see available times'}
              </p>
            </div>

            {/* Time Slots Grid */}
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
                    const hour = parseInt(s.label.slice(0, 2), 10);
                    const active = selectedHour === hour;
                    return (
                      <button
                        key={s.label}
                        onClick={() => setSelectedHour(hour)}
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

            {/* Selected Summary & Actions */}
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
                        {selectedSlot.start.toLocaleString('en-IN', { 
                          timeZone: 'Asia/Kolkata',
                          dateStyle: 'full',
                          timeStyle: 'short'
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
                  Add to Google Calendar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
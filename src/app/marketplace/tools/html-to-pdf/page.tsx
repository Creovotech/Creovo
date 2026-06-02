'use client';

import { useRef, useState } from 'react';
import { Download, FileText } from 'lucide-react';

const SAMPLE = `<h1>Invoice #1024</h1>
<p>Billed to: Acme Inc.</p>
<table style="border-collapse:collapse;width:100%;margin-top:16px" border="1" cellpadding="8">
  <tr><th align="left">Item</th><th align="right">Amount</th></tr>
  <tr><td>Design</td><td align="right">$200</td></tr>
  <tr><td>Development</td><td align="right">$800</td></tr>
  <tr><th align="left">Total</th><th align="right">$1,000</th></tr>
</table>
<p style="margin-top:24px;color:#555">Thanks for your business!</p>`;

// Render the user's HTML in a same-origin iframe and print just that frame — the
// browser's print dialog handles "Save as PDF". No server, no dependencies.
export default function HtmlToPdfTool() {
  const [html, setHtml] = useState(SAMPLE);
  const frameRef = useRef<HTMLIFrameElement>(null);

  const downloadPdf = () => {
    const frame = frameRef.current;
    if (!frame?.contentWindow) return;
    frame.contentWindow.focus();
    frame.contentWindow.print();
  };

  return (
    <main className="mx-auto max-w-5xl px-4 md:px-6 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
            <FileText className="size-6 text-zinc-400" /> HTML → PDF Converter
          </h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-400">
            Write or paste HTML on the left, preview it live, then export a clean PDF. Everything runs
            in your browser — nothing is uploaded.
          </p>
        </div>
        <button
          onClick={downloadPdf}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-bold text-black transition duration-200 hover:-translate-y-0.5 hover:bg-neutral-200 cursor-pointer"
        >
          <Download className="size-4" /> Download PDF
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col">
          <label className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">HTML</label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            spellCheck={false}
            className="h-[60vh] w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm text-zinc-200 outline-none transition-colors focus:border-zinc-600"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">Preview</label>
          <iframe
            ref={frameRef}
            title="PDF preview"
            srcDoc={html}
            className="h-[60vh] w-full rounded-xl border border-zinc-800 bg-white"
          />
        </div>
      </div>
    </main>
  );
}

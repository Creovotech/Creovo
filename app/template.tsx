// Re-mounts on every navigation — gives each page a quick, consistent fade-up.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}

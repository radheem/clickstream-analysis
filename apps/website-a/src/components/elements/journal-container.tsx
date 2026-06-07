export function JournalContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-accent-subtle overflow-hidden rounded-2xl border">
      <div className="flex">
        {/* Spine */}
        <div className="bg-accent w-2 shrink-0 md:w-3" />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

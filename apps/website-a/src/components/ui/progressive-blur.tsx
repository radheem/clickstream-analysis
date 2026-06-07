import { cn } from '@/lib/utils';

export function ProgressiveBlur({
  className,
  scrimOpacity = 50,
  height = 40,
}: {
  className?: string;
  scrimOpacity?: number;
  /** Percentage of parent height the blur covers (default 40) */
  height?: number;
}) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 bottom-0',
        className,
      )}
      style={{ height: `${height}%` }}
    >
      {/* Dark scrim for text contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent"
        style={
          {
            '--tw-gradient-to': `rgb(0 0 0 / ${scrimOpacity}%)`,
          } as React.CSSProperties
        }
      />
      {/* Warm accent tint */}
      <div
        className="bg-accent/10 absolute inset-0"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 50%, black)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(1px)',
          maskImage: 'linear-gradient(to bottom, transparent, black 25%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(2px)',
          maskImage: 'linear-gradient(to bottom, transparent 20%, black 45%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(4px)',
          maskImage: 'linear-gradient(to bottom, transparent 40%, black 65%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(8px)',
          maskImage: 'linear-gradient(to bottom, transparent 60%, black 85%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(16px)',
          maskImage: 'linear-gradient(to bottom, transparent 80%, black)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(32px)',
          maskImage: 'linear-gradient(to bottom, transparent 90%, black)',
        }}
      />
    </div>
  );
}

interface Props {
  items: string[];
}

export default function Marquee({ items }: Props) {
  // Duplicate items so the animation loops seamlessly
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="py-12 sm:py-16 border-y border-ink/10 bg-cream-deep/40">
      <div className="marquee">
        <div className="marquee__track">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="font-serif-italic text-3xl sm:text-4xl text-ink/85 whitespace-nowrap flex items-center gap-12"
            >
              {item}
              <span className="text-gold not-italic font-sans text-xl">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
type AdSlotProps = {
  id: string;
  label: string;
  minHeight?: number;
};

export function AdSlot({ id, label, minHeight = 250 }: AdSlotProps) {
  const enabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';

  if (!enabled) {
    return null;
  }

  return (
    <aside className="ad-slot" style={{ minHeight }} aria-label={label}>
      <ins
        className="adsbygoogle"
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={id}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}

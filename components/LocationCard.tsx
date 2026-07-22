const address = {
  label: "Casa",
  street: "R. Cap. Olavo, 1111",
  neighborhood: "Aerolândia",
  city: "Fortaleza",
  state: "CE",
  zip: "60850-685",
  lat: -3.785,
  lon: -38.475,
};

const fullAddress = `${address.street} - ${address.neighborhood}, ${address.city} - ${address.state}, ${address.zip}`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${address.lon - 0.01},${address.lat - 0.01},${address.lon + 0.01},${address.lat + 0.01}&layer=mapnik&marker=${address.lat},${address.lon}`;

export default function LocationCard() {
  return (
    <div className="w-full mt-6 bg-secondary/50 rounded-xl border border-border overflow-hidden">
      <div className="h-40 bg-secondary overflow-hidden">
        <iframe
          src={osmEmbed}
          width="100%"
          height="100%"
          style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa da localização"
        />
      </div>
      <div className="p-4">
        <p className="text-sm font-medium text-foreground">
          📍 {address.label}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{fullAddress}</p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-xs text-primary hover:underline"
        >
          Abrir no Google Maps →
        </a>
      </div>
    </div>
  );
}

export default function ProfileHeader({
  avatar,
  name,
  bio,
}: {
  avatar?: string;
  name: string;
  bio: string;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="w-24 h-24 rounded-full object-cover ring-2 ring-sky-400/50"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-sky-400/20 flex items-center justify-center text-sky-400 text-3xl font-bold ring-2 ring-sky-400/30">
          {initials}
        </div>
      )}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-slate-50">{name}</h1>
        <p className="text-sm text-slate-400 max-w-xs">{bio}</p>
      </div>
    </div>
  );
}

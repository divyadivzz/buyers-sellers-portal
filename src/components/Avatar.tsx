type AvatarProps = {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

export function Avatar({ src, name, size = 'md' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getColorFromName = (name: string) => {
    const colors = [
      'bg-gradient-to-br from-teal-400 to-teal-600',
      'bg-gradient-to-br from-violet-400 to-violet-600',
      'bg-gradient-to-br from-blue-400 to-blue-600',
      'bg-gradient-to-br from-pink-400 to-pink-600',
      'bg-gradient-to-br from-orange-400 to-orange-600',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover ring-2 ring-white shadow-md`}
      />
    );
  }

  return (
    <div className={`${sizes[size]} rounded-full ${getColorFromName(name)} flex items-center justify-center text-white shadow-md ring-2 ring-white`}>
      {getInitials(name)}
    </div>
  );
}

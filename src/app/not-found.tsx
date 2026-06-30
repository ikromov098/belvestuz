import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center px-4"
      style={{ backgroundColor: '#004445', minHeight: '60vh', padding: '80px 16px' }}
    >
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-4"
        style={{ color: '#C9A84C' }}
      >
        Ошибка 404
      </p>
      <h1
        className="text-5xl font-extrabold mb-4"
        style={{ color: '#FFF0CC' }}
      >
        404
      </h1>
      <h2
        className="text-2xl font-bold mb-4"
        style={{ color: '#FFF0CC' }}
      >
        Страница не найдена
      </h2>
      <p
        className="text-sm mb-8"
        style={{ color: 'rgba(255,240,204,0.70)', maxWidth: 380 }}
      >
        Запрашиваемая страница не существует или была перемещена.
      </p>
      <Link
        href="/"
        className="px-8 py-3 rounded-full text-sm font-semibold"
        style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}
      >
        Вернуться на главную
      </Link>
    </div>
  );
}

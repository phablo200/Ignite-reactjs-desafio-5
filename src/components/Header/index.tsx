import Link from 'next/link';

export default function Header() {
  return (
    <Link href="/">
      <img src="logo.svg" alt="logo" />
    </Link>
  );
}

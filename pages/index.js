import Link from 'next/link';

export default function IndexPage() {
  return (
    <div className="main">
      <Link href="/experience/experience">
        <a>Experience</a>
      </Link>
    </div>
  );
}

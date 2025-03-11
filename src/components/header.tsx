import Link from "next/link";

export function Header() {
  return (
    <header className="p-8">
      <nav>
        <ul className="flex gap-8 justify-center items-center">
          <li>
            <Link className="text-3xl p-4" href="/">
              Accueil
            </Link>
          </li>
          <li>
            <Link className="text-3xl p-4" href="/board">
              Score
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

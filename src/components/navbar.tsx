import Link from "next/link";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="flex gap-4">
      <Button variant={"ghost"} asChild>
        <Link href="/">Home</Link>
      </Button>
      <Button variant={"ghost"} asChild>
        <Link href="/board">Réponses</Link>
      </Button>
    </header>
  );
}

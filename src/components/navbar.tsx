import Link from "next/link";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header>
      <Button variant={"ghost"} asChild>
        <Link href="/">Home</Link>
      </Button>
    </header>
  );
}

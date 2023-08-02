import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className=" text-center">Hello</h1>
      <Link href={"/play-game"} as={"/play-game"}>
        play game
      </Link>
    </main>
  );
}

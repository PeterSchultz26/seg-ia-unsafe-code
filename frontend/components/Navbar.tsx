"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <Link href="/" className="font-bold text-xl">DigitalShop</Link>
      <div className="flex gap-4">
        <Link href="/">Loja</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Cadastro</Link>
      </div>
    </nav>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
      fetch("http://localhost:3100/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      })
        .then(res => {
          if (!res.ok) throw new Error("Login inválido");
          return res.json();
        })
        .then(data => {
          localStorage.setItem("logged", "true");
          localStorage.setItem("user", JSON.stringify(data.user));
          alert("Login realizado com sucesso!");
          router.push("/shop");
        })
        .catch(() => alert("Email ou senha incorretos"));
  };

  return (
    <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />
      <button className="w-full bg-blue-600 text-white p-2 rounded">Entrar</button>
    </form>
  );
}

"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ nome: "", email: "", cpf: "", endereco: "", senha: "" });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(form));
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Cadastro</h2>
      {["nome", "email", "cpf", "endereco", "senha"].map((field) => (
        <input
          key={field}
          type={field === "senha" ? "password" : "text"}
          name={field}
          placeholder={field.toUpperCase()}
          value={(form as any)[field]}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />
      ))}
      <button className="w-full bg-blue-600 text-white p-2 rounded">Cadastrar</button>
    </form>
  );
}

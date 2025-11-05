"use client";
import { useState, useEffect } from "react";

export default function ShopPage() {
  const [user, setUser] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("logged");
    if (logged) setUser(JSON.parse(localStorage.getItem("user") || "{}"));
  }, []);

  if (!user) return <p>Faça login para acessar a loja.</p>;

  const handlePurchase = () => {
    setSuccess(true);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Loja Digital</h2>
      <p>Bem-vindo, <strong>{user.nome}</strong>!</p>
      <div className="mt-4">
        <p className="mb-2">Produto: Ebook "Como Aprender Next.js"</p>
        <p className="mb-2">Preço: R$ 49,90</p>
        {!success ? (
          <button onClick={handlePurchase} className="bg-green-600 text-white p-2 rounded">
            Pagar via Pix (chave: digitalshop@pix.com)
          </button>
        ) : (
          <p className="text-green-600 mt-2">Compra confirmada! 🎉</p>
        )}
      </div>
    </div>
  );
}

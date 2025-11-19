"use client";
import { useState, useEffect } from "react";

export default function ShopPage() {
  const [user, setUser] = useState<any>(null);
  const [product, setProduct] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("logged");
    if (logged) setUser(JSON.parse(localStorage.getItem("user") || "{}"));

    // buscar produtos
    fetch("http://localhost:3100/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setProduct(data[0])
      }) // como só tem um produto
      .catch(() => console.error("Erro ao carregar produtos"));
  }, []);

  if (!user) return <p>Faça login para acessar a loja.</p>;

  if (!product) return <p>Carregando produto...</p>;

  const handlePurchase = () => {
    fetch("http://localhost:3100/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        productId: product.id,
      }),
    })
      .then(res => res.json())
      .then(() => setSuccess(true))
      .catch(() => alert("Erro ao finalizar compra"));
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Loja Digital</h2>
      <p>Bem-vindo, <strong>{user.nome}</strong>!</p>

      <div className="mt-4">
        <p className="mb-2">Produto: {product.nome}</p>
        <p className="mb-2">Descrição: {product.descricao}</p>
        <p className="mb-2">Preço: R$ {product.preco.toFixed(2)}</p>

        {!success ? (
          <button
            onClick={handlePurchase}
            className="bg-green-600 text-white p-2 rounded"
          >
            Pagar via Pix (chave: digitalshop@pix.com)
          </button>
        ) : (
          <p className="text-green-600 mt-2">Compra confirmada! 🎉</p>
        )}
      </div>
    </div>
  );
}

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}

const Home = () => {
  const { addItemCart } = useContext(CartContext);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function getProducts() {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    }

    getProducts();
  }, []);

  function handleAddCartItem(product: Product) {
    toast.success("Produto adicionado ao carrinho!", {
      style: {
        borderRadius: 10,
        backgroundColor: "#121212",
        color: "#FFF",
      },
    });
    addItemCart(product);
  }

  return (
    <div>
      <main>
        <h1>Produtos</h1>
        <div>
          {products.map((product) => (
            <section key={product.id}>
              <img src={product.cover} alt={product.title} />
              <p>{product.title}</p>
              <div>
                <strong>{product.price}</strong>
                <button
                  className="cursor-pointer"
                  onClick={() => handleAddCartItem(product)}
                >
                  <BsCartPlus size={20} />
                </button>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;

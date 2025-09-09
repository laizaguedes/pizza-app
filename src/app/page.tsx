import { Header } from "@/components/layout/header";
import { api } from "@/lib/axios";
import { PizzaList } from "@/components/home/pizza-list"

export default async function Page() {
  const pizzaReq = await api.get('/pizzas');
  const pizzas = pizzaReq.data.pizzas ?? [];

  return (
    <div>
      <Header />
      <main className="container mx-auto mb-10">
          <PizzaList pizzas={pizzas} />
      </main>
    </div>
  );
}
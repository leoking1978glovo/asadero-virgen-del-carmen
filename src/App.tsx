import { Routes, Route } from "react-router";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/CartDrawer";
import { ChatWidget } from "@/components/ChatWidget";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";
import Home from "./pages/Home";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <CartDrawer />
      <ChatWidget />
      <ScrollToTop />
      <Toaster />
    </CartProvider>
  );
}
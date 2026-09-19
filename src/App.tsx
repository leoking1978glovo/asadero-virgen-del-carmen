import { Routes, Route } from "react-router";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/CartDrawer";
import FloatingAvatar from "@/components/FloatingAvatar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";
import Home from "./pages/Home";
import Legal from "./pages/Legal";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aviso-legal" element={<Legal kind="aviso-legal" />} />
        <Route path="/privacidad" element={<Legal kind="privacidad" />} />
        <Route path="/cookies" element={<Legal kind="cookies" />} />
      </Routes>
      <CartDrawer />
      <FloatingAvatar />
      <ScrollToTop />
      <Toaster />
    </CartProvider>
  );
}
import NewHeader from "@/components/NewHeader";
import NewHeroSection from "@/components/NewHeroSection";
import NewProductsSection from "@/components/NewProductsSection";
import WhyUsSection from "@/components/WhyUsSection";
import PlaceOrderSection from "@/components/PlaceOrderSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NewHeader />
      <main>
        <NewHeroSection />
        <NewProductsSection />
        <WhyUsSection />
        <PlaceOrderSection />
      </main>
      <Footer />
    </div>
  );
}

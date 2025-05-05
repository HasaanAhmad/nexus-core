import Header from "@/components/Header"
import Hero from "@/components/Hero"
import FeatureShowcase from "@/components/FeatureShowcase"
import ModuleShowcase from "@/components/ModuleShowcase"
import ProductVisuals from "@/components/ProductVisuals"
import Pricing from "@/components/Pricing"
import Testimonials from "@/components/Testimonials"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"

const page = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FeatureShowcase />
      <ModuleShowcase />
      <ProductVisuals />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}

export default page
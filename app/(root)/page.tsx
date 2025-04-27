import BrandSlide from "@/components/components_landing/BrandSlide"
import CTA from "@/components/components_landing/CTA"
import Footer from "@/components/components_landing/Footer"
import Header from "@/components/components_landing/Header"
import Hero from "@/components/components_landing/Hero"
import Pricing from "@/components/components_landing/Pricing"
import ProductCard from "@/components/components_landing/ProductCard"
import ProductShowcase from "@/components/components_landing/ProductShowcase"
import Testimonials from "@/components/components_landing/Testimonials"


const page = () => {
  return (
    <div>
      <Header />
      <Hero/>
      <BrandSlide/>
      <ProductShowcase/>
      <ProductCard/>
      <Pricing/>
      <Testimonials/>
      <CTA/>
      <Footer/>
    </div>
  )
}

export default page
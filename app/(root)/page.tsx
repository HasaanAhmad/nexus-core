import Header from "@/components/Header"
import Hero from "@/components/Hero"
import BrandSlide from "@/components/BrandSlide"
import ProductShowcase from "@/components/ProductShowcase"
import ProductCard from "@/components/ProductCard"
import Pricing from "@/components/Pricing"
import Testimonials from "@/components/Testimonials"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"



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
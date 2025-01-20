import AppDownloadSection from "./_components/download-app"
import FeaturesSection from "./_components/features"
import HeroSection from "./_components/hero"
import TestimonialsSection from "./_components/testimonial"

export default async function IndexPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <AppDownloadSection />
    </>
  )
}

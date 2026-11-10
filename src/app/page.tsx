import { Architecture } from "@/components/site/Architecture"
import { Archive } from "@/components/site/Archive"
import { Atmosphere } from "@/components/site/Atmosphere"
import { Hero } from "@/components/site/Hero"
import { Playback } from "@/components/site/Playback"
import { SiteFooter } from "@/components/site/SiteFooter"
import { SiteHeader } from "@/components/site/SiteHeader"
import { Transmit } from "@/components/site/Transmit"

export default function Page() {
  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <Atmosphere />
      <Playback />
      <div className="frame">
        <SiteHeader />
        <main id="content">
          <Hero />
          <Architecture />
          <Archive />
          <Transmit />
        </main>
        <SiteFooter />
      </div>
    </>
  )
}

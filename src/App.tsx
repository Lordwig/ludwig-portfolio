import Background from './components/Background'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Statement from './components/Statement'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Honors from './components/Honors'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandMenu from './components/CommandMenu'
import CornerShape from './components/CornerShape'

export default function App() {
  return (
    <>
      <Background />
      <Nav />
      <main>
        <Hero />
        <Statement />
        <About />
        <Skills />
        <Projects />
        <Honors />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <CommandMenu />
      <CornerShape />
    </>
  )
}
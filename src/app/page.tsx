"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Eye, Zap, Lock, ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function FuturisticCybersecurityLanding() {
  const [typedText, setTypedText] = useState("")
  const [currentLogIndex, setCurrentLogIndex] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const heroRef = useRef<HTMLElement>(null)
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})

  const fullText = "Your Network Has a Pulse. We Monitor It."
  const logs = [
    "&gt; SCANNING NETWORK TRAFFIC...",
    "&gt; ANOMALY DETECTED: SUSPICIOUS EMAIL",
    "&gt; ANALYZING BEHAVIORAL PATTERNS...",
    "&gt; THREAT LEVEL: HIGH",
    "&gt; INITIATING COUNTERMEASURES...",
    "&gt; PHISHING ATTEMPT BLOCKED",
    "&gt; SYSTEM SECURE",
  ]

  // Typing animation effect
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  // Log animation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLogIndex((prev) => (prev + 1) % logs.length)
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    Object.values(sectionsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Secure form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono overflow-x-hidden">
      {/* Cinematic Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Matrix-like background pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h-2zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Animated lines */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-pulse"
                style={{
                  top: `${20 + i * 15}%`,
                  left: "-100%",
                  width: "200%",
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: "3s",
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="inline-block">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up">
            Real-time anomaly detection that stops phishing before it breathes.
          </p>

          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-200 px-12 py-6 text-xl font-bold rounded-none transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-pulse-slow"
          >
            GET SECURED
          </Button>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-gray-500" />
          </div>
        </div>
      </section>

      {/* Interactive Visual Section */}
      <section
        id="what-we-do"
        ref={(el) => (sectionsRef.current["what-we-do"] = el)}
        className="py-20 px-4 bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">WHAT WE DO</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "DETECT", icon: Eye, desc: "Monitors every behavioral anomaly in real time" },
              { title: "ANALYZE", icon: Shield, desc: "AI-powered pattern recognition and threat assessment" },
              { title: "INTERCEPT", icon: Zap, desc: "Blocks malicious activities before they execute" },
              { title: "PROTECT", icon: Lock, desc: "Maintains continuous security posture" },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`group p-8 bg-black border border-gray-700 hover:border-white transition-all duration-500 transform ${
                  visibleSections.has("what-we-do") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <item.icon className="h-16 w-16 mb-6 text-white group-hover:animate-pulse" />
                <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-gray-400 group-hover:text-white transition-colors duration-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section id="features" ref={(el) => (sectionsRef.current["features"] = el)} className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-20">
            {[
              {
                title: "SELF-LEARNING AI ENGINE",
                desc: "Neural networks that evolve with every threat, becoming smarter and more precise with each detection.",
              },
              {
                title: "BEHAVIORAL FINGERPRINTING",
                desc: "Maps unique user patterns to identify anomalies that traditional security systems miss.",
              },
              {
                title: "ZERO TRUST EMAIL FILTERS",
                desc: "Every message is treated as potentially hostile until proven safe through multi-layer analysis.",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:grid-flow-col-dense" : ""}`}
              >
                <div
                  className={`${
                    visibleSections.has("features")
                      ? "translate-x-0 opacity-100"
                      : index % 2 === 0
                        ? "-translate-x-8 opacity-0"
                        : "translate-x-8 opacity-0"
                  } transition-all duration-700`}
                  style={{ transitionDelay: `${index * 300}ms` }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">{feature.title}</h3>
                  <p className="text-xl text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>

                <div
                  className={`${index % 2 === 1 ? "md:order-first" : ""} ${
                    visibleSections.has("features")
                      ? "translate-x-0 opacity-100"
                      : index % 2 === 0
                        ? "translate-x-8 opacity-0"
                        : "-translate-x-8 opacity-0"
                  } transition-all duration-700`}
                  style={{ transitionDelay: `${index * 300 + 200}ms` }}
                >
                  <div className="h-64 bg-gray-900 border border-gray-700 flex items-center justify-center group hover:border-white transition-colors duration-300">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 border-2 border-gray-600 rounded-full flex items-center justify-center group-hover:border-white group-hover:animate-spin transition-all duration-300">
                        <div className="w-12 h-12 bg-gray-600 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                      </div>
                      <div className="text-gray-500 group-hover:text-white transition-colors duration-300">
                        VISUAL SIMULATION
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Simulation */}
      <section
        id="simulation"
        ref={(el) => (sectionsRef.current["simulation"] = el)}
        className="py-20 px-4 bg-gray-900"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">WHY IT MATTERS</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-black p-8 border border-gray-700 font-mono">
                <div className="text-green-400 mb-4">THREAT SIMULATION ACTIVE</div>
                <div className="space-y-2 text-sm">
                  {logs.slice(0, currentLogIndex + 1).map((log, index) => (
                    <div
                      key={index}
                      className={`${index === currentLogIndex ? "text-white animate-pulse" : "text-gray-500"}`}
                    >
                      {log}
                    </div>
                  ))}
                  <div className="text-white animate-pulse">_</div>
                </div>
              </div>
            </div>

            <div
              className={`${
                visibleSections.has("simulation") ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              } transition-all duration-700`}
            >
              <h3 className="text-3xl font-bold mb-6 text-white">IMAGINE THIS RUNNING SILENTLY 24/7 ON YOUR SYSTEMS</h3>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                Every second, our AI processes thousands of data points, learning patterns, and stopping threats before
                they can cause damage. This is just a glimpse of what happens behind the scenes.
              </p>
              <Button className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-bold rounded-none">
                SEE FULL CAPABILITIES
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bold CTA Banner */}
      <section className="py-20 px-4 bg-white text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-12 leading-tight">
            THE THREAT DOESN'T SLEEP.
            <br />
            <span className="text-gray-600">NEITHER DO WE.</span>
          </h2>

          <Button
            size="lg"
            className="bg-black text-white hover:bg-gray-800 px-12 py-6 text-xl font-bold rounded-none transition-all duration-300 hover:scale-105 animate-pulse-slow"
          >
            START THE WATCH
          </Button>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" ref={(el) => (sectionsRef.current["contact"] = el)} className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">SECURE INQUIRY</h2>
            <p className="text-xl text-gray-400">
              Ready to fortify your digital perimeter? Let's establish a secure connection.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <Input
                  type="text"
                  name="name"
                  placeholder="NAME"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-6 bg-transparent border-b-2 border-gray-700 focus:border-white text-white placeholder-gray-500 rounded-none focus:ring-0 transition-colors duration-300"
                  required
                />
              </div>

              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  placeholder="EMAIL"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-6 bg-transparent border-b-2 border-gray-700 focus:border-white text-white placeholder-gray-500 rounded-none focus:ring-0 transition-colors duration-300"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <Input
                type="text"
                name="company"
                placeholder="COMPANY"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full p-6 bg-transparent border-b-2 border-gray-700 focus:border-white text-white placeholder-gray-500 rounded-none focus:ring-0 transition-colors duration-300"
              />
            </div>

            <div className="relative">
              <Textarea
                name="message"
                placeholder="MESSAGE"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-6 bg-transparent border-b-2 border-gray-700 focus:border-white text-white placeholder-gray-500 rounded-none focus:ring-0 resize-none transition-colors duration-300"
              />
            </div>

            <div className="text-center">
              <Button
                type="submit"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-12 py-6 text-lg font-bold rounded-none transition-all duration-300"
              >
                SEND SECURE REQUEST
              </Button>

              <p className="text-sm text-gray-500 mt-6">Your information never leaves our secure vaults.</p>
            </div>
          </form>
        </div>
      </section>

      {/* Terminal Footer */}
      <footer className="py-12 px-4 bg-gray-900 border-t border-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-sm text-gray-500 space-y-2">
            <div>&gt; SYSTEM STATUS: STABLE</div>
            <div>&gt; FIREWALL ACTIVE — AI MONITORING ON</div>
            <div>&gt; CYBERDEFENSE.AI © {new Date().getFullYear()}</div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-gray-800">
            <div className="text-2xl font-bold text-white mb-4 md:mb-0">CYBERDEFENSE.AI</div>

            <div className="flex space-x-8 text-gray-500">
              <a href="#" className="hover:text-white transition-colors duration-200">
                TERMS
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                PRIVACY
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.5s both;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  )
}

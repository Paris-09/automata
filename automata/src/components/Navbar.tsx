"use client"
import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Added this interface
interface NavbarProps {
  handleNavigate: (id: string) => void;
}

export function Navbar({ handleNavigate }: NavbarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    let ticking = false;
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) < 5) {
        ticking = false;
        return;
      }
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(controlNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 z-50 w-full flex justify-center transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full" 
      )}
    >
      <div className="flex h-16 w-full items-center justify-between px-20 bg-gray-100 backdrop-blur-md border-gray-200 shadow-sm">
        
        {/* Logo */}
        <div className="font-bold text-xl tracking-tighter shrink-0" onClick={() => navigate("/")}>
          AUTOMATA<span className="font-light">LAB</span>
        </div>

        {/* Right Aligned Navigation Group */}
        <div className="flex items-center gap-10">
          
          {/* Subcategory Text Links */}
          <nav className="flex items-center gap-8">
            <span 
              onClick={() => handleNavigate("selector")}
              className="text-xs font-semibold uppercase tracking-widest hover:text-black cursor-pointer transition-all hover:[text-shadow:_0.5px_0_0_currentColor]"
            >
              Selector
            </span>
            <span 
              onClick={() => handleNavigate("configuration")}
              className="text-xs font-semibold uppercase tracking-widest hover:text-black cursor-pointer transition-all hover:[text-shadow:_0.5px_0_0_currentColor]"
            >
              Configuration
            </span>
          </nav>

          {/* Primary Action */}
          <Button 
            variant="default" 
            size="sm"
            className="bg-[#1a1a1a] text-white hover:bg-[#74DCFF] hover:text-black rounded-lg px-6 text-xs font-bold transition-all shrink-0"
            onClick={() => handleNavigate("live")}
          >
            User Manual
          </Button>
        </div>
      </div>
    </header>
  )
}
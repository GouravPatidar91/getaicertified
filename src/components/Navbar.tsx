import { useState, type MouseEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo2.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const goToHowItWorks = (e?: MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();

    // Close mobile menu if open
    setIsOpen(false);

    // If already on home page, just scroll to the section
    if (location.pathname === "/") {
      const el = document.getElementById("HowItWorks");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // Otherwise navigate to home and then scroll after a short delay to allow DOM to render
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("HowItWorks");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 120);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="GetAICertified" className="h-10 w-auto" />
            <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
              GetAICertified
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </a>
            <a
              href="Curriculum"
              onClick={(e) => goToHowItWorks(e)}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Curriculum
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors font-medium">
              Pricing
            </a>
            <a href="#verify" className="text-foreground hover:text-primary transition-colors font-medium">
              Verify Certificate
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            {user ? (
              <Button variant="hero" size="default" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
            ) : (
              <Button variant="hero" size="default" onClick={() => navigate('/signup')}>
                Enroll Now
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fade-in">
            <a
              href="#"
              className="block px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="Curriculum"
              onClick={(e) => goToHowItWorks(e)}
              className="block px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors font-medium"
            >
              Curriculum
            </a>
            <a
              href="#pricing"
              className="block px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors font-medium"
            >
              Pricing
            </a>
            <a
              href="#verify"
              className="block px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors font-medium"
            >
              Verify Certificate
            </a>
            <div className="pt-2">
              {user ? (
                <Button variant="hero" size="default" className="w-full" onClick={() => navigate('/dashboard')}>
                  Dashboard
                </Button>
              ) : (
                <Button variant="hero" size="default" className="w-full" onClick={() => navigate('/signup')}>
                  Enroll Now
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll smoothly to top every time route changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null; // this component doesn't render anything
}

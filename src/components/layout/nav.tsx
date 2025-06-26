import { navOptions } from "@/settings/nav-options";
import { useCallback, useState } from "react";
import { Link } from "react-scroll";
import { MenuResponsive } from "./menu-responsive";
import Image from "next/image";

export const Nav = () => {
  const [isSticky] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeSection] = useState("header-section");

  const handleToggle = useCallback(() => {
    setIsMenuActive((_prev) => !_prev);
  }, [setIsMenuActive]);

  const goHome = useCallback(() => {
    const el = document.getElementById("header-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <nav className={`nav-menu ${isSticky || isMenuActive ? "sticky" : ""}`}>
      <div className="nav-menu-content container">
        <div className="logo-header  flex items-center">
          <Image
            src="/finandy.png"
            width={50}
            height={50}
            className="img-fluid rounded-full mr-3 border-2 border-[#f58220]"
            alt=""
          />
          <div
            className="title-name"
            onClick={goHome}
            style={{ cursor: "pointer" }}
          >
            <h1>
              Calculadora
              <span>Finandy</span>
            </h1>
          </div>
        </div>
        <ul className="nav-options">
          {navOptions.map((opt) => {
            const { title, ...options } = opt;
            return (
              <Link
                {...options}
                key={opt.to}
                className={`option-header-item ${
                  activeSection === opt.to ? "active" : ""
                }`}
              >
                {title}
              </Link>
            );
          })}
        </ul>
        {isMenuActive && <MenuResponsive handleToggle={handleToggle} />}
        <a
          className={`${isMenuActive ? "active" : ""} nav-button`}
          onClick={handleToggle}
        >
          <span></span>
        </a>
      </div>
    </nav>
  );
};

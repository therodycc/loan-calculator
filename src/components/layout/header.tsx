import Image from "next/image";
import { Nav } from "./nav";

export const Header = () => {
  return (
    <div className="header-section mb-5" id="header-section">
      <Nav />
      <div className="pt-[105px]"></div>
      <div className="container m-auto flex items-center max-lg:flex-col max-lg:items-start bg-[#f58220] p-5 rounded-xl">
        <div className="container-logo-img-fluid ml-6">
          <Image src="/finandy.png" width={100} height={100} alt="" />
        </div>
        <div className="text-[#FDF7ED] pl-6 py-4">
          <h2 className="text-3xl font-bold">Calculadora de Préstamos</h2>
          <p className="mt-4">Estima fácilmente el monto de tus cuotas mensuales, los intereses y el total a pagar según el monto solicitado, tasa de interés y plazo del préstamo.</p>
        </div>
      </div>
    </div>
  );
};

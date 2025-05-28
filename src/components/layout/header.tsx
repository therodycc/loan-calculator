import { Nav } from "./nav";

export const Header = () => {
  return (
    <div className="header-section pb-5 pt-5" id="header-section">
      <Nav />
      <div className="pt-[115px]"></div>
      <div className="container m-auto flex items-center max-lg:flex-col max-lg:items-start">
        <div className="container-logo-img-fluid ml-6">
          <img src="finandy.png" className="img-fluid" alt="" />
        </div>
        <div className="text-[#FDF7ED] pl-6 py-4">
          <h2 className="text-3xl font-bold">Calculadora de Préstamos</h2>
          <p className="mt-4">Estima fácilmente el monto de tus cuotas mensuales, los intereses y el total a pagar según el monto solicitado, tasa de interés y plazo del préstamo.</p>
        </div>
      </div>
    </div>
  );
};

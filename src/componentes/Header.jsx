// import React from "react";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const pageTitles = [
    { path: "/", title: "Não sabe qual filme ver?" },
    { path: "/avaliacao", title: "Oque achou desse filme?" },
    { path: "/indicacao", title: "Que tal ver..." },
  ];
  // Busca o título correspondente à rota atual
  const currentPage = pageTitles.find(
    (page) => page.path === location.pathname,
  );

  // Define um título padrão caso a rota não esteja na lista
  const headerTitle = currentPage ? currentPage.title : "Página Desconhecida";
  return (
    <header className={styles.headerContainer}>
      <h1 className={`titulos ${styles.header}`}>{headerTitle}</h1>
    </header>
  );
};

export default Header;

import { FC, ReactNode } from "react";
import Footer from "@c./layout/Footer";
import Header from "@c./layout/Header";

interface Props {
  children?: ReactNode | ReactNode[];
}

let Layout: FC<Props> = ({ children }) => {
  return (
    <div className="w-full from-pink-200 to-blue-400 bg-gradient-to-t">
      <Header />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

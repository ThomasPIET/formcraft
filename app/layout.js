import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";

export const metadata = {
  title: "Formcraft",
  description: "Créez et partagez des sondages facilement !.",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

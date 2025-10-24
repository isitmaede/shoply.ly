import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets:['arabic'],
  weight:['200' , '400' , '800']
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${tajawal.className} `}>
        {children}
      </body>
    </html>
  );
}

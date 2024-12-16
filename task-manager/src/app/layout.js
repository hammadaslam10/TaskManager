"use client"

import { Provider } from "react-redux";
import store from "@/redux/store";
import { GlobalStyle } from "@/styles/GlobalStyles"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <GlobalStyle />
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}

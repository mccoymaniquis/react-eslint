import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <main className="h-screen w-screen">
        <AppRoutes />
      </main>

    </BrowserRouter>
  );
}

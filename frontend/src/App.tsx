import Home from "./app/page";
import { Toaster } from "@/components/ui/toaster"
// src/App.jsx
function App() {
  return (
    <div className="p-4">
      <Home />
     <Toaster />
    </div>
  );
}

export default App;
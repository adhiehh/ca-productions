import { Routes, Route } from "react-router-dom";
import Home from "./routes/index";
import ProjectDetail from "./routes/projects.$slug";
import NotFound from "./routes/not-found";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

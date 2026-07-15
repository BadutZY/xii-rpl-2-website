import { Routes, Route, useLocation } from "react-router-dom";

import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollToTop from "@/components/ScrollToTop";

import HomePage from "@/pages/Home";
import GalleryPage from "@/pages/Gallery";
import StudentsPage from "@/pages/Students";
import SchedulePage from "@/pages/Schedule";
import VideosPage from "@/pages/Videos";
import VideoWatchPage from "@/pages/VideoWatch";
import NotFoundPage from "@/pages/NotFound";

export default function App() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/videos/:id" element={<VideoWatchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}


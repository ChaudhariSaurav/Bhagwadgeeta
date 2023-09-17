import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChapterDetailsget from "../pages/ChapterDetailsget";
import BhagavadGitaChapters from "../pages/chapterList";
import VerseDetails from "../pages/slok";
import VerseCommentary from "../pages/commentaries";

function UserRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BhagavadGitaChapters />} />
          <Route
            path="/chapter/:chapterNumber/verse/:verseId"
            element={<VerseDetails />}
          />
          <Route
            path="/chapter/:chapterNumber/verse/:verseId"
            element={<VerseCommentary />}
          />
          <Route
            path="/chapter/:chapterNumber"
            element={<ChapterDetailsget />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default UserRoutes;

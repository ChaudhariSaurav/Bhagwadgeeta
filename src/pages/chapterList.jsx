import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BhagavadGitaChapters = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the URL of the Bhagavad Gita chapters API
    const apiUrl = "https://bhagavadgitaapi.in/chapters/";

    // Use the fetch API to get the chapters
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setChapters(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching chapters:", error);
      });
  }, []);

  return (
    <div>
      <h2>Bhagavad Gita Chapters</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {chapters.map((chapter) => (
            <li key={chapter.chapter_number} style={{ color: "white" }}>
              <Link to={`/chapter/${chapter.chapter_number}`}>
                Chapter {chapter.chapter_number}: {chapter.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BhagavadGitaChapters;

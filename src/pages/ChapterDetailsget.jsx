import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ChapterDetailsget() {
  const { chapterNumber } = useParams();
  console.log({ chapterNumber });
  const [chapterDetails, setChapterDetails] = useState([]);

  useEffect(() => {
    const apiUrl = `https://bhagavadgitaapi.in/chapter/${chapterNumber}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setChapterDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching chapter details:", error);
      });
  }, [chapterNumber]);

  const fetchdata = Object.entries(chapterDetails).map(
    ([index, datafetch]) => ({
      id: index,
      ...datafetch,
    })
  );
  console.log({ fetchdata });

  if (!chapterDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>
        Chapter {chapterDetails.chapter_number}: {chapterDetails?.name}
      </h3>
      <h3>
        English {chapterDetails.chapter_number}: {chapterDetails?.summary?.en}
      </h3>
      <h3>
        Hindi {chapterDetails.chapter_number}: {chapterDetails?.summary?.hi}
      </h3>

      <Link to={"/"}>
        {" "}
        <button>Back</button>{" "}
      </Link>
    </div>
  );
}

export default ChapterDetailsget;

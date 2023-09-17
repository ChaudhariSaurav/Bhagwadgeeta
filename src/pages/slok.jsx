import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerseDetails() {
  const { chapterNumber, verseId } = useParams();
  const [commentaries, setCommentaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerseData = async () => {
      const commentariesUrl = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/verses/${verseId}/`;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "ec765a5ec2msh1826f77c9644f02p11198djsnb8c96190a329",
          "X-RapidAPI-Host": "bhagavad-gita3.p.rapidapi.com",
        },
      };

      try {
        const commentariesResponse = await fetch(commentariesUrl, options);
        const commentariesResult = await commentariesResponse.json();

        setCommentaries(commentariesResult.commentaries || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchVerseData();
  }, [chapterNumber, verseId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul>
        {commentaries.map((commentary, index) => (
          <li key={index}>
            <div className="flex-col m-4 p-3 font-black  verse_text bg-slate-300 text-gray-900 border border-slate-500 rounded-xl ">
              {commentary.description}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VerseDetails;

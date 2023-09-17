import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BhagavadGitaChapters() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?limit=18",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "ec765a5ec2msh1826f77c9644f02p11198djsnb8c96190a329",
              "X-RapidAPI-Host": "bhagavad-gita3.p.rapidapi.com",
            },
          }
        );
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data.map((chapter) => (
            <div key={chapter.chapter_number}>
              <div className="border border-slate-300 p-2 m-2 bg-slate-300 text-gray-900 rounded-xl">
                <Link to={`/chapter/${chapter.chapter_number}`}>
                  Chapter {chapter.chapter_number}: {chapter.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BhagavadGitaChapters;

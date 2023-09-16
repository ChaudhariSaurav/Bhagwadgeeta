import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerseDetails() {
  const { chapterNumber } = useParams();
  const [verseDetails, setVerseDetails] = useState(null);

  useEffect(() => {
    const apiUrl = `https://bhagavadgitaapi.in/slok/${chapterNumber}/1`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setVerseDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching verse details:", error);
      });
  }, [chapterNumber]);

  const renderVerseDetails = () => {
    if (!verseDetails) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h2>Chapter {chapterNumber},</h2>
        <p>{verseDetails.text}</p>
        <p>{verseDetails.text_hi}</p>
      </div>
    );
  };

  return <div>{renderVerseDetails()}</div>;
}

export default VerseDetails;

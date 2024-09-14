import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Center,
  Spinner,
  Text,
  VStack,
  Heading,
  Stack,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
} from "@chakra-ui/react";
import { Loader } from "lucide-react"; // Import lucide-react icon

function ChapterDetailsget() {
  const { chapterNumber } = useParams();
  const [chapterData, setChapterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapterData = async () => {
      const chapterUrl = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/`;
      const versesUrl = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/verses/`;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "ec765a5ec2msh1826f77c9644f02p11198djsnb8c96190a329",
          "X-RapidAPI-Host": "bhagavad-gita3.p.rapidapi.com",
        },
      };

      try {
        const chapterResponse = await fetch(chapterUrl, options);
        const chapterResult = await chapterResponse.json();

        const versesResponse = await fetch(versesUrl, options);
        const versesResult = await versesResponse.json();

        setChapterData({
          chapter: chapterResult,
          verses: versesResult,
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchChapterData();
  }, [chapterNumber]);

  if (loading) {
    return (
      <Center height="100vh">
        <VStack spacing={4}>
          <Loader size={48} />
          <Text>Loading...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box p={4}>
      <Heading size="lg" textAlign="center" mb={6} color="orange.700">
        Chapter {chapterData.chapter.chapter_number}
      </Heading>
      <Heading size="xl" textAlign="center" mb={4} color="orange.500">
        {chapterData.chapter.name}
      </Heading>

      <Card mb={6} borderWidth={1} borderRadius="md" overflow="hidden" boxShadow="lg">
        <CardHeader bg="gray.200">
          <Heading size="md">Summary</Heading>
        </CardHeader>
        <CardBody>
          <Text>{chapterData.chapter.chapter_summary_hindi}</Text>
        </CardBody>
      </Card>

      <SimpleGrid columns={[1, 1, 2]} spacing={4}>
        {chapterData.verses.map((verse) => (
          <Card
            key={verse.verse_number}
            variant="outline"
            borderWidth={1}
            borderRadius="md"
            overflow="hidden"
            bg="white"
            boxShadow="lg"
          >
            <CardBody>
              <Link to={`/chapter/${chapterNumber}/verse/${verse.verse_number}`}>
                <Text fontSize="lg" fontWeight="bold" color="blue.600">
                  Verse {verse.verse_number}
                </Text>
                <Text mt={2} color="gray.600">
                  {verse.text}
                </Text>
              </Link>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default ChapterDetailsget;

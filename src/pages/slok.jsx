import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Text,
  VStack,
  Heading,
  Stack,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Button, // Import Button from Chakra UI
} from "@chakra-ui/react";
import { Loader } from "lucide-react"; // Import lucide-react icon

const versePlaceholderImage = "https://via.placeholder.com/300"; // This line can be removed if not used

function VerseDetails() {
  const { chapterNumber, verseId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [commentaries, setCommentaries] = useState([]);
  const [translation, setTranslation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerseData = async () => {
      const commentariesUrl = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/verses/${verseId}/`;

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "ec765a5ec2msh1826f77c9644f02p11198djsnb8c96190a329",
          "X-RapidAPI-Host": "bhagavad-gita3.p.rapidapi.com",
        },
      };

      try {
        const commentariesResponse = await fetch(commentariesUrl, options);
        const commentariesResult = await commentariesResponse.json();

        setCommentaries(commentariesResult.commentaries || []);
        setTranslation(commentariesResult.translations || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchVerseData();
  }, [chapterNumber, verseId]);

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
      <Button onClick={() => navigate(-1)} mb={4}> {/* Add Back Button */}
        Back
      </Button>

      <Heading size="lg" textAlign="center" mb={6} color="orange.700">
        Chapter {chapterNumber} / Verse {verseId}
      </Heading>

      <SimpleGrid columns={[1, 1, 1]} spacing={4} w="full">
        {commentaries.length > 0 && (
          <Stack spacing={4}>
            {commentaries.map((commentary, index) => (
              <Card
                key={index}
                variant="outline"
                borderWidth={1}
                borderRadius="md"
                overflow="hidden"
                bg="white"
                boxShadow="lg"
                w="full"
              >
                <CardHeader bg="gray.200" p={4}>
                  <Heading size="md">Commentary {index + 1}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{commentary.description}</Text>
                </CardBody>
              </Card>
            ))}
          </Stack>
        )}

        {translation.length > 0 && (
          <Stack spacing={4}>
            {translation.map((trans, index) => (
              <Card
                key={index}
                variant="outline"
                borderWidth={1}
                borderRadius="md"
                overflow="hidden"
                bg="white"
                boxShadow="lg"
                w="full"
              >
                <CardHeader bg="gray.200" p={4}>
                  <Heading size="md">Translation {index + 1}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{trans.text}</Text> 
                  <Text>{trans.id}</Text> 
                  <Text>{trans.language}</Text> 
                  <Text>{trans.description}</Text> 
                </CardBody>
              </Card>
            ))}
          </Stack>
        )}
      </SimpleGrid>
    </Box>
  );
}

export default VerseDetails;

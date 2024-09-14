import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Center,
  Spinner,
  Text,
  VStack,
  Heading,
  Card,
  CardBody,
  CardHeader,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { Loader } from "lucide-react"; // Import lucide-react icon

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
    <Box p={4}>
      {loading ? (
        <Center height="100vh">
          <VStack spacing={4}>
            <Loader size={48} />
            <Text>Loading...</Text>
          </VStack>
        </Center>
      ) : (
        <VStack spacing={4} align="stretch">
          <Heading size="lg">Bhagavad Gita Chapters</Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={4}>
            {data.map((chapter) => (
              <Card
                key={chapter.chapter_number}
                variant="outline"
                borderWidth={1}
                borderRadius="md"
                overflow="hidden"
                bg="white"
              >
                <CardHeader bg="gray.200" p={4}>
                  <Heading size="md">Chapter {chapter.chapter_number} - {chapter.name}</Heading>
                </CardHeader>
                <CardBody>
                  <Stack spacing={3}>
                    <Text fontSize="sm" color="gray.600">
                      Verses: {chapter.verses_count}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {chapter.chapter_summary_hindi	}
                    </Text>
                    <Link to={`/chapter/${chapter.chapter_number}`}>
                      <Text color="blue.500" _hover={{ textDecoration: "underline" }}>
                        View Details
                      </Text>
                    </Link>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      )}
    </Box>
  );
}

export default BhagavadGitaChapters;

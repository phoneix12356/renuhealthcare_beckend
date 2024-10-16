import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Test from "../Test/Test";
import { UserContext } from "../../Context/UserContext";

const Course = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionsData, setQuestionsData] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [testId, setTestId] = useState(null);
  const [score, setScore] = useState(null);
  const playerRef = useRef(null);
  const userToken = localStorage.getItem("userToken");
  const { user, setUser } = useContext(UserContext);
  const [refLinks, setRefLinks] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/course/${user.course}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const moduleResponse = await axios.get(
          `http://localhost:5000/api/module/getModule/${response.data.modulesIds[0]}`
        );
        setRefLinks(moduleResponse.data.videoId[0].contentUrl || []);
        setTestId(moduleResponse.data.test._id);
        setVideoUrl(moduleResponse.data.videoId[0].videoUrl);
        setQuestionsData(moduleResponse.data.test.questions);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCourse();
  }, [user.course, userToken]);

  const handleVideoEnd = () => {
    setIsVideoFinished(true);
  };

  const handleButtonClick = () => {
    if (isVideoFinished) {
      setShowTest(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <VideoPlayer
        videoUrl={videoUrl}
        onVideoEnd={handleVideoEnd}
        playerRef={playerRef}
        className="w-full h-80 md:h-96 lg:h-128"
      />
      {refLinks.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Reference Links:</h3>
          <ul className="list-disc pl-5">
            {refLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 underline"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-center my-6">
        <button
          onClick={handleButtonClick}
          className={`px-4 py-2 text-white font-bold rounded-lg transition duration-300 ${
            isVideoFinished
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={!isVideoFinished}
        >
          {isVideoFinished ? "Take the Test" : "Watch Video to Unlock Test"}
        </button>
      </div>
      {showTest && (
        <Test
          testId={testId}
          questionsData={questionsData}
          setScore={setScore}
          className="mt-6"
        />
      )}
      {score !== null && (
        <div className="text-center text-2xl font-bold text-green-500 mt-4">
          Your Score: {score} / {questionsData.length}
        </div>
      )}
    </div>
  );
};

export default Course;
import { useState, useEffect } from "react";

const useTypewriter = (text, speed = 60) => {
  const [displayedText, setDisplayedText] = useState("");
  const [dotVisible, setDotVisible] = useState(false);

  useEffect(() => {
    let i = 0;

    const typingInterval = setInterval(() => {
      // ✅ Check i before using text[i]
      if (i < text.length) {
        setDisplayedText((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(typingInterval); // ✅ Stop interval when done
      }
    }, speed);

    const blinkInterval = setInterval(() => {
      if (i >= text.length) {
        setDotVisible((prev) => !prev);
      }
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(blinkInterval);
    };
  }, [text, speed]);

  return { displayedText, dotVisible };
};

export default useTypewriter;

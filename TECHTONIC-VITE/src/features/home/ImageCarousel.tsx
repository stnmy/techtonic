import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

// Define the static image paths
const images = [
  "/images/Need/hero1.png",
  "/images/Need/hero3.png",
  "/images/Need/hero4.png",
];

const AUTO_SLIDE_INTERVAL = 4000; // 4 seconds in milliseconds

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Effect for automatic sliding
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, AUTO_SLIDE_INTERVAL);

    // Cleanup the timer when the component unmounts or dependencies change
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "1440px",
        minHeight: "650px",
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        aspectRatio: "16 / 5", // Maintain aspect ratio for banners (adjust as needed for more "zoom out")
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 4,
        backgroundColor: "#212529", // Background color for the overall carousel container
      }}
    >
      {/* Image Display - This Box holds all images side-by-side */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          // Each individual slide slot
          <Box
            key={index}
            sx={{
              width: "100%",
              flexShrink: 0,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#212529", // Apply background color to each slide slot
            }}
          >
            <Box
              component="img"
              src={image}
              alt={`Hero Slide ${index + 1}`}
              sx={{
                maxWidth: "90%", // Reduce max width slightly to "zoom out" image
                maxHeight: "90%", // Reduce max height slightly to "zoom out" image
                objectFit: "contain", // Crucial: scale to fit without cropping
                // No fixed width/height here; let maxWidth/maxHeight and objectFit handle it
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Navigation Dots */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          display: "flex",
          gap: 1,
          zIndex: 1,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor:
                currentIndex === index
                  ? "primary.main"
                  : "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

import React, { useEffect } from "react";
import "./SplashScreen.css";

const SplashScreen = ({ setLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout to match the duration of your animation

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className="splash-screen">
      <h1 className="splash-title">UrineVital</h1>
    </div>
  );
};

export default SplashScreen;
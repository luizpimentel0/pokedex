import { useEffect, useState } from "react";

export const useImage = (fileName) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageUrl = `/images/${fileName}`; // A URL relativa à raiz (pasta public)
        setImage(imageUrl); // Setando a URL da
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [fileName]);

  return {
    loading,
    error,
    image,
  };
};

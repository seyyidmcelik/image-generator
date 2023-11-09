import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";

import { API_TOKEN, Auth, db, store } from "../firebase-config";
import { CircularIndeterminate } from "../utils/Loading";
import { randomId } from "../utils/RandomId";
import Layout from "../layout";

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [prompt, setPrompt] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [user] = useAuthState(Auth);
  const postRef = collection(db, "post");

  const uploadImage = async () => {
    if (imageFile !== null && prompt !== null) {
      const imageRef = ref(store, `images/${imageFile.name + randomId()}`);
      uploadBytes(imageRef, imageFile)
        .then(() => {
          getDownloadURL(imageRef).then((url) => {
            addDoc(postRef, {
              prompt,
              image: url,
              logo: user.photoURL,
              user: user.displayName,
            });
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setImageFile(new File([blob], "art.png", { type: "image/png" }));
    setLoading(false);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = output;
    link.download = "art.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="container imageGen al-c">
        <h1 className="font-extrabold text-[40px]">
          Stable <span>Diffusion</span>
        </h1>
        <p className="mt-2 text-[15px] max-w-[500px]">
          Explain with clean words for whatever you want image.
          <pre className="opacity-50">
            Example: `A yellow motorcycle on the street`
          </pre>
        </p>
        <form className="generate-form mt-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="input"
            placeholder="type your prompt here..."
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="button" type="submit">
            Generate
          </button>
        </form>
        <div>
          {loading && (
            <div className="loading">
              <CircularIndeterminate />
            </div>
          )}
          {!loading && output && (
            <div className="result-image">
              <img className="object-contain" src={output} alt="art" />
              <div className="action">
                <button onClick={downloadImage}>
                  <DownloadIcon />
                </button>
                {user && (
                  <button onClick={uploadImage}>
                    <ShareIcon />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ImageGenerationForm;

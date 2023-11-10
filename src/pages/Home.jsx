import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { CircularIndeterminate } from "../utils/Loading";
import Post from "../components/Post";
import Layout from "../layout";

const Home = () => {
  const [allPost, setAllPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const postRef = collection(db, "post");

  useEffect(() => {
    if (allPost && search) {
      setSearchResult(
        allPost.filter(
          (item) =>
            item.user.toLowerCase().includes(search) ||
            item.prompt.toLowerCase().includes(search)
        )
      );
    }
  }, [search]);

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      await getDocs(postRef).then((data) => {
        setAllPost(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
        setLoading(false);
      });
    };
    getPosts();
  }, []);

  return (
    <Layout>
      <section className="max-w-7xl d-flex justify-center items-center flex-col mx-auto mt-10 sm:px-0 px-6">
        <h1 className="font-extrabold sm:text-[40px] text-[27px]">
          The Community <span>Showcase</span>
        </h1>
        <p className="mt-2 text-[15px] max-w-[500px]">
          Imagin what you want and get it as image which is created by AI
        </p>

        <div className="generate-form mt-16">
          <input
            type="text"
            placeholder="Search your prompt..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        <div className="m-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <CircularIndeterminate />
            </div>
          ) : (
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {search && searchResult
                ? searchResult.map((post) => <Post key={post.id} post={post} />)
                : allPost && allPost.map((post) => <Post key={post.id} post={post} />)}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Home;

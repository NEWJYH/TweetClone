import { useState, useEffect } from "react";
// firestore - https://firebase.google.com/docs/firestore/quickstart?hl=ko#web-version-9
import {
  collection,
  addDoc,
  // getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { dbService } from "fbase";

function Home({ userObj }) {
  const [jweet, setJweet] = useState("");
  const [jweets, setJweets] = useState([]);

  useEffect(() => {
    // 실시간으로 데이터를 데이터베이스에서 가져오기
    const q = query(
      collection(dbService, "jweets"),
      // where('text', '==', 'hehe') // where뿐만아니라 각종 조건 이 영역에 때려부우면 됨
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setJweets(newArray);
      console.log("Current tweets in CA: ", newArray);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!jweet) {
      return;
    }
    // 저장
    try {
      await addDoc(collection(dbService, "jweets"), {
        text: jweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
    } catch (error) {
      console.log(error.message);
    }
    setJweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setJweet(value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
          value={jweet}
        />
        <input type="submit" value="Jweet" />
      </form>
      <div>
        {jweets.map((jweet) => {
          return (
            <div key={jweet.id}>
              <h4>{jweet.text}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;

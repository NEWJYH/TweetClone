import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { dbService } from "fbase";
import Jweet from "components/Jweet";
import JweetFactory from "components/JweetFactory";

function Home({ userObj }) {
  const [jweets, setJweets] = useState([]);
  // 이미지url를 담을 state

  useEffect(() => {
    // 실시간으로 데이터를 데이터베이스에서 가져오기
    const q = query(
      collection(dbService, "jweets"),
      // where('text', '==', 'hehe') // where뿐만아니라 각종 조건 이 영역에 때려부우면 됨
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setJweets(newArray);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <JweetFactory userObj={userObj} />
      <div>
        {jweets.map((jweet) => {
          return (
            <Jweet
              key={jweet.id}
              jweetObj={jweet}
              isOwner={jweet.creatorId === userObj.uid}
            />
          );
        })}
      </div>
    </>
  );
}

export default Home;

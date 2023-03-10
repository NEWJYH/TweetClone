import { dbService, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function JweetFactory({ userObj }) {
  const [jweet, setJweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!jweet) {
      return;
    }
    let attachmentUrl = "";
    // 이미지 첨부하지 않고 텍스트만 올리고 싶을 때도 있기 때문에
    // attachment가 있을때만 아래 코드 실행
    //이미지 첨부하지 않은 경우엔 attachmentUrl=""이 된다.
    if (attachment) {
      // 파일 경로 참조 만들기
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      // storage 참조 경로로 파일 업로드 하기
      const response = await uploadString(fileRef, attachment, "data_url");
      // storage 참조 경로에 있는 파일의 URL을 다운로드해서 attachmentUrl 변수에 넣어서 업데이트
      attachmentUrl = await getDownloadURL(response.ref);
    }
    // jweet obj
    const jweetObj = {
      text: jweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    // 저장
    await addDoc(collection(dbService, "jweets"), jweetObj);
    // state 비워서 form 비우기
    setJweet("");
    // 파일 미리보기 img src 비워주기
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setJweet(value);
  };

  const onFileChange = (event) => {
    // console.log(event.target.files);
    const {
      target: { files },
    } = event;

    const theFile = files[0];
    // FileReader API -> 검색
    const reader = new FileReader();

    // 2.파일리더에 after이벤트를 붙임
    reader.onloadend = (finishedEvent) => {
      // 3. 사진 string get
      const {
        currentTarget: { result },
      } = finishedEvent;
      // 4. state에 담기
      setAttachment(result);
    };
    // 1.파일을 읽음
    reader.readAsDataURL(theFile);
  };
  const onClickClearAttachment = () => setAttachment("");
  return (
    <>
      <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
            onChange={onChange}
            value={jweet}
            className="factoryInput__input"
          />
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
        <label htmlFor="attach-file" className="factoryInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />
        {attachment && (
          <div className="factoryForm__attachment">
            <img
              src={attachment}
              style={{
                backgroundImage: attachment,
              }}
              alt="upload_image"
            />
            <div
              className="factoryForm__clear"
              onClick={onClickClearAttachment}
            >
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default JweetFactory;

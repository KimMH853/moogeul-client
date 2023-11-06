import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [word, setWord] = useState("");
  const [resData, setResData] = useState({txtSearchTextList: [], txtSearchTextListThird: [], txtSearchwordThird: []});
  const [isInput, setIsInput] = useState(false);
  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsInput(true);

    try {
      // URL에 데이터를 추가하여 GET 요청 보내기
      axios
        .get(`http://localhost:3001/api/data?word=${word}`)
        .then((response) => {
          setResData(response.data);
        })
        .catch((error) => {
          console.error("데이터 가져오기 중 오류 발생:", error);
        });
    } catch (error) {
      console.error("GET 요청 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <h1>Moogeul</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="단어를 입력해주세요"
          value={word}
          onChange={handleDataChange}
        />
        <input type="submit" value="확인" />
      </form>

      {resData ? (
        <>
          <div>{word}! 어떤 뜻이 있는지 알고 계신가요?</div>
          <ul>
            {resData.txtSearchTextList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div>비슷한 단어들을 찾아봤어요!</div>
          <ul>
            {resData.txtSearchwordThird.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div>{word}, 비슷한 단어들의 뜻을 한번더 살펴볼까요?</div>
          <ul>
            {resData.txtSearchTextListThird.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;

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
          <div>앞으로 나오는 문장 중 3개를 골라주세요</div>
          <div>3개를 고른뒤 PICK 버튼을 눌러주세요.</div>
          <button>PICK</button>
          <div>선택한 문장을 다시 보여드릴게요.</div>
          <div>이제 여러분이 글을 쓸 차례입니다.</div>
          <div>왼쪽 문장을 보니 어떤 기억이 떠올랐나요? 짧게 적어주세요</div>
          <div>기다리는 중입니다... 20글자 이상 작성해주세요</div>
          <div>다음으로는 문장을 하나 골라 한 문단을 작성해주시는 거에요.</div>
          <div>몇 분 정도 글을 쓸건가요? (분: 초)</div>
          <div>만큼 지난 다음에 알려드릴게요!</div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;

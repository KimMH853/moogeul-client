import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div``;

const Chat = styled.div`
  height: 80vh;
  width: 500px;
  overflow-y: scroll; /* 세로 스크롤 유지 */
  overflow-x: hidden; /* 가로 스크롤 감춤 */
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

interface IProps {
  text?: string;
  mine: boolean;
}
const Message = styled.div<IProps>`
  //border-color: ${(props) => (props.mine ? "#3498db" : "#7f8c8d")};
  border-color: ${(props) => (props.mine ? "#3498db" : "#7f8c8d")};
  border-style: solid; /* 테두리 스타일 (solid, dotted, dashed 등) */
  border-width: 1px; /* 테두리 두께 설정 */
  color: black;
  padding: 10px 20px;
  border-radius: 20px;
  align-self: ${(props) => (props.mine ? "flex-end" : "flex-start")};
  border-bottom-right-radius: ${(props) => (props.mine ? "0px" : "20px")};
  border-bottom-left-radius: ${(props) => (!props.mine ? "0px" : "20px")};
  margin-top: 10px;
  margin-bottom: 10px;
  max-width: 300px;
`;

const Ul = styled.ul`
  text-align: left;
  list-style-type: circle;
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  padding: 10px;
  margin: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  /* 추가적인 스타일링을 원하는 대로 추가할 수 있습니다. */
  &:focus {
    border-color: #3498db; /* 포커스시 테두리 색상 변경 예시 */
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.7); /* 포커스시 그림자 효과 예시 */
  }
`;

const Button = styled.button`
width: 100px;
height: 40px;
padding: 10px;
margin: 5px;
font-size: 16px;
border: 1px solid #ccc;
border-radius: 5px;
outline: none;
`;

const guideMessage = [
  "단어를 입력해주세요",
  "! 어떤 뜻이 있는지 알고 계신가요?",
  "비슷한 단어들을 찾아봤어요!",
  ", 비슷한 단어들의 뜻을 한번더 살펴볼까요?",
  "앞으로 나오는 문장 중 3개를 골라주세요",
  "3개를 고른뒤 PICK 버튼을 눌러주세요.",
  "이제 여러분이 글을 쓸 차례입니다. 선택한 문장을 하나씩 보여드릴게요. 여러분의 생각을 적어주세요.",
  "기다리는 중입니다... 20글자 이상 작성해주세요",
  "다음으로는 문장을 하나 골라 한 문단을 작성해주시는 거에요.",
  "몇 분 정도 글을 쓸건가요? (분: 초)",
  "만큼 지난 다음에 알려드릴게요!",
  "",
];

const Home = () => {
  const [word, setWord] = useState("");
  const [resData, setResData] = useState({
    txtSearchTextList: [],
    txtSearchTextListThird: [],
    txtSearchwordThird: [],
  });
  const [isInput, setIsInput] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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

  const onItemClick = (item: string) => {
    // 클릭한 아이템이 이미 선택된 아이템 중에 있는지 확인
    const isSelected = selectedItems.includes(item);

    // 이미 선택된 아이템이면 제거하고, 아니면 추가
    if (isSelected) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <Container>
      <Chat>
        <Message mine={false}>{guideMessage[0]}</Message>
        {isInput ? <Message mine={true}>{word}</Message> : <></>}
        {isInput ? (
          <Message mine={false}>{word + guideMessage[1]}</Message>
        ) : (
          <></>
        )}
        {isInput ? (
          <Message mine={false}>
            <Ul>
              {resData.txtSearchTextList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </Ul>
          </Message>
        ) : (
          <></>
        )}
        {isInput ? (
          <Message mine={false}>
            {guideMessage[2]}
            <Ul>
              {resData.txtSearchwordThird.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </Ul>
          </Message>
        ) : (
          <></>
        )}
        {isInput ? (
          <Message mine={false}>
            {word + guideMessage[3]}
            <Ul>
              {resData.txtSearchTextListThird.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </Ul>
          </Message>
        ) : (
          <></>
        )}
        {isInput ? <Message mine={false}>{guideMessage[4]}</Message> : <></>}
        {isInput ? <Message mine={false}>{guideMessage[5]}</Message> : <></>}
        {isInput ? (
          <>
            <Message mine={false}>
              <Ul>
                {resData.txtSearchTextList
                  .concat(resData.txtSearchTextListThird)
                  .map((item, index) => (
                    <li
                      key={index}
                      onClick={() => onItemClick(item)}
                      style={{
                        color: selectedItems.includes(item) ? "red" : "black",
                      }}
                    >
                      {item}
                    </li>
                  ))}
              </Ul>
            </Message>
            <button>PICK</button>
          </>
        ) : null}
        {isInput ? <Message mine={false}>{guideMessage[6]}</Message> : <></>}
        {isInput ? <Message mine={false}>{selectedItems[0]}</Message> : <></>}
      </Chat>

      <form onSubmit={onSubmit}>
        <Input type="text" placeholder="" onChange={handleDataChange} />
        <Button type="submit">제출</Button>
      </form>
    </Container>
  );
};

export default Home;

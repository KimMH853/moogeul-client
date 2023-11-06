// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Home() {
//   const [getData, setGetData] = useState('');
//   const [postData, setPostData] = useState('');
//   const [receivedData, setReceivedData] = useState('');
//   const [loading, setLoading] = useState(false);

//   // GET 요청
//   const fetchData = () => {
//     setLoading(true);
//     axios.get('http://localhost:3001/api/data')
//       .then(response => {
//         setGetData(response.data.message);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('GET 요청 중 오류 발생:', error);
//         setLoading(false);
//       });
//   };

//   // POST 요청
//   const sendData = () => {
//     axios.post('http://localhost:3001/api/data', { data: postData })
//       .then(response => {
//         setReceivedData(response.data.message);
//       })
//       .catch(error => {
//         console.error('POST 요청 중 오류 발생:', error);
//       });
//   };

//   return (
//     <div className="App">
//       <h1>GET 및 POST 요청 예시</h1>
//       <button onClick={fetchData}>GET 요청 보내기</button>
//       {loading ? <p>데이터 불러오는 중...</p> : <p>GET 응답: {getData}</p>}
//       <input
//         type="text"
//         placeholder="POST할 데이터 입력"
//         value={postData}
//         onChange={(e) => setPostData(e.target.value)}
//       />
//       <button onClick={sendData}>POST 요청 보내기</button>
//       {receivedData && <p>POST 응답: {receivedData}</p>}
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [data, setData] = useState({ title: '', heading: '' });

  useEffect(() => {
    // 서버에서 데이터 가져오기
    axios.get('http://localhost:3001/api/scrape')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('데이터 가져오기 중 오류 발생:', error);
      });
  }, []);

  return (
    <div >
      <h1>{data.title}</h1>
      <h2>{data.heading}</h2>
    </div>
  );
}

export default Home;
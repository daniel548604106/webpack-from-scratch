//使用 node.js 在本機上執行的 Server
let ws = new WebSocket('ws://localhost:3001');

ws.onopen = () => {
  console.log(ws);
  console.log('開啟連結');
};

ws.onclose = () => {
  console.log('關閉連結');
};

//接收 Server 發送的訊息
ws.onmessage = (event) => {
  console.log(event);
};

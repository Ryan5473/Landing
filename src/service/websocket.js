import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;

export const connectWebSocket = (username, onMessage) => {
  const socket = new SockJS('http://localhost:8080/ws');
  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    stompClient.subscribe(`/user/${username}/queue/messages`, (message) => {
      const body = JSON.parse(message.body);
      onMessage(body);
    });

    // Notify server that user connected (optional)
    stompClient.send('/app/user/connect', {}, JSON.stringify({ username }));
  });
};

export const sendMessage = (message) => {
  if (stompClient && stompClient.connected) {
    stompClient.send('/app/send-message', {}, JSON.stringify(message));
  }
};

export const disconnectWebSocket = (username) => {
  if (stompClient) {
    stompClient.send('/app/user/disconnect', {}, JSON.stringify({ username }));
    stompClient.disconnect();
  }
};

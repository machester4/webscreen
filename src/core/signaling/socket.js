import io from "socket.io-client";

let socket = null;
const host = "https://webscreen-signal.herokuapp.com";

export default (() => {
  if (!socket) {
    socket = io(host);
  }
  return socket;
})();

import { io } from "socket.io-client";

let socket = null;
const host = "https://webscreen-signal.herokuapp.com";

// Socket signaling events
const FIND_ANSWER_WITH_CODE = "answer-want-connect";
const ANSWER_WANT_OFFER_SIGNAL = "answer-want-offer-signal";

function createSocket() {
  if (!socket) {
    socket = io(host);
    console.log("createSocket", socket);
  }
}

export async function findOffer(code) {
  return new Promise((resolve, reject) => {
    // Connect to socket.io server
    createSocket();

    // Send signal for find offer with code
    socket.emit(FIND_ANSWER_WITH_CODE, code, (offer) => {
      if (offer) {
        resolve(offer);
      } else {
        reject("Not found offer with code " + code);
      }
    });
  });
}

export function tellToOfferSendSignal(code, answerData) {
  // Connect to socket.io server
  createSocket();

  socket.emit(ANSWER_WANT_OFFER_SIGNAL, { code, answer: answerData });
}

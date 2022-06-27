import Peer from "simple-peer";
import { findOffer, tellToOfferSendSignal } from "../signaling";
import { transformFromPixelsToPercent } from "../util";

export async function connectWithOffer(code) {
  try {
    const peerConfig = {
      initiator: false,
      // sdpTransform: setBandwidth,
      config: {
        iceServers: [
          {
            urls: "turn:54.166.44.24:3478?transport=tcp",
          },
        ],
      },
    };
    const offer = await findOffer(code);
    const p = new Peer(peerConfig);

    // Listen signaling events
    p.signal(offer);
    p.on("signal", async (data) => {
      if (data.type === "answer") {
        tellToOfferSendSignal(code, data);
      }
    });

    const facade = {
      mouseClick(x, y, size) {
        const event = {
          click: true,
          ...transformFromPixelsToPercent(x, y, size),
        };
        console.log(event);
        p.send(JSON.stringify(event));
      },
      onConnect(callback) {
        p.on("connect", callback);
      },
      onClose(callback) {
        p.on("close", callback);
      },
      onStream(callback) {
        p.on("stream", callback);
      },
      disconnect() {
        p.destroy();
      },
    };

    return facade;
  } catch (error) {
    throw new Error(error);
  }
}

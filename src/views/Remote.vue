<template>
  <div class="flex flex-col flex-1 justify-center bg-slate-800">
    <StatusBanner :status="connectionState" @disconnect="handleDisconnect" />
    <div class="flex-1">
      <video
        class="h-fit w-full border-dashed border-2 border-slate-500"
        id="video"
        ref="video"
        @click.prevent="handleMouseClick"
        @mousemove.prevent="handleMouseMove"
        muted="muted"
      />
    </div>
  </div>
</template>

<script>
import { connectWithOffer } from "@/core/webRTC";
import StatusBanner from "@/components/StatusBanner.vue";

export default {
  name: "Remote",
  components: {
    StatusBanner,
  },
  data() {
    return {
      connected: false,
      failed: false,
      rtcInstance: null,
    };
  },
  computed: {
    connectionState() {
      if (this.connected) return "Connected";
      if (this.failed) return "Failed";
      return "Connecting";
    },
  },
  async mounted() {
    try {
      const code = this.$route.params.code;
      this.rtcInstance = await connectWithOffer(code);
      this.rtcInstance.onStream(this.onStream);
      this.rtcInstance.onConnect(this.onConnect);
      this.rtcInstance.onClose(this.onDisconnect);
    } catch (error) {
      // TODO: Improve error handling
      this.failed = true;
      console.error(error);
    }
  },
  beforeDestroy() {
    this.rtcInstance.disconnect();
  },
  methods: {
    onStream(stream) {
      this.$refs.video.srcObject = stream;
      this.$refs.video.play();
    },
    onConnect() {
      this.connected = true;
    },
    onDisconnect() {
      this.connected = false;
    },
    handleMouseMove(event) {
      const { clientX, clientY } = event;
      const video = document.getElementById("video");
      const size = { width: video.offsetWidth, height: video.offsetHeight };
      this.rtcInstance.sendMouseMove(clientX, clientY, size);
    },
    handleMouseClick(e) {
      console.log("click");
      this.rtcInstance.sendMouseClick();
    },
    handleDisconnect() {
      this.$router.go(-1);
    },
  },
};
</script>

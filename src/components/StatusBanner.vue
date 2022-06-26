<template>
  <div :class="bgcolor">
    <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between flex-wrap">
        <div class="w-0 flex-1 flex items-center">
          <span
            :class="['flex', 'p-2', 'rounded-lg', 'bg-indigo-800', bgcolorIcon]"
          >
            <SwitchVerticalIcon
              v-if="status === 'Connecting'"
              class="w-6 h-6 text-white"
            />
            <ShieldCheckIcon
              v-if="status === 'Connected'"
              class="w-6 h-6 text-white"
            />
            <ExclamationCircleIcon
              v-if="status === 'Failed'"
              class="h-6 w-6 text-white"
              aria-hidden="true"
            />
          </span>
          <p class="ml-3 font-medium text-white truncate">
            <span class="md:hidden"> {{ status }} </span>
            <span class="hidden md:inline">
              {{ status }}
            </span>
          </p>
        </div>
        <div
          class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto"
        >
          <button
            class="flex items-center justify-center px-4 py-2 border border-transparent rounded shadow-md text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
            @click="$emit('disconnect')"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SwitchVerticalIcon,
  ExclamationCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/vue/outline";
export default {
  name: "StatusBanner",
  components: {
    SwitchVerticalIcon,
    ExclamationCircleIcon,
    ShieldCheckIcon,
  },
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    bgcolor() {
      if (this.status === "Connected") {
        return "bg-green-600";
      }
      if (this.status === "Connecting") {
        return "bg-yellow-600";
      }
      if (this.status === "Failed") {
        return "bg-red-600";
      }
      return "bg-gray-600";
    },
    bgcolorIcon() {
      if (this.status === "Connected") {
        return "bg-green-500";
      }
      if (this.status === "Connecting") {
        return "bg-yellow-500";
      }
      if (this.status === "Failed") {
        return "bg-red-500";
      }
      return "bg-gray-500";
    },
  },
  emits: ["disconnect"],
};
</script>

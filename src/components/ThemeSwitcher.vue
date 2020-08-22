<script>
import { inject } from "vue";

import { UserSettingsUpdateSymbol } from "../contexts/SettingsProvider";

export default {
  setup() {
    const updateUserSettings = inject(UserSettingsUpdateSymbol);
    const updateTheme = (value) => updateUserSettings("theme", value);

    return { updateTheme };
  },
};
</script>

<template>
  <div>
    <button @click="updateTheme('dark')">
      Enable darkmode
    </button>
    <button @click="updateTheme('light')">
      Enable lightmode
    </button>
  </div>
</template>

<template>
  <div :class="`theme-${theme} app`">
    <ThemeSwitcher />
    <Counter />
  </div>
</template>

<script>
import { inject } from "vue";

import { UserSettingsStateSymbol } from "./contexts/SettingsProvider";
import Counter from "./components/Counter";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";

export default {
  name: "App",
  components: {
    Counter,
    ThemeSwitcher,
  },
  setup() {
    const { theme } = inject(UserSettingsStateSymbol);

    return { theme };
  },
};
</script>

<style lang="scss" scoped>
html {
  margin: 0;
}

body{
  margin: 0px;
}

.theme-light {
  color: black;
  background: white;
}

.theme-dark {
  color: white;
  background: black;
}
</style>

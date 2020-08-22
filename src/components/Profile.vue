<template>
  <div>
    <h2>Profile</h2>

    <template v-if="user">
      Name: {{ user.name }}
      <!-- ... -->
    </template>
    <template v-else-if="state === STATE.loading">
      LOADING ...
    </template>
    <template v-else-if="state === STATE.error">
      {{ error }}
    </template>

    <!-- Stale data is shown while revalidating! -->
    <template v-if="state === STATE.revalidating">
      <small>REVALIDATING ...</small>
    </template>
  </div>
</template>

<script>
import { fetcher } from "../utils";
import { useSwrCache, STATE } from "../hooks/useSwrCache";

export default {
  name: "UserProfile",
  setup() {
    const { data: user, error, state } = useSwrCache(
      "https://jsonplaceholder.typicode.com/users/1",
      fetcher
    );

    return {
      STATE,
      error,
      state,
      user,
    };
  },
};
</script>

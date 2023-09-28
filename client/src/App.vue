<template>
  <DetailTask />
</template>

<script>
import DetailTask from "./components/DetailTask.vue";

export default {
  name: "App",
  components: {
    DetailTask,
  },
};
</script>

<style>
body {
  background-image: linear-gradient(
      rgba(23, 24, 34, 0.6),
      rgba(23, 24, 34, 0.6)
    ),
    url("./assets/water-blue.jpg");
}

.title-head {
  color: white;
}

.desc-head {
  color: white;
}

.del-head {
  color: white;
}

hr {
  border-top: 1px solid white;
}
</style>

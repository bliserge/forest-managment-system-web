<!-- eslint-disable vue/multi-word-component-names -->
<template>
  
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
  
}
</script>

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer" app color="#010218" dark>
      <v-sheet class="pa-4" color="#010218">
        <v-icon color="#56baed" size="40">mdi-dots-square</v-icon>
      </v-sheet>

      <v-list style="margin-top: 55px;">
          <nuxt-link v-for="(item, i) in links" :key="i" :to="item.to">
            <v-list-item  link dark class="itemDiv" :id="'item' + i" @click="setActiveItem(i)">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
    
              <v-list-item-content>
                <v-list-item-title>{{ item.link }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </nuxt-link>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    selectedItem: 1,
    links: [
      {
        icon: 'mdi-bank',
        link: 'Home',
        to: 'home'
      },
      {
        icon: 'mdi-bank',
        link: 'Students',
        to: 'student'
      },
      {
        icon: 'mdi-bank',
        link: 'Instructors',
        to: 'instructor'
      },
    ],
  }),

  methods: {
    setActiveItem(index) {
      console.log(index);
      let n = document.getElementsByClassName("itemDiv");
      for (let i = 0; i < n.length; i++) {
        console.log(n[i].classList.remove("active"));
      }
      let x = document.getElementById("item" + index);
      x.classList.add("active");
    },
  }
}
</script>

<style scoped>

.v-navigation-drawer__border {
  display: none;
}

.v-list-item {
  background-color: #010324;
  border: none;
  color: white !important;
  text-align: center;
  width: 210px;
  border-radius: 5px 5px 5px 5px;
  margin: 40px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  margin-top: -25px;
}

.v-list-item:hover {
  background-color: #39ace7;
}

.active {
  background-color: #39ace7;
}
.v-list-item:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}
a {
  text-decoration: none;
}
</style>

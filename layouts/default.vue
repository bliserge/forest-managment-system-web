<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app id="inspire">
    <!-- <v-system-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar> -->

    <v-navigation-drawer v-model="drawer" app color="#F2F6F5" dark>
      <v-sheet class="pa-4" color="#F2F6F5">
        <v-row class="pa-4">
            <img src="@/assets/images/avatars/logo.png" alt="" width="200">
          <!-- <v-icon color="#7B0000" size="40">mdi-logout</v-icon> -->
        </v-row>
      </v-sheet>

      <v-list style="margin-top: 55px">
        <nuxt-link v-for="(item, i) in links" :key="i" :to="item.to">
          <v-list-item
            link
            dark
            class="itemDiv"
            :id="'item' + i"
            @click="setActiveItem(i)"
            dense
          >
            <v-list-item-icon>
              <v-icon color="#fff">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.link }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar> -->

    <v-main class="grey lighten-3">
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
        to: 'home',
      },
    ],
  }),

  mounted() {
    if (localStorage.getItem('profile')) {
      this.user = JSON.parse(localStorage.getItem('profile'))
    }
    if(this.user.type == 1) {
      this.links.push({
          icon: 'mdi-file-document-outline',
          link: 'Categories',
          to: 'categories',
        })
        this.links.push({
          icon: 'mdi-account-group',
          link: 'Users',
          to: 'users',
        })
    }
  },
  created() {
    // this.setActiveItem(0)
  },

  methods: {
    setActiveItem(index) {
      let n = document.getElementsByClassName('itemDiv')
      for (let i = 0; i < n.length; i++) {
        n[i].classList.remove('active')
      }
      let x = document.getElementById('item' + index)
      x.classList.add('active')
    },
  },
}
</script>

<style scoped>
.v-navigation-drawer__border {
  display: none;
}

.v-list-item {
  background-color: #4e776f;
  border: none;
  color: #fff !important;
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
  background-color: #d2afad;
  color: #ffffff !important;
}

.active {
  background-color: #d2afad;
  color: #ffffff !important;
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

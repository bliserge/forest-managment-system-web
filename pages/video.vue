<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-app id="inspire">
    <v-app-bar app color="#010218" flat>
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'white' : 'white'"
        size="32"
      ></v-avatar>

      <v-tabs centered class="ml-n9" color="white">
        <v-tab v-for="link in links" :key="link">
          {{ link }}
        </v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        color="white shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="8">
            <v-sheet min-height="68vh" rounded="lg">
              <video-player
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              />
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="4">
            <v-sheet rounded="lg" min-height="268">
              <v-toolbar color="#010218" dark>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                <v-toolbar-title>Courses</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>

              <v-list>
                <v-list-group
                  v-for="item in videos"
                  :key="item.title"
                  v-model="item.active"
                  :prepend-icon="item.action"
                  no-action
                >
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.title"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-list-item v-for="child in item.items" :key="child.title" link>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="child.title"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>
              </v-list>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import VideoPlayer from 'nuxt-video-player'
export default {
  layout: 'auth',
  components: {
    VideoPlayer,
  },
  data: () => ({
    links: ['Dashboard', 'Messages', 'Profile', 'Updates'],
    videos: [
      {
        action: 'mdi-book',
        items: [{ title: 'List Item' }],
        title: 'Attractions',
      },
      {
        action: 'mdi-book',
        active: true,
        items: [
          { title: 'Breakfast & brunch' },
          { title: 'New American' },
          { title: 'Sushi' },
        ],
        title: 'Dining',
      },
      {
        action: 'mdi-book',
        items: [{ title: 'List Item' }],
        title: 'Education',
      },
      {
        action: 'mdi-book',
        items: [{ title: 'List Item' }],
        title: 'Family',
      },
      {
        action: 'mdi-book',
        items: [{ title: 'List Item' }],
        title: 'Health',
      },
      {
        action: 'mdi-book',
        items: [{ title: 'List Item' }],
        title: 'Office',
      },
      {
        action: 'mdi-book',
        items: [{ title: 'List Item' }],
        title: 'Promotions',
      },
    ],
  }),
}
</script>

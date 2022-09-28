<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app>
    <h2 style="color: #424242;" class="ml-4">Student Payments</h2>
    <v-breadcrumbs :items="crumbsItems">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-row class="pl-4 pr-4 mt-5">
      <v-col>
        <v-card elevation="10">
          <v-card-title> Payment transaction</v-card-title>
          <v-tabs color="deep-purple accent-4">
            <v-tab @click="studentItems = []">All</v-tab>
            <v-tab @click="studentItems = []">Success</v-tab>
            <v-tab @click="studentItems = []">Failed</v-tab>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              dense
              hide-details
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
            <v-tab-item>
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="studentItems"
                  :search="search"
                  :loading="loading"
                >
                </v-data-table>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="studentItems"
                  :search="search"
                  :loading="loading"
                >
                </v-data-table>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="studentItems"
                  :search="search"
                  :loading="loading"
                >
                </v-data-table>
              </v-card-text>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      studentItems: [],
      crumbsItems: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '',
        },
        {
          text: 'Home',
          disabled: false,
          href: 'home',
        },
        {
          text: 'Students',
          disabled: true,
          href: 'student',
        },
      ],
    }
  },
}
</script>

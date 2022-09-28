<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app>
    <h2 style="color: #424242" class="ml-4">Instructors</h2>
    <v-breadcrumbs :items="crumbsItems">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-row class="pl-4 pr-4 mt-5">
      <v-col>
        <v-card>
          <v-row>
            <v-card-title class="ml-3">List of Instructors</v-card-title>
            <v-spacer />
            <v-btn
              color="primary"
              class="mt-5 mr-5"
              elevation="0"
              @click="isNew = true"
              v-if="!isNew"
            >
              New Instractor
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-row>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="studentItems"
              :search="search"
              :loading="loading"
            >
            </v-data-table>
          </v-card-text> </v-card
        >`
      </v-col>
      <v-col v-if="isNew" cols="12" md="5" lg="5">
        <v-card>
          <v-row justify="space-between" class="pl-4 pr-4">
            <v-card-title>
              New Instractor
            </v-card-title>
            <v-btn x-small class="mr-3 mt-3" @click="isNew = false" fab elevation="0" color="error" dark><v-icon>mdi-close</v-icon></v-btn>
          </v-row>
          <validation-observer ref="form">
            <v-card-text class="py-0">
              <v-col class="pb-0">
                <label contenteditable="true">Names </label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="userName"
                    :error="errors[0] ? true : false"
                    outlined
                    type="text"
                    dense
                    class="new-group-field"
                  ></v-text-field>
                </validation-provider>
                <label>User Phone</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="userPhone"
                    :error="errors[0] ? true : false"
                    dense
                    outlined
                    class="new-group-field"
                  ></v-text-field>
                </validation-provider>
                <label>User Email</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="userEmail"
                    :error="errors[0] ? true : false"
                    dense
                    outlined
                    class="new-group-field"
                  ></v-text-field>
                </validation-provider>
  
                <label>Prefered Language</label>
                <validation-provider rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="lang"
                    :items="langs"
                    item-value="id"
                    item-text="name"
                    :error="errors[0] ? true : false"
                    dense
                    outlined
                    class="new-group-field"
                  ></v-select>
                </validation-provider>
              </v-col>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                color="info"
                elevation="0"
                @click="submit"
                :loading="loading"
                :disabled="btnDisabled"
              >
              Save
              </v-btn>
            </v-card-actions>
          </validation-observer>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { ValidationObserver } from 'vee-validate'
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
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
      isNew: false,
    }
  },
}
</script>

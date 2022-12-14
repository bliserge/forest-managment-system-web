<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app>
    <body>
      <main class="d-flex w-100">
        <div class="container d-flex flex-column">
          <v-card outlined class="pb-4 pt-4">
            <div class="row vh-100">
              <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                <div class="d-table-cell align-middle">
                  <div class="card">
                    <div class="card-body">
                      <div class="text-center mt-4">
                        <h1 class="h2">Welcome to forest managment system</h1>
                        <p class="lead">Sign in to your account to continue</p>
                      </div>
                      <div class="m-sm-4">
                        <div class="text-center">
                          <img
                            src="@/assets/images/avatars/avatar.png"
                            alt="Charles Hall"
                            class="img-fluid rounded-circle"
                            width="132"
                            height="132"
                          />
                        </div>
                        <div class="mb-3">
                          <validation-observer ref="form">
                            <label contenteditable="true">Phone </label>
                            <validation-provider
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="Phone"
                                hint="Phone Number"
                                :error="errors[0] ? true : false"
                                outlined
                                type="text"
                                dense
                                class="new-group-field"
                              ></v-text-field>
                            </validation-provider>
                            <label contenteditable="true">Password </label>
                            <validation-provider
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                v-model="Password"
                                hint="Password"
                                :error="errors[0] ? true : false"
                                outlined
                                type="password"
                                dense
                                class="new-group-field"
                              ></v-text-field>
                            </validation-provider>
                          </validation-observer>
                          <div class="mb-3">
                            <small>
                              <nuxt-link to="/registration">
                                <a>Don't have an account? Register</a>
                              </nuxt-link>
                            </small>
                          </div>
                          <div>
                            <label class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value="remember-me"
                                name="remember-me"
                                checked
                              />
                              <span class="form-check-label">
                                Remember me next time
                              </span>
                            </label>
                          </div>
                          <div class="text-center mt-3">
                            <v-btn
                              @click="login()"
                              color="green darken-3"
                              dark
                              elevation="0"
                            >
                              Sign in
                            </v-btn>
                            <!-- <button type="submit" class="btn btn-lg btn-primary">Sign in</button> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </div>
      </main>
    </body>
  </v-app>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { ValidationObserver } from 'vee-validate'
export default {
  layout: 'auth',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      Phone: '',
      Password: '',
    }
  },

  methods: {
    login() {
      this.$axios
        .post('login', {
          phone: this.Phone,
          password: this.Password,
        })
        .then((res) => {
          localStorage.setItem('profile', JSON.stringify(res.data))
          localStorage.setItem('token', res.data.accessToken)
          this.$router.push(res.data.redirect)
        })
    },
  },
}
</script>

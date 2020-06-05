<template>
  <q-page class="flex flex-center">
    <q-card square style="width: 400px; padding:50px">
      <q-card-section>
        <div class="text-h6">
          Login
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          id="email"
          v-model.trim="login.body.email"
          type="email"
          label="Email"
          :error="this.$v.login.body.email.$error"
          required
          autofocus
        />
        <q-input
          id="password"
          v-model="login.body.password"
          type="password"
          label="Password"
          :error="$v.login.body.password.$error"
          required
          @keyup.enter="login"
        /><br />
        <q-checkbox
          id="rememberMe"
          v-model="login.rememberMe"
          label="Remember me"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn color="primary" :loading="loading" @click="doLogin">
          Login
        </q-btn>
      </q-card-actions>
      <router-link to="/password/forgot">
        <a>Forgot Password?</a>
      </router-link>
    </q-card>
  </q-page>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";
import { Cookies } from "quasar";
import fetchql from "../js/fetchql";
export default {
  name: "Login",
  data() {
    return {
      login: {
        body: {
          email: "",
          password: ""
        },
        rememberMe: false
      },
      loading: false
    };
  },
  methods: {
    doLogin() {
      this.$v.login.$touch();
      if (!this.$v.login.$error) {
        this.loading = true;
        fetchql
          .query({
            operationName: "login",
            query: `mutation login($email: String!, $password: String!){
              login(email: $email, password: $password) {
                jwt_token
                jwt_expires_in
              }
            }`,
            variables: this.login.body
          })
          .then(res => {
            console.log(res);
            Cookies.set("token", res.data.login.jwt_token, {
              expires: `${res.data.login.jwt_expires_in / 1000}s`,
              secure: true
            });
            console.log(res);
            this.$router.push("/");
          })
          .catch(error => {
            console.error(error);
            this.$q.dialog({
              message: "Wrong username or password!"
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  },
  validations: {
    login: {
      body: {
        email: {
          required,
          email
        },
        password: {
          required
        }
      }
    }
  }
};
</script>

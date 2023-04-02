<script setup lang="ts">
import { $ref } from 'vue/macros';
import { SessionManager } from '@/classes/SessionManager';
import { watch } from 'vue';

var sessionManager = $ref(SessionManager.sessionManager)
var username = $ref("")
var password = $ref("")

var loginError = $ref("")

function login() {
    username = username.trim()
    password = password.trim()

    if (!username && !password) {
        loginError = "Please enter username and password"
        return
    }

    if (!username) {
        loginError = "Please enter username"
        return
    }

    if (!password) {
        loginError = "Please enter password"
        return
    }

    const loginOutcome = sessionManager.login(username, password)

    if (!loginOutcome) {
        password = ""
        loginError = "Invalid username or password"
    } else {
        loginError = ""
        alert("Login successful")
    }
}

watch(() => username, () => loginError = "", { immediate: true })
watch(() => password, () => {
    if (password) {
        loginError = ""
    }
}, { immediate: true })

</script>

<template>
    <div class="row mt-5 justify-content-md-center">
        <div class="mt-5 col-sm-8 col-lg-4">
            <form id="login ">
                <h3 class="mt-5">Login</h3>

                <div class="form-outline my-4">
                    <input id="username" :class="loginError ? 'form-error' : ''" placeholder="example@mail.com"
                        v-model="username" type="text" class="form-control" />
                    <label class="form-label" for="username">Username</label>
                </div>

                <div class="form-outline mb-4">
                    <input type="password" :class="loginError ? 'form-error' : ''" placeholder="******" v-model="password"
                        class="form-control" />
                    <label class="form-label">Password</label>
                </div>

                <div class="row mb-4">
                    <div class="col d-flex justify-content-center">
                        <!-- Checkbox -->
                        <div class="form-check">
                            <input tabindex="-1" class="form-check-input" type="checkbox" value="" checked />
                            <label class="form-check-label" for="form2Example31"> Remember me </label>
                        </div>
                    </div>

                    <div class="col">
                        <!-- Simple link -->
                        <a tabindex="-1" href="#!">Forgot password?</a>
                    </div>
                </div>
            </form>
            <div class="row">
                <button @click="login" color="light blue" :disabled="!username || !password" class="mb-4">
                    Sign in</button>
            </div>
            <div class="row" v-if="loginError">
                <span class="text-danger text-center">{{ loginError }}</span>
            </div>
        </div>
    </div>
</template>
 
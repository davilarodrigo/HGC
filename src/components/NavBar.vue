<script setup lang="ts">
import { ref } from 'vue'

class NavbarItem {
    title: string
    name: string
    link: string

    constructor(title: string, name: string, link: string) {
        this.title = title
        this.name = name
        this.link = link
    }
}

const items: NavbarItem[] = [
    { title: "View Database", name: "database", link: "database-viewer" },
    { title: "Manage Database", name: "database connections", link: "database-connections" },
    { title: "Query Builder", name: "builder", link: "query-builder" },
    { title: "Approve Queries", name: "query manager", link: "query-manager" },
    { title: "Templates", name: "templates", link: "templates" },
    { title: "Reports", name: "reports", link: "reports" },
    //{ title: "About", name: "about", link: "about" },
]

const navbarItems = ref(items)
const currentItem = ref(items[0].name)

</script>

<template>
    <nav class="bg-light">
        <ul class="container">
            <div class="left-side">
                <router-link to="/">
                    <img class="navbar-logo" src="src\assets\navbar_logo.png" id="main-menu-link" alt="Logo">
                </router-link>

                <li v-for="item in navbarItems">

                    <router-link class="nav-link active" :class="{'selected-item':item.name==currentItem}" v-on:click="currentItem=item.name"  :to="item.link">{{ item.title }}</router-link>
                </li>
            </div>
                <form class="login-buttons">
                    <button id="logout-button" class="btn btn-outline-danger">Sign Out</button>
                </form>
            
        </ul>


    </nav>
</template>

<style scoped>

ul{display: flex;
}
.left-side {
    display: flex;
}

.selected-item{
  font-weight: 500;
}

.login-buttons{
    margin-left: auto;
    margin-right: 0;
}

li {
    display: inline;
    padding-left: 20px;
}

li:hover {
    text-decoration: underline;
    /* font-weight: 500; */
}

.navbar-logo {
    height: 3.5rem;
}

nav {
    line-height: 3.5rem;
    vertical-align: middle;
    font-size: 1.2rem;
    font-weight: 400;
}
</style>
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/create">Create</router-link> |
    <router-link to="/edit">Edit</router-link> |
    <router-link to="/history">History</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: #ecf0f1;  /* Light background color for the entire body */
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}


/* Media Queries for Responsive Design */

/* For Tablets and Up */
@media (min-width: 768px) {
  .navbar {
    padding: 20px;
  }
}

/* For Desktops and Up */
@media (min-width: 992px) {
  .navbar {
    padding: 30px;
  }
}

/* Additional Styles for Large Screens */
@media (min-width: 1200px) {
  .navbar {
    padding: 40px;
  }
}
</style>

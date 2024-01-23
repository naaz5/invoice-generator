<template>
  <div class="landing-page">
    <section class="hero-section">
      <div class="content-wrapper">
        <div class="text-wrapper">
          <header>
            <img src="@/assets/logo.png" alt="Business Logo" class="logo" />
          </header>
          <div class="intro-text">
            <h1>Welcome to Invoice Generator</h1>
            <p>Your solution for <strong>easy</strong> and <strong>efficient</strong> invoicing.</p>
            <!-- <button class="get-started-btn" @click="navigateToCreateView">Get Started</button> -->
            <button class="get-started-btn" @click="navigateToCreateView">Get Started</button>
          </div>
        </div>
        <div class="hero-image-wrapper">
          <img src="@/assets/hero-image.png" alt="Hero Image" class="hero-image" />
        </div>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  methods: {
    navigateToCreateView() {
      this.$router.push('/create');
    },
  },
};
</script>


<style scoped>
.landing-page {
  text-align: center;
}

.logo {
  max-width: 200px;
  height: auto;
  margin-top: 20px;
}

.hero-section {
  margin-top: 40px;
  height: auto; 
  overflow: hidden; 
}

.content-wrapper {
  display: flex;
  flex-wrap: wrap; 
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box; 
}

.text-wrapper {
  flex: 1; 
  text-align: left;
  color: black;
}

.hero-image-wrapper {
  flex: 1; 
}

.hero-image {
  max-width: 100%;
  height: auto; 
  object-fit: cover; 
}

.intro-text {
  margin-top: 20px;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

p {
  font-size: 1.2em;
  margin-bottom: 15px;
}
.get-started-btn {
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.get-started-btn:hover {
  background-color: #2980b9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }
}
</style>
	

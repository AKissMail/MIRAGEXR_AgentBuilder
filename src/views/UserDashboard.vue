<template>
  <div class="dashboard">
    <div v-if="!isSubRouteActive">
      <router-link to="/dashboard/test-configuration">
        <button>Test Configuration</button>
      </router-link>
      <router-link to="/dashboard/create-configuration">
        <button>Create Configuration</button>
      </router-link>
      <router-link to="/dashboard/upload">
        <button>Upload Document</button>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'UserDashboard',
  computed: {
    isSubRouteActive() {
      return this.$route.path !== '/dashboard';
    }
  }
};
</script>

<style scoped>
.dashboard {
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
}

.dashboard button {
  padding: 10px;
  font-size: 16px;
  background-color: #060d3a;
  color: #ffffff;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;

}

.dashboard button:hover {
  background-color: #0f1f8f;
}

</style>
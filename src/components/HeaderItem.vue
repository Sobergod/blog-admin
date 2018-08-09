<template>
    <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <MenuItem name="1">
                <Icon type="ios-navigate"></Icon>
                <router-link to="/">欢迎</router-link>
                </MenuItem>
                <MenuItem name="2">
                <Icon type="ios-keypad"></Icon>
                <router-link to="/">欢迎</router-link>
                </MenuItem>
                <MenuItem name="3">
                <Icon type="ios-analytics"></Icon>
                <router-link to="/">欢迎</router-link>
                </MenuItem>
                <MenuItem name="4">
                <Icon type="ios-paper"></Icon>
                <router-link to="/">欢迎</router-link>
                </MenuItem>
            </div>
        </Menu>
    </Header>
</template>

<script>
export default {
    data() {
        return {
            
        }
    }
};
</script>

<style scoped>
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isCollapse:false
	},
	mutations: {
		login(state,code) {
			sessionStorage.setItem("code",code);
		},
		logout(state,code) {
			sessionStorage.setItem("code",code);
		},
		setCollapse(state){
			state.isCollapse = !state.isCollapse;
			
		}
	}
})


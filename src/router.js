import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Upload from '@/views/Upload'
import Items from '@/views/Items'
import Login from '@/views/Login'
import Signup from '@/views/Signup'
// import Sharing from '@/views/Sharing'

Vue.use(Router)

export default new Router({
	base: '/projects/1/',
	// mode: 'history',
	routes: [
		{
			path: '/',
			component: Index,
			meta:{
				layout: "index"
			}
		},
		{ path: '/upload', component: Upload },
		{ path: '/items', component: Items },
		{ path: '/login', component: Login },
		{ path: '/signup', component: Signup },
		// { path: '/sharing', component: Sharing },
	]
})
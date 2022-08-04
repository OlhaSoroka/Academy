import { LOGIN } from "@/constants/routes.constant"
import store from "../store/index"
export const roleGuard = (to, from, next) => {
	const user = store.getters["user/user"]
		? store.getters["user/user"].role
		: null
	if (
		to.matched.some((route) => route.meta.requiredRoles.includes(user))
	) {
		next()
	} else {
		next({ path: "/" })
	}
}

export const authGuard = (to, from, next) => {
	const user = JSON.parse(localStorage.getItem('user'));
	if (to.matched.some((route) => route.meta.requiresAuth)) {
		if (!user) {
			store.dispatch('user/setUser', null, {root:true})
			next({
				name: LOGIN,
			})
		} else {
			store.dispatch('user/setUser', user, {root:true})
			next()
		}
	} else {
		next()
	}
}

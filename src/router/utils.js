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
	const user = store.getters["user/user"]
	if (to.matched.some((route) => route.meta.requiresAuth)) {
		if (!user) {
			next({
				name: LOGIN,
			})
		} else {
			next()
		}
	} else {
		next()
	}
}

import Vue from 'vue';
import VueRouter from 'vue-router';

const LoginView = () => import(/* webpackChunkName:'login'*/ '../views/LoginView.vue');
const ResetView = () => import(/* webpackChunkName:'reset'*/ '../views/ResetView.vue');
const NotFoundView = () => import(/* webpackChunkName:'not-found'*/ '../views/NotFoundView.vue');
const ProfileView = () => import(/* webpackChunkName:'profile'*/ '../views/ProfileView.vue');
const UsersView = () => import(/* webpackChunkName:'users'*/ '../views/UsersView.vue');
const ManagersView = () => import(/* webpackChunkName:'managers*/ '../views/ManagersView.vue');
const CoursesView = () => import(/* webpackChunkName:'courses'*/ '../views/CoursesView.vue');
const CourseDetailsView = () => import(/* webpackChunkName:'course-details'*/ '../views/CourseDetailsView.vue');
const CoursesDashboardView = () => import(/* webpackChunkName:'courses'*/ '../views/CoursesDashboardView.vue');

import { ADMIN_ROLE, MANAGER_ROLE, USER_ROLE } from '@/constants/roles.constant';
import { LOGIN, RESET, PROFILE, MANAGERS, USERS, COURSE_DASHBOARD, COURSE_DETAILS } from '@/constants/routes.constant';

Vue.use(VueRouter);

// FAKE USER
const fakeUser = {
	email: 'webportaladmin@inventorsoft.co',
	fullName: 'InventorSoft Admin',
	role: 'admin',
	id: 'e5616235-be1c-4003-b5fe-33fa96195f72',
	isAuth: true,
};
localStorage.setItem('user', JSON.stringify(fakeUser));

const checkUserRole= (to, from, next) => {
	const user = JSON.parse(localStorage.getItem('user'));
	if (to.matched.some((route) => route.meta.requiredRoles.includes(user.role))) {
		next();
	} else {
		next({ path: '/' });
	}
};

const checkUserAuth= (to, from, next) => {
	const user = JSON.parse(localStorage.getItem('user'));

	if (to.matched.some((route) => route.meta.requiresAuth)) {
		if (!user.isAuth) {
			next({
				name: LOGIN,
			});
		} else {
			next();
		}
	} else {
		next();
	}
}
const routes = [
	{
		path: '/',
		meta: { requiresAuth: true },
		redirect: { name: COURSE_DASHBOARD }, // DEFAULT PAGE
	},
	{
		path: '/login',
		name: LOGIN,
		component: LoginView,
		meta: { requiresAuth: false },
	},
	{
		path: '/reset',
		name: RESET,
		component: ResetView,
		meta: { requiresAuth: false },
	},

	{
		path: '/profile',
		name: PROFILE,
		component: ProfileView,
		meta: { requiresAuth: true, requiredRoles: [USER_ROLE, MANAGER_ROLE, ADMIN_ROLE] },
		beforeEnter: checkUserRole,
	},

	{
		path: '/users',
		name: USERS,
		component: UsersView,
		meta: { requiresAuth: true, requiredRoles: [USER_ROLE, MANAGER_ROLE, ADMIN_ROLE] },
		beforeEnter: checkUserRole,
	},

	{
		path: '/managers',
		name: MANAGERS,
		component: ManagersView,
		meta: { requiresAuth: true, requiredRoles: [ADMIN_ROLE] },
		beforeEnter: checkUserRole,
	},

	{
		path: '/courses',
		component: CoursesView,
		meta: { requiresAuth: true, requiredRoles: [USER_ROLE, MANAGER_ROLE, ADMIN_ROLE] },
		children: [
			{
				path: '',
				name: COURSE_DASHBOARD,
				component: CoursesDashboardView,
			},
			{
				path: ':id',
				name: COURSE_DETAILS,
				component: CourseDetailsView,
			},
		],
		beforeEnter: checkUserRole,
	},

	{
		path: '*',
		component: NotFoundView,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach(checkUserAuth);

export default router;

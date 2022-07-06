import Vue from 'vue';
import VueRouter from 'vue-router';

import LoginView from '../views/LoginView.vue';
import ResetView from '../views/ResetView.vue';
import NotFoundView from '../views/NotFoundView.vue';

import MemberView from '../views/member/MemberView.vue';
import MemberProfileView from '../views/member/MemberProfileView.vue';
import MembersListView from '../views/member/MembersListView.vue';
import MemberCoursesView from '../views/member/MemberCoursesView.vue';
import MemberCoursesDetailsView from '../views/member/MemberCoursesDetailsView.vue';

import ManagerView from '../views/manager/ManagerView.vue';
import ManagerProfileView from '../views/manager/ManagerProfileView.vue';
import ManagerMembersView from '../views/manager/ManagerMembersView.vue';
import ManagerCorsesView from '../views/manager/ManagerCorsesView.vue';
import ManagerCoursesDetailsView from '../views/manager/ManagerCoursesDetailsView.vue';

import AdminView from '../views/admin/AdminView.vue';
import AdminMembersView from '../views/admin/AdminMembersView.vue';
import AdminManagersView from '../views/admin/AdminManagersView.vue';
import AdminCoursesView from '../views/admin/AdminCoursesView.vue';
import AdminCoursesDetailsView from '../views/admin/AdminCoursesDetailsView.vue';
import {
	LOGIN,
	RESET,
	MEMBER,
	MEMBERS_LIST,
	MEMBER_PROFILE,
	MEMBER_COURSES,
	MEMBER_COURSES_DETAILS,
	MANAGER,
	MANAGER_PROFILE,
	MANAGER_MEMBERS,
	MANAGER_COURSES,
	MANAGER_COURSES_DETAILS,
	ADMIN,
	ADMIN_MEMBERS,
	ADMIN_MANAGERS,
	ADMIN_COURSES,
	ADMIN_COURSES_DETAILS,
} from '../constants/routes.constant';

import { ADMIN_ROLE, MANAGER_ROLE, MEMBER_ROLE } from '@/constants/roles.constant';

Vue.use(VueRouter);

// FAKE USER
const user = {
	userName: 'John Snow',
	isAuth: true,
	role: MEMBER_ROLE, // MANAGER_ROLE, ADMIN_ROLE
};

const routes = [
	{
		path: '/',
		meta: { requiresAuth: true },
		beforeEnter: (to, from, next) => {
			switch (user.role) {
				case MEMBER_ROLE:
					next({ name: MEMBER });
					break;
				case MANAGER_ROLE:
					next({ name: MANAGER });
					break;
				case ADMIN_ROLE:
					next({ name: ADMIN });
					break;
				default:
					break;
			}
		},
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
		path: '/member',
		name: MEMBER,
		component: MemberView,
		redirect: { name: MEMBER_COURSES },
		meta: { requiresAuth: true, requiredRole: MEMBER_ROLE },
		beforeEnter: (to, from, next) => {
			if (to.matched.some((route) => route.meta.requiredRole === user.role)) {
				next();
			} else {
				next({ path: '/' });
			}
		},
		children: [
			{
				path: 'profile',
				name: MEMBER_PROFILE,
				component: MemberProfileView,
			},
			{
				path: 'list',
				name: MEMBERS_LIST,
				component: MembersListView,
			},
			{
				path: 'courses',
				name: MEMBER_COURSES,
				component: MemberCoursesView,
			},
			{
				path: 'courses/:id',
				name: MEMBER_COURSES_DETAILS,
				component: MemberCoursesDetailsView,
				props: true,
			},
		],
	},

	{
		path: '/manager',
		name: MANAGER,
		component: ManagerView,
		redirect: { name: MANAGER_MEMBERS },
		meta: { requiresAuth: true, requiredRole: MANAGER_ROLE },
		beforeEnter: (to, from, next) => {
			if (to.matched.some((route) => route.meta.requiredRole === user.role)) {
				next();
			} else {
				next({ path: '/' });
			}
		},
		children: [
			{
				path: 'profile',
				name: MANAGER_PROFILE,
				component: ManagerProfileView,
			},
			{
				path: 'members',
				name: MANAGER_MEMBERS,
				component: ManagerMembersView,
			},
			{
				path: 'courses',
				name: MANAGER_COURSES,
				component: ManagerCorsesView,
			},
			{
				path: 'courses/:id',
				name: MANAGER_COURSES_DETAILS,
				component: ManagerCoursesDetailsView,
				props: true,
			},
		],
	},

	{
		path: '/admin',
		name: ADMIN,
		component: AdminView,
		redirect: { name: ADMIN_MEMBERS },
		meta: { requiresAuth: true, requiredRole: ADMIN_ROLE },
		beforeEnter: (to, from, next) => {
			if (to.matched.some((route) => route.meta.requiredRole === user.role)) {
				next();
			} else {
				next({ path: '/' });
			}
		},
		children: [
			{
				path: 'members',
				name: ADMIN_MEMBERS,
				component: AdminMembersView,
			},
			{
				path: 'managers',
				name: ADMIN_MANAGERS,
				component: AdminManagersView,
			},
			{
				path: 'courses',
				name: ADMIN_COURSES,
				component: AdminCoursesView,
			},
			{
				path: 'courses/:id',
				name: ADMIN_COURSES_DETAILS,
				component: AdminCoursesDetailsView,
				props: true,
			},
		],
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

router.beforeEach((to, from, next) => {
	// TODO: check if user is authorized here
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
});

export default router;

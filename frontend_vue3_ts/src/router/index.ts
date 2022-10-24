import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import LoginViewVue from "../views/LoginView.vue";
import MentorsViewVue from "../views/MentorsView.vue";
import ProfileViewVue from "../views/ProfileView.vue";
import StudentsViewVue from "../views/StudentsView.vue";
import AdminsViewVue from "../views/AdminsView.vue";
import CoursesViewVue from "../views/CoursesView.vue";
import CoursesDashboardViewVue from "../views/CoursesDashboardView.vue";
import CourseDetailsViewVue from "../views/CourseDetailsView.vue";
import NotFoundViewVue from "../views/NotFoundView.vue";

import { ROLES, ROUTE_NAMES, ROUTE_PATH } from "../models/router.model";
import { authGuard, isCourseExist, roleGuard } from "./utils";


const routes: RouteRecordRaw[] = [
  {
    path: "/",
    meta: { requiresAuth: true },
    redirect: { name: ROUTE_NAMES.COURSE_DASHBOARD }, // DEFAULT PAGE
  },
  {
    path: ROUTE_PATH.LOGIN,
    name: ROUTE_NAMES.LOGIN,
    component: LoginViewVue,
    meta: { requiresAuth: false },
  },
  {
    path: ROUTE_PATH.PROFILE,
    name: ROUTE_NAMES.PROFILE,
    component: ProfileViewVue,
    meta: { requiresAuth: true },
  },
  {
    path: ROUTE_PATH.STUDENTS,
    name: ROUTE_NAMES.STUDENTS,
    component: StudentsViewVue,
    meta: { requiresAuth: true },
  },
  {
    path: ROUTE_PATH.MENTORS,
    name: ROUTE_NAMES.MENTORS,
    component: MentorsViewVue,
    meta: { requiresAuth: true, requiredRoles: [ROLES.ADMIN_ROLE] },
    beforeEnter: roleGuard,
  },
  {
    path: ROUTE_PATH.ADMINS,
    name: ROUTE_NAMES.ADMINS,
    component: AdminsViewVue,
    meta: { requiresAuth: true, requiredRoles: [ROLES.ADMIN_ROLE] },
    beforeEnter: roleGuard, 
  },
  {
    path: ROUTE_PATH.COURSES,
    component: CoursesViewVue,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: ROUTE_NAMES.COURSE_DASHBOARD,
        component: CoursesDashboardViewVue,
      },
      {
        path: ":id",
        name: ROUTE_NAMES.COURSE_DETAILS,
        component: CourseDetailsViewVue,
        beforeEnter: isCourseExist,
      },
    ],
  },
  {
	path: '/:catcAll(.*)',
    name: ROUTE_NAMES.NOT_FOUND,
    component: NotFoundViewVue,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach(authGuard)

export default router
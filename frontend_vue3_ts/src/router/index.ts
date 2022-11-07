import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

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
    component: () => import("../views/LoginView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: ROUTE_PATH.PROFILE,
    name: ROUTE_NAMES.PROFILE,
    component: () => import("../views/ProfileView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: ROUTE_PATH.STUDENTS,
    name: ROUTE_NAMES.STUDENTS,
    component: () => import("../views/StudentsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: ROUTE_PATH.MENTORS,
    name: ROUTE_NAMES.MENTORS,
    component: () => import("../views/MentorsView.vue"),
    meta: { requiresAuth: true, requiredRoles: [ROLES.ADMIN_ROLE] },
    beforeEnter: roleGuard,
  },
  {
    path: ROUTE_PATH.ADMINS,
    name: ROUTE_NAMES.ADMINS,
    component: () => import("../views/AdminsView.vue"),
    meta: { requiresAuth: true, requiredRoles: [ROLES.ADMIN_ROLE] },
    beforeEnter: roleGuard, 
  },
  {
    path: ROUTE_PATH.COURSES,
    component: () => import("../views/CoursesView.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: ROUTE_NAMES.COURSE_DASHBOARD,
        component: () => import("../views/CoursesDashboardView.vue"),
      },
      {
        path: ":id",
        name: ROUTE_NAMES.COURSE_DETAILS,
        component: () => import("../views/CourseDetailsView.vue"),
        beforeEnter: isCourseExist,
      },
    ],
  },
  {
	path: '/:catcAll(.*)',
    name: ROUTE_NAMES.NOT_FOUND,
    component: () => import("../views/NotFOundView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach(authGuard)

export default router
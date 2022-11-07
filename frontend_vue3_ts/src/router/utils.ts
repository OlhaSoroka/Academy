import { NavigationGuard } from "vue-router";
import { ROLES, ROUTE_NAMES } from "../models/router.model";
import { useCoursesStore } from "../store/courses";
import { useUserStore } from "../store/user";

export const roleGuard: NavigationGuard = (to, _, next): void => {
  const userStore = useUserStore();
  const role = userStore.currentUser?.role;
  if (
    role &&
    to.matched.some((route) =>
      (route.meta.requiredRoles as ROLES[]).includes(role),
    )
  ) {
    next();
  } else {
    next({ path: "/" });
  }
};

export const authGuard: NavigationGuard = async (
  to,
  _,
  next,
): Promise<void> => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")!);
  const userStore = useUserStore();
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!currentUser) {
      userStore.setUser(null);
      next({
        name: ROUTE_NAMES.LOGIN,
      });
    } else {
      userStore.setUser(currentUser);
      next();
    }
  } else {
    next();
  }
};

export const isCourseExist: NavigationGuard = async (
  to,
  _,
  next,
): Promise<void> => {
  const courseStore = useCoursesStore();
  const courses = courseStore.coursesGetter;
  const validIds = courses.map((course) => `${course.id}`);
  if (validIds.includes(to.params.id as string)) {
    next();
  } else {
    next({ path: "*" });
  }
};

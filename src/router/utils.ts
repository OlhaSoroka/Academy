import { NavigationGuard } from "vue-router";
import { getCourseById } from "../api/course";
import { ROLES, ROUTE_NAMES } from "../models/router.model";
import { useCourseDetailsStore } from "../store/course-details.store";
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
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!currentUser) {
      const userStore = useUserStore();
      userStore.setUser(null);
      next({
        name: ROUTE_NAMES.LOGIN,
      });
    } else {
      const userStore = useUserStore();
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
  const course = await getCourseById(to.params.id as string);
  if (course) {
    const courseDetailsStore = useCourseDetailsStore();
    courseDetailsStore.setCourseDetails(course);
    next();
  } else {
    next({ path: "*" });
  }
};

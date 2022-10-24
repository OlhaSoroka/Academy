import { NavigationGuard } from "vue-router";
import { ROLES, ROUTE_NAMES } from "../models/router.model";

export const roleGuard: NavigationGuard = (to, _, next): void => {
  // TODO: rewrite after store
  // const role = store.getters['user/user'] ? store.getters['user/user'].role : null;
  const role = ROLES.ADMIN_ROLE;
  if (
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
  // TODO: rewrite after user store
  // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const currentUser = {
    fullName: "InventorSoft Admin",
    role: "admin",
    id: "91KxMu6LrEgEPNdX1lKxaMvHHQM2",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/inventorsoft-vue-2022-d566c.appspot.com/o/images%2Fwebportaladmin%40inventorsoft.co.jpg?alt=media&token=7ba6a36f-578b-412e-88fa-82ba88ef377b",
    email: "webportaladmin@inventorsoft.co",
  };
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!currentUser) {
      //   store.dispatch("user/setUser", null, { root: true });
      next({
        name: ROUTE_NAMES.LOGIN,
      });
    } else {
      //   store.dispatch("user/setUser", currentUser, { root: true });
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
  // TODO: rewrite after api
  //   const courses = await getAllCourses();
  //   const validIds = courses.map((course) => course.id);
  if (true) {
    next();
  } else {
    next({ name: ROUTE_NAMES.NOT_FOUND });
  }
};

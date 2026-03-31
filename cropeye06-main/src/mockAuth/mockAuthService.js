import { mockUsers } from "./mockUsers";

export const mockLogin = (phone_number, password) => {
  const user = mockUsers.find(
    (u) => u.phone_number === phone_number && u.password === password,
  );
  if (user) {
    localStorage.setItem("authUser", JSON.stringify(user));
    return user;
  }
  return null;
};

export const mockLogout = () => {
  localStorage.removeItem("authUser");
};

export const getMockUser = () => {
  const raw = localStorage.getItem("authUser");
  return raw ? JSON.parse(raw) : null;
};

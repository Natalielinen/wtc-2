
export type Lang = "ru" | "en";

export const translation: Record<Lang, Record<string, string>> = {
  ru: {
    title: "Что посмотреть?",
    description: "Персональная библиотека фильмов и игр",
    signin: "Войдите",
    or: "или",
    signup: "Зарегистрируйтесь",
    viewAndAdd: "чтобы добавлять и просматривать фильмы и игры",
    successSignoutMessage: "Вы вышли из аккаунта",
    signoutError: "Ошибка при выходе",
    darkTheme: "Темная",
    lightTheme: "Светлая",
    profile: "Профиль",
    add: "Добавить",
    signOut: "Выйти",
    signIn: "Войти",
  },
  en: {
    title: "What to choose?",
    description: "Personal library of movies and games",
    signin: "Sign in",
    or: "or",
    signup: "Sign up",
    viewAndAdd: "to view and add movies and games",
    successSignoutMessage: "You have successfully signed out",
    signoutError: "Sign out error",
    darkTheme: "Dark",
    lightTheme: "Light",
    profile: "Profile",
    add: "Add",
    signOut: "Sign out",
    signIn: "Sign in",
  },
};

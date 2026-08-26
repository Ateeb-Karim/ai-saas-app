export type LINKtype = {
  name: string;
  href: string;
};

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export type signInFormType = {
  email: string;
  password: string;
};

export type SignupFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type NavLinksType = {
  title: string;
  href: string;
  icon?: string;
};

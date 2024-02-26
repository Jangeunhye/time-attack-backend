export type SignUpData = {
  email: string;
  password: string;
  nickname: string;
  selfIntroduction: string;
};
export type LogInData = {
  email: string;
  password: string;
};

export type UpdateProfileData = {
  nickname: string;
  userId: string;
  selfIntroduction: string;
};

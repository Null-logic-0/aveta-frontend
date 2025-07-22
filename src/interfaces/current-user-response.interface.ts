export interface GetMeResponse {
  data: {
    data: {
      id: number;
      userName: string;
      email: string;
      profileImage?: string;
      role: string;
      userPlan: string;
      isPaid: boolean;
      googleId?: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

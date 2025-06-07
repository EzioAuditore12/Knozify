import { z } from "zod";

export const loginUserSchema = z.object({
	username: z.string().min(1, "Username is required"),
	password: z.string().min(1, "Password is required"),
});

export type loginUserType = z.infer<typeof loginUserSchema>;

export const loginUserObject: loginUserType = {
	username: "",
	password: "",
};

export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard", "/editPlugin", "/profile", "/editPlugin/:id*"] };
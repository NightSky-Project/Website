import { getServerSession} from "next-auth";
import { redirect } from "next/navigation";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Auth = async () => {
    const session = await getServerSession(options);

    if (session) {
        redirect("/dashboard");
    }
    else {
        redirect("/login");
    }
};

export default Auth;
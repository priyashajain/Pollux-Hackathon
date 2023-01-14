import { Link } from "react-router-dom";

function LoginForTesting() {
    const googleAuth = () => {
        window.open(
            `https://ask-your-seniors-backend.vercel.app/auth/google/callback`,
            "_self"
        );
    };
    return (
        <div>

            <button onClick={googleAuth}>
                <span>Sign in with Google</span>
            </button>
            <p>
                New Here ? <Link to="/signup">Sing Up</Link>
            </p>
        </div>

    );
}

export default LoginForTesting;
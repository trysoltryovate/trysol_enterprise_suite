import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-y-3">
        <h1 className="text-3xl font-bold">Login Page...!</h1>

        <Link to={"/home"}>Go to Home</Link>
      </div>
    </>
  );
}

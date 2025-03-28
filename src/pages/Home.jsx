import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-y-3">
        <h1 className="text-3xl font-bold">Home Page...!</h1>

        <Link to={"/"}>Go to login</Link>
      </div>
    </>
  );
}

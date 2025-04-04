import { Link } from "react-router-dom";
import Appcard from "../components/AppCard";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-y-3">
        <Appcard />

        <Link to={"/"}>Go to login</Link>
      </div>
    </>
  );
}

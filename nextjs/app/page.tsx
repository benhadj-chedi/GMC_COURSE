import Image from "next/image";
import Link from "next/link";
import profilePic from "../public/profile.jpg";

export default function Home() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>{" "}
      <div>
        <h1>Welcome to My Portfolio</h1>
        <Image
          src={profilePic}
          alt="Profile Picture"
          width={150}
          height={150}
        />
        <p>I'm a web developer specializing in Next.js.</p>
      </div>
    </>
  );
}

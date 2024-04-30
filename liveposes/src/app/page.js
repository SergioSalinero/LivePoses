
import Link from 'next/link'; 

export default function Home() {

  return (
    <div>
      <h1>Home Page</h1>
      {/* Usar Link para manejar la navegación interna de Next.js */}
      <Link href="/Login">
        Go to BlazePose Page
      </Link>
    </div>
  );
}

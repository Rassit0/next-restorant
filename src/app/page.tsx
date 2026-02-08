import { redirect } from "next/navigation";

// snippet prc
export default function HomePage() {
  redirect('admin/home')
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}
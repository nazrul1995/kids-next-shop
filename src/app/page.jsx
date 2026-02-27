import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
import Test from "@/components/Test";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default function Home() {
  const session = getServerSession(authOptions);
  return (
    <div className="space-y-20">
      <section>
        <Test></Test>
        <Banner></Banner>
      </section>

      <section>
        <Products></Products>
      </section>
    </div>
  );
}

import Image from "next/image";
import MascotR from "./Point_R.png";

export default function Home() {
  return (
    <Image
      src={MascotR}
      alt="마스코트"
      width="400"
      height="600"
      className="mt-12"
    />
  );
}

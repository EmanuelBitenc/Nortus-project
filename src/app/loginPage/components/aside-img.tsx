import "../style.css";
import Image from "next/image";
import loginFigure from "../../../../public/imgs/loginFigure.png";
import { ChevronDown, Headphones } from "@deemlol/next-icons";

export default function AsideImg() {
  return (
    <div className="relative h-[620px] w-full">
      <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl">
        <Image
          src={loginFigure}
          alt="Ilustração"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      <div className="absolute top-0 right-0 flex items-center gap-3 rounded-bl-2xl bg-(--background) px-2 py-2">
        <button className="buttonHelp">
          <Headphones size={16} />
          <span>Ajuda</span>
        </button>

        <button className="buttonHelp">
          <span className="text-base">🇧🇷</span>
          <span>PT-br</span>
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
}

import GamePage from "@/app/components/GamePage";
import { clairObscurData } from "@/app/data/gameData";

export default function Home() {
  return <GamePage game={clairObscurData} />;
}

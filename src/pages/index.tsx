import { Inter } from "next/font/google";
import { Sudoku } from "../components/containers/board";
import { BoardContextProvider } from "../shared/context/board-context";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex h-screen items-center justify-center bg-gray-400 ${inter.className}`}
    >
      <BoardContextProvider>
        <Sudoku />
      </BoardContextProvider>
    </main>
  );
}

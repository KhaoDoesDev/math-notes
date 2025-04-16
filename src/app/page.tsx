import MathEditor from "@/components/math-editor"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center p-8">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Math Notes Testing App</h1>
        <MathEditor />
				<span className="gap-1 flex text-muted-foreground *:hover:text-foreground text-sm mt-6 text-center mx-auto w-fit"> 
					<Link href={"https://github.com/KhaoDoesDev/math-notes"} className="transition-colors duration-200">View on GitHub</Link>
					•
					<Link href={"https://www.khaodoes.dev"} className="transition-colors duration-200">Made by Khao</Link>
				</span>
      </div>
    </main>
  )
}

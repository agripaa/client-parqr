import { Navbar } from "@/components/navbar";

export default function PelanggarLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center w-full py-2 md:py-2">
			<Navbar />
			<div className="container mx-auto max-w-7xl items-center inline-block w-full text-center justify-center">
				{children}
			</div>
		</section>
	);
}

import { Navbar } from "@/components/navbar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center w-full">
			<Navbar />
			<div className="container mx-auto max-w-7xl inline-block w-full justify-center">
				{children}
			</div>
		</section>
	);
}

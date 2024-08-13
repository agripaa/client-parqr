export default function OwnerLoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center w-full">
			<div className="inline-block w-full justify-center">
				{children}
			</div>
		</section>
	);
}

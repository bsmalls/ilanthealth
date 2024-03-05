import '@/app/ui/globals.css';
import type { Metadata } from "next";
import { montserrat } from '@/app/ui/fonts';

export const metadata: Metadata = {
title: "Ilant Health: Google Books Search",
description: "Search the Google Books API",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${montserrat.className} antialiased bg-[rgb(244,244,244)]`}>
				<main className="flex min-h-screen flex-col">
					{children}
				</main>
			</body>
		</html>
	);
}

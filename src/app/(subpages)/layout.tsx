import AppShell from "@/components/layout/AppShell";
import React from "react";

export default function SubpagesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AppShell>{children}</AppShell>;
}

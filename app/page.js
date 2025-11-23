"use client";
import AccessDeny from "@/components/AccessDeny";
import ProductList from "@/components/ProductList";
import { useSession } from "next-auth/react";

export default function page() {
	const { data: session } = useSession();

	if (!session) return <AccessDeny />;

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative">
		
			<div className="relative">
				<ProductList />
			</div>
		</div>
	);
}

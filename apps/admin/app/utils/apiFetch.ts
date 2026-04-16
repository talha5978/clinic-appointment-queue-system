const API_BASE = process.env.VITE_API_URL;
export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
	const res = await fetch(`${API_BASE}/api/${url}`, {
		headers: { "Content-Type": "application/json" },
		...options,
	});

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error?.message || "Something went wrong", {
			cause: error,
		});
	}

	return res.json();
}

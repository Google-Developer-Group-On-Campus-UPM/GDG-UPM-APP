import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = () => {
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem("theme") || "light";
	});

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");

		return () => {
			document.documentElement.classList.remove("dark");
		};
	}, [theme]);

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
	};

	return (
		<button className="px-4 py-2 border rounded" onClick={toggleTheme}>
			{theme === "dark" ? (
				<Sun className="w-6 h-6" />
			) : (
				<Moon className="w-6 h-6" />
			)}
			<span className="sr-only">Toggle dark mode</span>
		</button>
	);
};

export default DarkModeToggle;

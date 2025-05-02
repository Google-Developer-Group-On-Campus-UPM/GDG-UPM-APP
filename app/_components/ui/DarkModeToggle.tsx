import { useState, useEffect } from 'react';

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
		<button className="dark-mode-button" onClick={toggleTheme}>
			Toggle Dark Mode
		</button>
	);
};

export default DarkModeToggle;

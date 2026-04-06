"use client";

import { TextField } from "@mui/material";

export default function Library() {
	return (
		<div className="bg-white text-black h-full">
			<div className="grid grid-cols-4 w-[800px] p-4 gap-4">
				<span className="p-4 flex items-center">First Name : </span>
				<TextField className="border-black" required></TextField>
				<span className="p-4 flex items-center">Last Name : </span>
				<TextField className="border-black" required></TextField>
				<span className="p-4 flex items-center">Phone : </span>
				<TextField className="border-black" required></TextField>
				<span className="p-4 flex items-center">Address : </span>
				<TextField className="border-black row-span-2"></TextField>
				<span className="p-4 flex items-center">Email : </span>
				<TextField className="border-black" required></TextField>
				<div></div>
				<button>Clear</button>
				<button>Submit</button>
				<button>Help</button>
			</div>
		</div>
	);
}

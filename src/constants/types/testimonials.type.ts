export interface Testimonial {
	id: string;
	variant: "video" | "text";
	title?: string;
	description: string;
	author: string;
	role: string;
	videoSrc?: string;
	avatarSrc?: string;
}

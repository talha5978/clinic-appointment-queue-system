import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Calendar, UserCheck, Bell, ChevronRight, Users, Clock, Stethoscope } from "lucide-react";

export function meta({}: Route.MetaArgs) {
	return [{ title: "Home | React Router" }, { name: "description", content: "Welcome to React Router!" }];
}

export const loader = () => {
	console.log("process.env.VITE_API_URL: ", process.env.VITE_API_URL);
	return null;
};

export default function HomePage() {
	return (
		<div className="min-h-screen bg-white font-sans">
			{/* Top Bar - Clinic News */}
			<div className="bg-[#0A2540] text-white py-2 text-sm">
				<div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
						<span className="font-medium">Clinic News</span>
					</div>
					<div className="hidden md:flex items-center gap-8 text-xs">
						<a href="#" className="hover:text-blue-300 transition-colors">
							Latest Updates
						</a>
						<a href="#" className="hover:text-blue-300 transition-colors">
							COVID Protocols
						</a>
						<a href="#" className="hover:text-blue-300 transition-colors">
							New Services
						</a>
					</div>
					<Button variant="ghost" size="sm" className="text-white hover:bg-white/10 text-xs">
						Live Queue →
					</Button>
				</div>
			</div>

			{/* Navbar */}
			<nav className="border-b bg-white sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
							E
						</div>
						<div>
							<span className="font-semibold text-2xl tracking-tight">Expert Care</span>
						</div>
					</div>

					<div className="hidden md:flex items-center gap-8 text-sm font-medium">
						<a href="#" className="hover:text-blue-600 transition-colors">
							How it Works
						</a>
						<a href="#" className="hover:text-blue-600 transition-colors">
							Our Doctors
						</a>
						<a href="#" className="hover:text-blue-600 transition-colors">
							Real-time Queue
						</a>
						<a href="#" className="hover:text-blue-600 transition-colors">
							For Clinics
						</a>
					</div>

					<div className="flex items-center gap-4">
						<Button variant="outline" size="sm" className="hidden md:flex">
							View Today&apos;s Queue
						</Button>
						<Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
							Book Appointment
						</Button>
					</div>
				</div>
			</nav>

			{/* HERO SECTION */}
			<div className="max-w-7xl mx-auto px-6 pt-12 pb-16 grid md:grid-cols-2 gap-12 items-center">
				<div className="space-y-8">
					<div>
						<Badge
							variant="secondary"
							className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100"
						>
							Now serving 8 patients • Updated 2 min ago
						</Badge>
						<h1 className="text-6xl font-semibold tracking-tighter leading-none text-[#0A2540]">
							Expert Care,
							<br />
							Minimal Wait.
						</h1>
						<p className="mt-6 text-xl text-gray-600 max-w-md">
							Book your appointment online and track your place in the queue in real-time.
						</p>
					</div>

					<div className="flex flex-wrap gap-4">
						<Button
							size="lg"
							className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-7 rounded-3xl"
						>
							Book Appointment
							<ChevronRight className="ml-2" />
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="text-lg px-8 py-7 rounded-3xl border-2"
						>
							View Today&apos;s Queue
						</Button>
					</div>

					<div className="flex items-center gap-8 text-sm">
						<div className="flex -space-x-4">
							<Avatar className="w-8 h-8 border-2 border-white">
								<AvatarImage src="https://picsum.photos/id/64/128/128" />
							</Avatar>
							<Avatar className="w-8 h-8 border-2 border-white">
								<AvatarImage src="https://picsum.photos/id/201/128/128" />
							</Avatar>
							<Avatar className="w-8 h-8 border-2 border-white">
								<AvatarImage src="https://picsum.photos/id/29/128/128" />
							</Avatar>
						</div>
						<p className="text-gray-500">
							Trusted by <span className="font-semibold text-gray-700">4,892 patients</span>{" "}
							this month
						</p>
					</div>
				</div>

				{/* Phone Mockup */}
				<div className="relative flex justify-center">
					<div className="relative w-[280px] h-[560px] bg-black rounded-[52px] p-3 shadow-2xl border-8 border-black">
						<div className="bg-white w-full h-full rounded-[42px] overflow-hidden relative">
							{/* Phone screen content - matches the design */}
							<div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white flex flex-col">
								{/* Phone header */}
								<div className="px-6 pt-8 pb-4 bg-white border-b">
									<div className="flex justify-between items-center">
										<div className="text-sm font-medium">Queue • Dr. Julian Voss</div>
										<div className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-3xl">
											LIVE
										</div>
									</div>
								</div>

								{/* Queue content inside phone */}
								<div className="flex-1 px-6 py-8 flex flex-col items-center justify-center text-center">
									<div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center mb-6">
										<img
											src="https://picsum.photos/id/1015/200/200"
											width={80}
											height={80}
											className="opacity-80"
											alt=""
										/>
									</div>
									<div className="text-5xl font-bold text-blue-600 mb-1">08</div>
									<div className="text-gray-500 text-sm mb-8">
										You are number <span className="font-semibold text-gray-700">8</span>{" "}
										in queue
									</div>

									<div className="w-full bg-white shadow rounded-3xl p-4 text-left">
										<div className="flex justify-between text-xs mb-3">
											<div className="flex items-center gap-2">
												<Clock className="w-4 h-4" />
												<span>Est. wait</span>
											</div>
											<span className="font-semibold">14 minutes</span>
										</div>
										<div className="h-2 bg-gray-100 rounded-3xl relative overflow-hidden">
											<div className="absolute left-0 top-0 h-2 w-2/3 bg-blue-600 rounded-3xl"></div>
										</div>
									</div>
								</div>

								<div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 flex items-center gap-1">
									<div className="w-3 h-3 border border-gray-300 rounded-full"></div>
									Powered by Expert Queue
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* PATIENT JOURNEY */}
			<div className="max-w-7xl mx-auto px-6 py-20 bg-gray-50">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-semibold tracking-tight">Patient Journey</h2>
					<p className="text-gray-600 mt-3">Simple steps. Zero confusion. Real-time visibility.</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{/* Step 1 */}
					<Card className="border-0 shadow-sm hover:shadow transition-all">
						<CardContent className="p-8">
							<div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
								<Calendar className="w-7 h-7" />
							</div>
							<div className="flex items-center gap-3 mb-4">
								<div className="text-blue-600 font-bold text-xl">1</div>
								<div className="font-semibold text-xl">Book</div>
							</div>
							<p className="text-gray-600 leading-relaxed">
								Select your preferred doctor and time slot. Get instant confirmation. No phone
								calls needed.
							</p>
							<div className="mt-8 text-xs text-blue-600 font-medium flex items-center gap-2">
								Takes 45 seconds <ChevronRight className="w-3 h-3" />
							</div>
						</CardContent>
					</Card>

					{/* Step 2 */}
					<Card className="border-0 shadow-sm hover:shadow transition-all">
						<CardContent className="p-8">
							<div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
								<UserCheck className="w-7 h-7" />
							</div>
							<div className="flex items-center gap-3 mb-4">
								<div className="text-emerald-600 font-bold text-xl">2</div>
								<div className="font-semibold text-xl">Arrive &amp; Check-in</div>
							</div>
							<p className="text-gray-600 leading-relaxed">
								Walk in or scan QR at reception. Your appointment instantly becomes a live
								queue token.
							</p>
							<div className="mt-8 text-xs text-emerald-600 font-medium flex items-center gap-2">
								Zero paperwork <ChevronRight className="w-3 h-3" />
							</div>
						</CardContent>
					</Card>

					{/* Step 3 */}
					<Card className="border-0 shadow-sm hover:shadow transition-all">
						<CardContent className="p-8">
							<div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
								<Bell className="w-7 h-7" />
							</div>
							<div className="flex items-center gap-3 mb-4">
								<div className="text-amber-600 font-bold text-xl">3</div>
								<div className="font-semibold text-xl">Get Called</div>
							</div>
							<p className="text-gray-600 leading-relaxed">
								Real-time notifications on your phone. No more crowded waiting rooms.
							</p>
							<div className="mt-8 text-xs text-amber-600 font-medium flex items-center gap-2">
								You get called by name &amp; token <ChevronRight className="w-3 h-3" />
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* OUR CLINICAL AUTHORITIES */}
			<div className="max-w-7xl mx-auto px-6 py-20">
				<div className="flex justify-between items-end mb-10">
					<div>
						<h2 className="text-4xl font-semibold tracking-tight">Our Clinical Authorities</h2>
						<p className="text-gray-600">
							Hand-picked specialists with exceptional patient ratings
						</p>
					</div>
					<Button variant="outline" className="hidden md:flex">
						View all specialists <ChevronRight className="ml-2" />
					</Button>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{/* Doctor 1 */}
					<Card className="overflow-hidden group hover:-translate-y-1 transition-all">
						<div className="h-80 bg-gray-100 relative">
							{/* <Image 
                src="https://picsum.photos/id/64/600/800" 
                alt="Dr. Julian Voss"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              /> */}
							<div className="absolute top-4 right-4 bg-white text-xs font-medium px-4 py-1 rounded-3xl flex items-center gap-1 shadow">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								Available
							</div>
						</div>
						<CardContent className="p-6">
							<div className="flex justify-between items-start">
								<div>
									<h4 className="font-semibold text-xl">Dr. Julian Voss</h4>
									<p className="text-gray-500 text-sm">Lead Consultant Physician</p>
								</div>
								<Badge>4.98 ★</Badge>
							</div>
							<p className="text-xs text-gray-500 mt-4 line-clamp-2">
								18 years experience • Internal Medicine • Former Harvard Medical Faculty
							</p>
							<Button className="w-full mt-6 bg-[#0A2540] hover:bg-black">Select Doctor</Button>
						</CardContent>
					</Card>

					{/* Doctor 2 */}
					<Card className="overflow-hidden group hover:-translate-y-1 transition-all">
						<div className="h-80 bg-gray-100 relative">
							{/* <Image 
                src="https://picsum.photos/id/201/600/800" 
                alt="Dr. Sarah Chen"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              /> */}
							<div className="absolute top-4 right-4 bg-white text-xs font-medium px-4 py-1 rounded-3xl flex items-center gap-1 shadow">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								Available
							</div>
						</div>
						<CardContent className="p-6">
							<div className="flex justify-between items-start">
								<div>
									<h4 className="font-semibold text-xl">Dr. Sarah Chen</h4>
									<p className="text-gray-500 text-sm">Paediatric Gastroenterologist</p>
								</div>
								<Badge>4.95 ★</Badge>
							</div>
							<p className="text-xs text-gray-500 mt-4 line-clamp-2">
								Special interest in children’s digestive health • 12 years experience
							</p>
							<Button className="w-full mt-6 bg-[#0A2540] hover:bg-black">Select Doctor</Button>
						</CardContent>
					</Card>

					{/* Doctor 3 */}
					<Card className="overflow-hidden group hover:-translate-y-1 transition-all">
						<div className="h-80 bg-gray-100 relative">
							{/* <Image 
                src="https://picsum.photos/id/29/600/800" 
                alt="Dr. Marcus Thorne"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              /> */}
							{/* <img src="https://picsum.photos/id/29/600/800" alt="Dr. Marcus Thorne" className="object-cover transition-transform group-hover:scale-105" /> */}
							<div className="absolute top-4 right-4 bg-white text-xs font-medium px-4 py-1 rounded-3xl flex items-center gap-1 shadow">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								Available
							</div>
						</div>
						<CardContent className="p-6">
							<div className="flex justify-between items-start">
								<div>
									<h4 className="font-semibold text-xl">Dr. Marcus Thorne</h4>
									<p className="text-gray-500 text-sm">Consultant Cardiologist</p>
								</div>
								<Badge>4.99 ★</Badge>
							</div>
							<p className="text-xs text-gray-500 mt-4 line-clamp-2">
								22 years experience • Heart failure &amp; preventive cardiology
							</p>
							<Button className="w-full mt-6 bg-[#0A2540] hover:bg-black">Select Doctor</Button>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* REAL-TIME CLINIC PULSE */}
			<div className="max-w-7xl mx-auto px-6 py-16 bg-[#0A2540] text-white rounded-3xl mx-6 mb-20">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<div className="mb-8 md:mb-0">
						<div className="flex items-center gap-3">
							<div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
							<h3 className="uppercase text-sm tracking-[2px] font-medium">
								Real-time Clinic Pulse
							</h3>
						</div>
						<p className="text-3xl font-semibold mt-2">Live queue status • Updated just now</p>
					</div>

					<div className="grid grid-cols-3 gap-8 w-full md:w-auto">
						<div className="text-center">
							<div className="flex justify-center mb-2">
								<Users className="w-8 h-8" />
							</div>
							<div className="text-5xl font-semibold">08</div>
							<div className="text-sm text-gray-400 mt-1">Waiting</div>
						</div>
						<div className="text-center">
							<div className="flex justify-center mb-2">
								<Stethoscope className="w-8 h-8" />
							</div>
							<div className="text-5xl font-semibold">03</div>
							<div className="text-sm text-gray-400 mt-1">In Consultation</div>
						</div>
						<div className="text-center">
							<div className="flex justify-center mb-2">
								<Clock className="w-8 h-8" />
							</div>
							<div className="text-5xl font-semibold">14m</div>
							<div className="text-sm text-gray-400 mt-1">Avg Wait</div>
						</div>
					</div>

					<Button
						size="lg"
						variant="secondary"
						className="mt-8 md:mt-0 bg-white text-black hover:bg-white/90 px-10"
					>
						Join the Queue
					</Button>
				</div>
			</div>

			{/* FOOTER / CLINICAL NEWS */}
			<footer className="bg-white border-t">
				<div className="max-w-7xl mx-auto px-6 py-16">
					<div className="grid md:grid-cols-12 gap-y-12">
						<div className="md:col-span-5">
							<div className="flex items-center gap-3 mb-6">
								<div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
									E
								</div>
								<span className="font-semibold text-3xl tracking-tighter">Expert Care</span>
							</div>
							<p className="text-gray-500 max-w-xs">
								The only clinic operations system that turns chaos into structured flow.
							</p>
							<div className="mt-8 text-xs text-gray-400">
								© 2026 Expert Queue Systems. All rights reserved.
							</div>
						</div>

						<div className="md:col-span-2">
							<div className="uppercase text-xs font-semibold tracking-widest mb-6">
								Product
							</div>
							<div className="space-y-3 text-sm">
								<a href="#" className="block hover:text-blue-600">
									How it Works
								</a>
								<a href="#" className="block hover:text-blue-600">
									Patient App
								</a>
								<a href="#" className="block hover:text-blue-600">
									For Clinics
								</a>
							</div>
						</div>

						<div className="md:col-span-2">
							<div className="uppercase text-xs font-semibold tracking-widest mb-6">
								Company
							</div>
							<div className="space-y-3 text-sm">
								<a href="#" className="block hover:text-blue-600">
									About Us
								</a>
								<a href="#" className="block hover:text-blue-600">
									Blog
								</a>
								<a href="#" className="block hover:text-blue-600">
									Careers
								</a>
							</div>
						</div>

						<div className="md:col-span-3">
							<div className="uppercase text-xs font-semibold tracking-widest mb-6">
								Support
							</div>
							<div className="space-y-3 text-sm">
								<a href="#" className="block hover:text-blue-600">
									Clinical Support
								</a>
								<a href="#" className="block hover:text-blue-600">
									Patient Hotline
								</a>
								<a href="#" className="block hover:text-blue-600">
									Live Chat
								</a>
							</div>
						</div>
					</div>

					<Separator className="my-12" />

					<div className="text-xs flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
						<div>
							Built as the official front website for the Expert Queue Clinic Operations System
						</div>
						<div className="flex gap-6">
							<a href="#">Twitter</a>
							<a href="#">LinkedIn</a>
							<a href="#">Instagram</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

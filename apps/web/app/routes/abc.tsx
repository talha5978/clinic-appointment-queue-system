import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import {
	Search,
	ChevronRight,
	Home,
	List,
	Calendar,
	User,
	Info,
	CheckCircle,
	Star,
	Briefcase,
	Filter,
} from "lucide-react";

export default function SelectClinicianPage() {
	const clinicians = [
		{
			id: 1,
			name: "Dr. Julian Voss",
			specialty: "Cardiology & Vascular Medicine",
			rating: "4.9",
			reviews: "1.2k",
			experience: "12 yrs Exp.",
			status: "Available Today",
			statusColor: "emerald",
			image: "https://picsum.photos/id/64/128/128",
		},
		{
			id: 2,
			name: "Dr. Sarah Chen",
			specialty: "Internal Medicine & Diagnostics",
			rating: "5.0",
			reviews: "840",
			experience: "8 yrs Exp.",
			status: "Top Rated",
			statusColor: "blue",
			image: "https://picsum.photos/id/201/128/128",
		},
		{
			id: 3,
			name: "Dr. Marcus Thorne",
			specialty: "Orthopedic Surgeon",
			rating: "4.7",
			reviews: "2.1k",
			experience: "20 yrs Exp.",
			status: "Next: Tue",
			statusColor: "slate",
			image: "https://picsum.photos/id/29/128/128",
		},
		{
			id: 4,
			name: "Dr. Elena Rodriguez",
			specialty: "Pediatric Specialist",
			rating: "4.9",
			reviews: "450",
			experience: "6 yrs Exp.",
			status: "Available Today",
			statusColor: "emerald",
			image: "https://picsum.photos/id/1005/128/128",
		},
	];

	return (
		<div className="min-h-screen bg-[#f7f9fb] font-sans">
			{/* HEADER - Exact match to provided HTML */}
			<header className="bg-[#f7f9fb] sticky top-0 z-50 border-b">
				<div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-9 h-9 bg-[#004ac6] rounded-2xl flex items-center justify-center">
							<span className="text-white text-3xl leading-none mt-px">🩺</span>
						</div>
						<span className="text-2xl font-bold tracking-tighter text-[#191c1e]">
							The Clinical Authority
						</span>
					</div>

					<div className="hidden md:flex items-center gap-8">
						<nav className="flex items-center gap-8 text-sm">
							<a href="#" className="font-semibold text-[#004ac6]">
								Book Appointment
							</a>
							<a href="#" className="text-[#191c1e]/70 hover:text-[#191c1e] transition-colors">
								My Records
							</a>
							<a href="#" className="text-[#191c1e]/70 hover:text-[#191c1e] transition-colors">
								Support
							</a>
						</nav>
						<Button className="bg-[#004ac6] hover:bg-[#003ba1] text-white px-6 rounded-2xl">
							Sign In
						</Button>
					</div>

					<button className="md:hidden text-[#191c1e]">
						<span className="text-3xl">☰</span>
					</button>
				</div>
			</header>

			<main className="max-w-5xl mx-auto px-6 py-12">
				{/* PROGRESS INDICATOR */}
				<div className="mb-12">
					<div className="flex justify-between items-center mb-4">
						<div>
							<span className="text-[#004ac6] font-bold text-xs uppercase tracking-widest">
								STEP 01 OF 04
							</span>
							<h1 className="text-3xl font-bold tracking-tighter text-[#191c1e] mt-1">
								Select Clinician
							</h1>
						</div>
						{/* Progress dots - desktop only */}
						<div className="hidden md:flex gap-2">
							<div className="w-12 h-1.5 rounded-full bg-[#004ac6]"></div>
							<div className="w-12 h-1.5 rounded-full bg-[#c3c6d7]"></div>
							<div className="w-12 h-1.5 rounded-full bg-[#c3c6d7]"></div>
							<div className="w-12 h-1.5 rounded-full bg-[#c3c6d7]"></div>
						</div>
					</div>
					<p className="text-[#434655] text-sm max-w-xl">
						Choose from our network of world-class medical authorities and specialists to begin
						your clinical journey.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
					{/* LEFT COLUMN - Doctor Selection */}
					<div className="md:col-span-8 space-y-6">
						{/* Search + Filter */}
						<div className="flex flex-wrap gap-3 items-center justify-between">
							<div className="relative flex-1 min-w-[280px]">
								<Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#737686] w-5 h-5" />
								<Input
									placeholder="Search by name or specialization..."
									className="pl-12 h-14 bg-white border-0 rounded-3xl text-base shadow-sm focus:ring-2 focus:ring-[#004ac6]/20"
								/>
							</div>
							<Button
								variant="outline"
								className="h-14 px-6 rounded-3xl border-0 bg-white text-[#191c1e] flex items-center gap-2 hover:bg-[#f2f4f6]"
							>
								<Filter className="w-5 h-5" />
								All Specializations
							</Button>
						</div>

						{/* Doctor Cards - Bento Grid (rounded-full as in HTML) */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{clinicians.map((doctor) => (
								<Card
									key={doctor.id}
									className="group bg-white p-5 rounded-4xl border border-transparent hover:border-[#004ac6]/10 hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
								>
									<div className="flex items-start gap-4">
										<Avatar className="w-16 h-16 rounded-2xl">
											<AvatarImage src={doctor.image} alt={doctor.name} />
										</Avatar>

										<div className="flex-1">
											<div className="flex justify-between items-start">
												<h3 className="font-bold text-xl text-[#191c1e] tracking-tighter">
													{doctor.name}
												</h3>
												<Badge
													className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-3xl ${
														doctor.statusColor === "emerald"
															? "bg-[#007d55] text-white"
															: doctor.statusColor === "blue"
																? "bg-[#dae2fd] text-[#565e74]"
																: "bg-[#e0e3e5] text-[#434655]"
													}`}
												>
													{doctor.status}
												</Badge>
											</div>
											<p className="text-[#434655] text-sm mt-1">{doctor.specialty}</p>

											<div className="flex items-center gap-5 mt-5 text-xs text-[#737686]">
												<div className="flex items-center gap-1">
													<Star className="w-4 h-4 text-amber-400 fill-amber-400" />
													<span className="font-medium">{doctor.rating}</span>
													<span className="text-[#a3a6b8]">({doctor.reviews})</span>
												</div>
												<div className="flex items-center gap-1">
													<Briefcase className="w-4 h-4" />
													<span>{doctor.experience}</span>
												</div>
											</div>
										</div>
									</div>

									{/* Hover check icon - exact match */}
									<div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity group-hover:bg-muted p-2 rounded-full">
										<CheckCircle className="w-7 h-7 text-[#004ac6]" />
									</div>
								</Card>
							))}
						</div>

						{/* Bottom Actions */}
						<div className="flex justify-end gap-4 mt-12 pt-8 border-t border-[#c3c6d7]/30">
							<Button
								variant="ghost"
								className="px-8 py-6 text-[#004ac6] font-semibold text-base rounded-3xl hover:bg-white"
							>
								Cancel Booking
							</Button>
							<Button className="bg-[#004ac6] hover:bg-[#003ba1] text-white px-8 py-6 rounded-3xl text-base font-semibold flex items-center gap-3 shadow-lg shadow-[#004ac6]/20">
								Next Step
								<span className="text-xl leading-none">→</span>
							</Button>
						</div>
					</div>

					{/* RIGHT COLUMN - Booking Summary (Sticky Sidebar) */}
					<div className="md:col-span-4">
						<div className="bg-white p-8 rounded-3xl sticky top-8 shadow-sm">
							<h2 className="text-xl font-bold text-[#191c1e] mb-6">Booking Summary</h2>

							{/* No clinician selected */}
							<div className="bg-[#f2f4f6] rounded-3xl p-6 flex items-center gap-3 text-[#737686] text-sm mb-8">
								<span className="text-xl">⋯</span>
								<span className="italic">No clinician selected yet</span>
							</div>

							{/* Fee breakdown */}
							<div className="space-y-6 text-sm">
								<div className="flex justify-between">
									<span className="text-[#434655]">Consultation Fee</span>
									<span className="font-semibold text-[#191c1e]">$120.00</span>
								</div>
								<div className="flex justify-between">
									<span className="text-[#434655]">Service Tax (VAT)</span>
									<span className="font-semibold text-[#191c1e]">$18.00</span>
								</div>

								<div className="pt-4 border-t border-[#c3c6d7]/30 flex justify-between items-baseline">
									<span className="uppercase text-xs font-bold tracking-widest text-[#434655]">
										Estimated Total
									</span>
									<span className="text-3xl font-bold text-[#004ac6]">$138.00</span>
								</div>
							</div>

							{/* Security note */}
							<div className="mt-8 bg-[#dae2fd] rounded-3xl p-5 flex gap-3 text-xs leading-relaxed">
								<Info className="w-5 h-5 text-[#565e74] flex-shrink-0 mt-px" />
								<div className="text-[#3f465c]">
									Payment is secured by Clinical-Safe™.
									<br />
									You can reschedule up to 24 hours before your session without penalty.
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* MOBILE BOTTOM NAV - Exact match */}
			<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t z-50 px-6 py-3 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
				<button className="flex flex-col items-center text-[#004ac6]">
					<Home className="w-6 h-6" />
					<span className="text-[10px] font-bold uppercase tracking-widest mt-1">Home</span>
				</button>
				<button className="flex flex-col items-center text-[#737686]">
					<List className="w-6 h-6" />
					<span className="text-[10px] font-bold uppercase tracking-widest mt-1">Queue</span>
				</button>
				<button className="flex flex-col items-center text-[#737686]">
					<Calendar className="w-6 h-6" />
					<span className="text-[10px] font-bold uppercase tracking-widest mt-1">Book</span>
				</button>
				<button className="flex flex-col items-center text-[#737686]">
					<User className="w-6 h-6" />
					<span className="text-[10px] font-bold uppercase tracking-widest mt-1">Profile</span>
				</button>
			</nav>
		</div>
	);
}

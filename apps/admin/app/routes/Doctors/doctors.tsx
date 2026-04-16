import type { GetHighLevelDoctors } from "@repo/types/doctors.js";
import { type ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";
import {
	Form,
	Link,
	type LoaderFunctionArgs,
	useLoaderData,
	useLocation,
	useNavigation,
	useSearchParams,
} from "react-router";
import { toast } from "sonner";
import { doctorsApi } from "~/api/doctors.api";
import { MetaDetails } from "~/components/SEO/MetaDetails";
import {
	DataTable,
	DataTableSkeleton,
	TableColumnsToggle,
	type DataTableViewOptionsProps,
} from "~/components/Table/data-table";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { GetPaginationControls } from "~/utils/getPaginationControls";
import { getPaginationQueryPayload } from "~/utils/getPaginationQueryPayload";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { search, pageIndex, pageSize } = getPaginationQueryPayload({
		request,
	});

	const data = await doctorsApi.getHighLevelDoctors();

	return { data: data.data, query: search, pageIndex, pageSize };
};

export default function DoctorsPage() {
	const loaderData = useLoaderData<typeof loader>();
	const { data, query, pageIndex, pageSize } = loaderData;
	const navigation = useNavigation();
	const location = useLocation();

	const pageCount = Math.ceil(data.total / pageSize);
	const isFetchingThisRoute =
		navigation.state === "loading" && navigation.location?.pathname === location.pathname;

	const tableColumns: ColumnDef<GetHighLevelDoctors["data"]["doctors"][0], unknown>[] = [
		{
			id: "ID",
			cell: (info) => <div hidden>{info.row.original.id}</div>,
			header: () => "",
		},
		{
			id: "Name",
			enableHiding: false,
			accessorKey: "name",
			cell: (info) => info.row.original.name,
			header: () => "Name",
		},
		{
			id: "Created At",
			accessorKey: "created_at",
			cell: (info) => {
				if (info.row.original.createdAt) {
					const date = new Date(info.row.original.createdAt);
					return date.toLocaleDateString();
				}

				return "N/A";
			},
			header: () => "Created At",
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const rowData = row.original;

				const handleCopy = () => {
					try {
						navigator.clipboard.writeText(rowData.id.toString());
					} catch (error) {
						console.error("Error copying to clipboard:", error);
					}

					toast.success("Category Id copied to clipboard");
				};

				return (
					<>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button variant="secondary" className="h-8 w-8 p-0 cursor-pointer">
									<span className="sr-only">Open menu</span>
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={handleCopy}>Copy Id</DropdownMenuItem>
								<Link
									to={`${process.env.VITE_MAIN_APP_URL}/tours?categories=${rowData.id}`}
									viewTransition
									prefetch="intent"
									target="_blank"
								>
									<DropdownMenuItem>View Live</DropdownMenuItem>
								</Link>
								<Link to={`/tours?categories=${rowData.id}`} viewTransition prefetch="intent">
									<DropdownMenuItem>View Tours</DropdownMenuItem>
								</Link>
								<Link to={`${rowData.id}/update`} viewTransition prefetch="intent">
									<DropdownMenuItem>Update</DropdownMenuItem>
								</Link>
							</DropdownMenuContent>
						</DropdownMenu>
					</>
				);
			},
		},
	];

	const { onPageChange, onPageSizeChange } = GetPaginationControls({});

	const table = useReactTable({
		data: (data.doctors as GetHighLevelDoctors["data"]["doctors"]) ?? [],
		columns: tableColumns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		pageCount,
		state: {
			pagination: {
				pageIndex,
				pageSize,
			},
		},
	});

	return (
		<>
			<MetaDetails
				metaTitle="Doctors | Admin Panel"
				metaDescription="See all doctors details and manage them."
				metaKeywords="Doctors, Manage"
			/>
			<section className="flex flex-1 flex-col gap-6">
				<div>
					<div className="flex justify-between gap-3 flex-wrap">
						<h1 className="text-2xl font-semibold">Doctors</h1>
						<Link to="/doctors/add" viewTransition className="ml-auto" prefetch="intent">
							<Button size="sm" className="ml-auto">
								<PlusCircle width={18} />
								<span>Add Doctor</span>
							</Button>
						</Link>
					</div>
					{query && (
						<div className="mt-3">
							<p>Showing records for "{query?.trim()}"</p>
						</div>
					)}
				</div>
				<div className="rounded-md flex flex-col gap-4">
					<DataTableViewOptions table={table} disabled={isFetchingThisRoute} />
					{isFetchingThisRoute ? (
						<DataTableSkeleton noOfSkeletons={4} columns={tableColumns} />
					) : (
						<DataTable
							table={table}
							onPageChange={onPageChange}
							onPageSizeChange={onPageSizeChange}
							pageSize={pageSize}
							total={data.total ?? 0}
						/>
					)}
				</div>
			</section>
		</>
	);
}

function DataTableViewOptions({
	table,
	disabled,
}: DataTableViewOptionsProps<GetHighLevelDoctors["data"]["doctors"][0]>) {
	const [searchParams] = useSearchParams();
	let currentQuery = searchParams.get("q") ?? "";

	return (
		<div className="w-full flex justify-between gap-4 items-center">
			<div>
				<Form method="get" action="/doctors">
					<div className="relative">
						<Search
							className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
							width={18}
						/>
						<Input
							placeholder="Search doctors"
							name="q"
							className="w-full pl-8 md:min-w-75"
							id="search"
							defaultValue={currentQuery}
							disabled={disabled}
						/>
					</div>
					{/* Invisible submit button: Enter in input triggers submit */}
					<button type="submit" className="hidden">
						Search
					</button>
				</Form>
			</div>
			<TableColumnsToggle table={table} />
		</div>
	);
}

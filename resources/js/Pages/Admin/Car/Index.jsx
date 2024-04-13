import BreadcrumbPageComp from "@/Components/BreadCrumbPage";
import { Button } from "@/Components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, Head, usePage } from "@inertiajs/react"
import { Edit, EllipsisVertical, Plus, Trash } from "lucide-react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "../../../Components/ui/pagination"
import PaginationTable from "../../../Components/PaginationTable";
import { useEffect, useState } from "react";
import TextInput from "@/Components/TextInput";
import { router } from '@inertiajs/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";

export default function CarPage({ auth, props }) {
    const { car } = usePage().props;

    const { url } = usePage();
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        router.get(
            route(route().current()),
            { search: query },
            {
                preserveState: true,
                replace: true,
            }
        );


    };

    const deleteCar = (item) => {
        if (!window.confirm("Are you sure you want to delete this data?")) {
            return;
        }
        router.delete(route("car.destroy", item.id));
    };
    return (
        <AdminLayout auth={auth.user}>
            <Head title="PrimeDriveLux | Car Admin" />
            <section className="container py-12">
                <div className="flex justify-end">
                    <BreadcrumbPageComp textThird='Car' />
                </div>
                <div className='flex justify-between mt-5 mb-5'>
                    <div>
                        <TextInput type="search" value={query} onChange={handleChange} placeholder="Search ..." />
                        <Link href={route("car.page")} className="ml-2">
                            <Button variant="secondary">Reset</Button>
                        </Link>
                    </div>
                    <Button size="sm"><Link href={route("car.create")} className='flex text-center gap-y-2'><Plus className='w-4 h-4 mr-2' />Add Data</Link></Button>
                </div>
                <div className="pt-5">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Name Car</TableHead>
                                <TableHead>Merk Car</TableHead>
                                <TableHead>Plat</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {car.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No Data</TableCell>
                                </TableRow>
                            ) : (
                                car.data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            <img src={`http://localhost:8000/storage/${item.image}`} alt="" width={80} className="rounded-lg" />
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.merk}</TableCell>
                                        <TableCell>{item.plat}</TableCell>
                                        <TableCell className="text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <EllipsisVertical className='w-4 h-4' />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem className='text-center'>
                                                        <Link href={route("car.edit", item.id)} className='flex items-center gap-x-2'><Edit className='w-4 h-4' /> Edit</Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <button onClick={(e) => deleteCar(item)} className='flex items-center gap-x-2'><Trash className='w-4 h-4' /> Delete</button>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))

                            )}
                        </TableBody>
                    </Table>
                    <PaginationTable links={car.links} />
                </div>
            </section>
        </AdminLayout>
    )
}
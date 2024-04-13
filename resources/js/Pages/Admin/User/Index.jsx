import BreadcrumbPageComp from "@/Components/BreadCrumbPage";
import { Button } from "@/Components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, Head, usePage } from "@inertiajs/react"
import { Edit, EllipsisVertical, Plus, Trash } from "lucide-react"
import PaginationTable from "../../../Components/PaginationTable";
import { useEffect, useState } from "react";
import TextInput from "@/Components/TextInput";
import { router } from '@inertiajs/react'

export default function OrderPage({ auth, props }) {
    const { user } = usePage().props;

    // const { url } = usePage();
    // const [query, setQuery] = useState('');

    // const handleChange = (e) => {
    //     const newQuery = e.target.value;
    //     setQuery(newQuery);

    //     router.get(
    //         route(route().current()),
    //         { search: query },
    //         {
    //             preserveState: true,
    //             replace: true,
    //         }
    //     );
    // };

    const HandleApprove = ( item ) => {
        router.put(route('transaction.approve', item.id));
    };

    const HandleReturned = ( item ) => {
        router.put(route('transaction.returned', item.id));
    };

    return (
        <AdminLayout auth={auth.user}>
            <Head title="PrimeDriveLux | Car Admin" />
            <section className="container py-12">
                <div className="flex justify-end">
                    <BreadcrumbPageComp textThird='Users' />
                </div>
                <div className='flex justify-between mt-5 mb-5'>
                    <div>
                        {/* <TextInput type="search" value={query} onChange={handleChange} placeholder="Search ..." />
                        <Link href={route("transaction.page")} className="ml-2">
                            <Button variant="secondary">Reset</Button>
                        </Link> */}
                    </div>
                </div>
                <div className="pt-5">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {user.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No Data</TableCell>
                                </TableRow>
                            ) : (
                                user.data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.role}</TableCell>
                                    </TableRow>
                                ))

                            )}
                        </TableBody>
                    </Table>
                    <PaginationTable links={user.links} />
                </div>
            </section>
        </AdminLayout>
    )
}
import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard({ auth }){
    return (
        <AdminLayout auth={auth.user}>
            Admin Page
        </AdminLayout>
    )
}
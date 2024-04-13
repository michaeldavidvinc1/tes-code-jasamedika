import BreadcrumbPageComp from "@/Components/BreadCrumbPage";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react"
import { ImagePlus } from "lucide-react"
import { useEffect } from "react";
import { toast } from 'sonner'

export default function CreateCar({ auth }) {
    const { data, setData, post, processing, errors, reset, } = useForm({
        name: '',
        merk: '',
        plat: '',
        price: '',
        image: '',
    });

    const handleImageUpload = (event) => {
        setData('image', event.target.files[0]);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('car.store', {
            preserveScroll: true,
        }));
        // toast.success("Car created successfully!")
    };

    return (
        <AdminLayout auth={auth.user}>
            <Head title="PrimeDriveLux | Create Car" />
            <section className="container pt-12">
                <div className="flex justify-end">
                    <BreadcrumbPageComp textThird='Create' textSecond='Car' urlSecond='/admin/car' />
                </div>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-3 mt-10 gap-x-4">
                        <div className="w-full">
                            <InputLabel htmlFor="name" value="Mobil Name" />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                isFocused={true}
                                className="w-full mt-1"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div className="">
                            <InputLabel htmlFor="merk" value="Mobil Merk" />
                            <TextInput
                                id="merk"
                                type="text"
                                name="merk"
                                value={data.merk}
                                isFocused={true}
                                className="w-full mt-1"
                                onChange={(e) => setData('merk', e.target.value)}
                            />
                            <InputError message={errors.merk} className="mt-2" />
                        </div>
                        <div className="">
                            <InputLabel htmlFor="plat" value="PLat Mobile" />
                            <TextInput
                                id="plat"
                                type="text"
                                name="plat"
                                value={data.plat}
                                isFocused={true}
                                className="w-full mt-1"
                                onChange={(e) => setData('plat', e.target.value)}
                            />
                            <InputError message={errors.plat} className="mt-2" />
                        </div>
                        <div className="mt-3">
                            <InputLabel htmlFor="price" value="Price Mobile" />
                            <TextInput
                                id="price"
                                type="text"
                                name="price"
                                value={data.price}
                                isFocused={true}
                                className="w-full mt-1"
                                onChange={(e) => setData('price', e.target.value)}
                            />
                            <InputError message={errors.price} className="mt-2" />
                        </div>
                        <div className="mt-3">
                            <div className="relative w-48 h-48 border-2 border-gray-300 border-dashed rounded-md">
                                {data.image ? (
                                    <img src={URL.createObjectURL(data.image)} alt="Uploaded" className="object-contain w-full h-full" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                        <ImagePlus className="text-4xl" />
                                        <p className="mt-2">Add Image</p>
                                    </div>
                                )}
                                <input type="file" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button size="sm">Add Data</Button>
                    </div>
                </form>
            </section>
        </AdminLayout>
    )
}
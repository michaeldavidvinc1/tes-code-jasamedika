import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card"
import Layout from "@/Layouts/Layout"
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import InputError from "@/Components/InputError"
import { useRef } from "react"
import { toast } from "sonner"

export default function RentPage({ auth, car, queryParams = null, props }) {

    const { data, setData, post, processing, reset, errors } = useForm({
        start_date: '',
        end_date: '',
        id: '',
    });

    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
    };

    const handleSearch = () => {
        router.get(route("rent.page"), queryParams);
    }

    const inputRef = useRef(null);

    const handleRef = () => {
        const newValue = inputRef.current.value;
        setData({ ...data, id: newValue });
    }

    const submit = (e) => {
        e.preventDefault();
        post(route('rent.post')); 
        if(errors){
            toast.error("Mobil sudah dirental")
        }
    };



    return (
        <Layout auth={auth.user}>
            <Head title="Rent Car" />
            <div className="bg-gray-100">
                <div className="container mx-auto">
                    <div className="py-12 ">
                        <div className="w-full p-10 bg-white rounded-lg">
                            <form>
                                <div className="grid grid-cols-5 gap-x-4">
                                    <div>
                                        <InputLabel htmlFor="merk" value="Merk" />
                                        <TextInput
                                            id="merk"
                                            type="text"
                                            name="merk"
                                            defaultValue={queryParams.merk}
                                            className="block w-full mt-1"
                                            isFocused={true}
                                            onChange={(e) =>
                                                searchFieldChanged("merk", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="name" value="Model" />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            defaultValue={queryParams.name}
                                            className="block w-full mt-1"
                                            isFocused={true}
                                            onChange={(e) =>
                                                searchFieldChanged("name", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="start_date" value="Start Date" />
                                        <TextInput
                                            id="start_date"
                                            type="date"
                                            name="start_date"
                                            // value={data.email}
                                            className="block w-full mt-1"
                                            isFocused={true}
                                        // onChange={(e) => setData('email', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="end_date" value="End Date" />
                                        <TextInput
                                            id="end_date"
                                            type="date"
                                            name="end_date"
                                            // value={data.email}
                                            className="block w-full mt-1"
                                            isFocused={true}
                                        // onChange={(e) => setData('email', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-start w-full">
                                        <Button onClick={handleSearch} className="mt-5">Search Car</Button>
                                        <Button variant="secondary" className="mt-5 ml-3">
                                            <Link href={route("rent.page")}>
                                                Reset
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="flex flex-col items-center justify-center py-12 ">
                            <div>
                                <h1 className="font-sans text-3xl font-bold text-center">Latest <span className="text-blue-500">Inventory</span></h1>
                                <p className="mt-3 text-sm font-bold text-center text-gray-500">Experience the future of Automotive Innovation with our latest car</p>
                            </div>
                            <div className="grid grid-cols-3 gap-8 pt-12">
                                {car.data.map((item, index) => (
                                    <Card className="w-[350px]" key={index} >
                                        <CardHeader style={{ height: '250px' }}>
                                            <img
                                                src={item.image}
                                                className="object-cover w-full h-full"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </CardHeader>
                                        <CardContent>
                                            <h1 className="font-bold">{item.name}</h1>
                                            <p className="text-sm font-bold text-gray-400">{item.merk}</p>
                                        </CardContent>
                                        <CardFooter className="flex justify-between">
                                            <h1 className="text-xl font-bold">Rp.{item.price} <span className="text-lg text-gray-500 text-light">/Day</span></h1>
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Button size="sm">Rent Car</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Rent {item.name}</DialogTitle>
                                                        <DialogDescription>
                                                            <div className="h-[250px]">
                                                                <img
                                                                    src={item.image}
                                                                    className="object-cover w-full h-full"
                                                                    style={{ objectFit: 'cover' }}
                                                                />
                                                            </div>
                                                            <form className="pt-8" onSubmit={submit}>
                                                                <input type="hidden" value={item.id} ref={inputRef} />
                                                                <div className="grid grid-cols-2 gap-x-3">    
                                                                    <div>
                                                                        <InputLabel htmlFor="start_date" value="Start Date" />
                                                                        <TextInput
                                                                            id="start_date"
                                                                            type="date"
                                                                            name="start_date"
                                                                            value={data.start_date}
                                                                            className="block w-full mt-1"
                                                                            isFocused={true}
                                                                            onChange={(e) => setData('start_date', e.target.value)}
                                                                        />
                                                                        <InputError message={errors.start_date} className="mt-2" />
                                                                    </div>
                                                                    <div>
                                                                        <InputLabel htmlFor="end_date" value="End Date" />
                                                                        <TextInput
                                                                            id="end_date"
                                                                            type="date"
                                                                            name="end_date"
                                                                            value={data.end_date}
                                                                            className="block w-full mt-1"
                                                                            isFocused={true}
                                                                            onChange={(e) => setData('end_date', e.target.value)}
                                                                        />
                                                                        <InputError message={errors.end_date} className="mt-2" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-end pt-5">
                                                                    <Button onClick={handleRef} size="sm" >Rent</Button>
                                                                </div>
                                                            </form>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
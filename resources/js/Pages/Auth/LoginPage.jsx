import { Head, useForm, Link } from '@inertiajs/react';
import { Card, CardHeader, CardContent, CardTitle } from "../../Components/ui/card"
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useEffect } from 'react';
import { Button } from '@/Components/ui/button';

export default function LoginPage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };
    return (
        <section className='w-full h-[100vh] flex justify-center items-center'>
            <Head title='PrimeDriveLux | Login' />
            <Card className="w-[400px] shadow-md">
                <CardHeader>
                    <CardTitle>PrimeDriveLux</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full mt-1"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full mt-1"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <Button className="w-full mt-5" disabled={processing}>Sign in</Button>
                        <p className='mt-2 text-sm text-center'>Don't have an account? <Link href={route('register')} className='font-bold'>Sign Up</Link></p>
                    </form>
                </CardContent>
            </Card>
        </section>
    )
}
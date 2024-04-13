import Hero from '@/Components/Hero';
import Merk from '@/Components/Merk';
import Service from '@/Components/Service';
import Layout from '@/Layouts/Layout';

import { Head } from '@inertiajs/react';


export default function Welcome({ auth }) {

    return (
        <Layout auth={auth.user}>
            <Head title='Home Page' />
            <Hero />
            <Merk />
            <Service />
        </Layout>
    );
}

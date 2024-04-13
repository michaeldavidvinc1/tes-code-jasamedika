import { Tag, Wallet, Clock } from "lucide-react"

const service = [
    {
        icon: <Tag className="w-5 h-5 text-blue-600" />,
        title: "A lot of price range",
        description: "You don't need to worry choosing car that match your budget, we serve cars with a lot of price variant"
    },
    {
        icon: <Wallet className="w-5 h-5 text-blue-600" />,
        title: "Best price guaranteed",
        description: "You don't need to worry choosing car that match your budget, we serve cars with a lot of price variant"
    },
    {
        icon: <Clock className="w-5 h-5 text-blue-600" />,
        title: "We are ready 24/7",
        description: "You don't need to worry choosing car that match your budget, we serve cars with a lot of price variant"
    },
]

const Service = () => {
    return (
        <section className="py-12 bg-gray-100 xl:py-24 xl:pt-28">
            <div className="container mx-auto">
                <div className="flex flex-col xl:flex-row">
                    <div className="relative flex-1 hidden xl:flex">
                        <div className="w-[510px] h-[462px] bg-no-repeat relative">
                            <img src="/assets/service.jpeg" alt="service" className="rounded-lg opacity-90" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h1 className="font-bold text-gray-400">BEST SERVICE</h1>
                        <h1 className="mt-4 text-3xl font-extrabold text-center xl:text-start xl:text-5xl">
                            Get amazing experience with our <span className="text-blue-500">Services</span> and <span className="text-blue-500">Deals</span>
                        </h1>
                        <span className='bg-primary h-[5px] w-[30px] mt-2 hidden xl:block mb-8'></span>
                        {service.map((item, index) => {
                            return (
                                <div className="flex items-center justify-start gap-8 py-4 mb-4" key={index}>
                                    <div className="flex items-center justify-center p-5 rounded-lg shadow-lg">
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col">    
                                        <h1 className="font-bold text-md">
                                            {item.title}
                                        </h1>
                                        <p className="mt-2 text-sm text-gray-500">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Service;
import { Send } from "lucide-react"
import { Button } from '../Components/ui/button';
import { Link } from "@inertiajs/react"

const Hero = () => {
    return (
        <section className='py-12 bg-gray-100 xl:py-24 xl:pt-28'>
            <div className='container mx-auto'>
                <div className="flex justify-between gap-x-8">
                    <div className="flex max-w-[600px] flex-col justify-center mx-auto xl:mx-0 text-center xl:text-left">
                        <h1 className="mb-4 text-4xl xl:text-[64px] xl:leading-[80px] tracking-[-2px] font-bold">Get where you need to go with our service</h1>
                        <span className='bg-primary h-[5px] w-[30px] mt-1 hidden xl:block'></span>
                        <p className=" mt-10 text-lg font-light text-muted-foreground max-w-[490px] mx-auto xl:mx-0">
                            Wherever and Whenever you need a car, we have the perfect vehicle for you at an affordable price.
                        </p>
                        {/* Button */}
                        <div className="flex flex-col mx-auto mb-12 gap-y-3 md:flex-row gap-x-3 xl:mx-0">
                            <Link href="" className='mt-8'>
                                <Button className="gap-x-2">Rent Car <Send className='w-3 h-3' /> </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative items-center justify-center hidden w-full xl:flex">
                        <div className='bg-primary w-[300px] h-[600px] rounded-sm absolute'>
                        </div>
                        <img src="/assets/hero.png" alt="" className="z-10 mt-10 ml-10" width={700} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
const merk = [
    { image: "/assets/merk/honda.png" },
    { image: "/assets/merk/hyundai.png" },
    { image: "/assets/merk/mitsubishi.png" },
    { image: "/assets/merk/nissan.svg" },
    { image: "/assets/merk/toyota.png" },
    { image: "/assets/merk/audi.png" },
]

const Merk = () => {
    return (
        <section className="py-12 xl:py-24 xl:pt-20">
            <div className="container mx-auto ">
                <div className="grid items-center grid-cols-3 gap-8 xl:flex xl:justify-center xl:items-center">
                    {merk.map((item, index) => {
                        return (
                            <div key={index}>
                                <img src={item.image} alt="merk" width={100} className="grayscale opacity-40" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}

export default Merk;
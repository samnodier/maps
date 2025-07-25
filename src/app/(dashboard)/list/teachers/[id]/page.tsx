import Image from "next/image";

const SingleTeacherPage = () => {
    return (
        <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
            {/*LEFT*/}
            <div className="w-full xl:w-2/3">
                {/*TOP*/}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/*USER INFO CARD*/}
                    <div className="bg-mapSky py-6 px-4 rounded-md flex-1 flex gap-4">
                        <div className="w-1/3">
                            <Image src="https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" width={144} height={144} className="w-36 h-36 rounded-full object-cover" />
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-4">
                            <h1 className="text-xl font-semibold">Leonard Snyder</h1>
                            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam labore maxime, officia perspiciatis quam quas!</p>
                            <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src="/blood.png" className="" alt="" width={14} height={14} />
                                    <span className="">A+</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src="/date.png" className="" alt="" width={14} height={14} />
                                    <span className="">January 2025</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src="/mail.png" className="" alt="" width={14} height={14} />
                                    <span className="">user@gmail.com</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src="/phone.png" className="" alt="" width={14} height={14} />
                                    <span className="">+1 234 2345 9823</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*SMALL CARDS*/}
                    <div className="flex-1"></div>
                </div>
                {/*BOTTOM*/}
                <div className="">SCHEDULE</div>
            </div>
            {/*RIGHT*/}
            <div className="w-full xl:w-1/3">r</div>

        </div>
    )
}

export default SingleTeacherPage;
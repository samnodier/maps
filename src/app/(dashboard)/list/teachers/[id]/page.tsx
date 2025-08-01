import Image from "next/image";
import BigCalendar from "@/components/BigCalendar";
import Announcements from "@/components/Announcements";
import Link from "next/link";
import Performance from "@/components/Performance";
import FormModal from "@/components/FormModal";

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
                            <Image
                                src="https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                alt="" width={144} height={144} className="w-36 h-36 rounded-full object-cover"/>
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-semibold">Leonard Snyder</h1>
                            <FormModal table="teacher" type="update" data={  {
    id: 5,
    username: "1234567890",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@gmail.com",
    password: "1234567890",
    sex: "male",
    bloodType: "A+",
    birthday: "2025-01-01",
    img:
      "https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "1234567890",
    subjects: ["Music", "History"],
    classes: ["5A", "4B", "3C"],
    address: "123 Main St, Anytown, USA",
  }} />
  </div>
                            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing
                                elit. Ipsam labore maxime, officia perspiciatis quam quas!</p>
                            <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src="/blood.png" className="" alt="" width={14} height={14}/>
                                    <span className="">A+</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src="/date.png" className="" alt="" width={14} height={14}/>
                                    <span className="">January 2025</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src="/mail.png" className="" alt="" width={14} height={14}/>
                                    <span className="">user@gmail.com</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Image src="/phone.png" className="" alt="" width={14} height={14}/>
                                    <span className="">+1 234 2345 9823</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*SMALL CARDS*/}
                    <div className="flex-1 flex gap-4 justify-between flex-wrap">
                        {/*CARD*/}
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image src="/singleAttendance.png" className="w-6 h-6" alt="" width={24} height={24}/>
                            <div className="">
                                <h1 className="text-xl font-semibold">90%</h1>
                                <span className="text-sm text-gray-400">Attendance</span>
                            </div>
                        </div>
                        {/*CARD*/}
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image src="/singleBranch.png" className="w-6 h-6" alt="" width={24} height={24}/>
                            <div className="">
                                <h1 className="text-xl font-semibold">2</h1>
                                <span className="text-sm text-gray-400">Branches</span>
                            </div>
                        </div>
                        {/*CARD*/}
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image src="/singleLesson.png" className="w-6 h-6" alt="" width={24} height={24}/>
                            <div className="">
                                <h1 className="text-xl font-semibold">6</h1>
                                <span className="text-sm text-gray-400">Lessons</span>
                            </div>
                        </div>
                        {/*CARD*/}
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                            <Image src="/singleClass.png" className="w-6 h-6" alt="" width={24} height={24}/>
                            <div className="">
                                <h1 className="text-xl font-semibold">6</h1>
                                <span className="text-sm text-gray-400">Classes</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/*BOTTOM*/}
                <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
                    <h1 className="">Teacher&apos;s Schedule</h1>
                    <BigCalendar />
                </div>
            </div>
            {/*RIGHT*/}
            <div className="w-full xl:w-1/3 flex flex-col gap-4">
                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Shortcuts</h1>
                    <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                        <Link className="p-3 rounded-md bg-mapSkyLight" href="/">Teacher&apos;s Classes</Link>
                        <Link className="p-3 rounded-md bg-mapPurpleLight" href="/">Teacher&apos;s Students</Link>
                        <Link className="p-3 rounded-md bg-mapYellowLight" href="/">Teacher&apos;s Lessons</Link>
                        <Link className="p-3 rounded-md bg-pink-50" href="/">Teacher&apos;s Exams</Link>
                        <Link className="p-3 rounded-md bg-mapSkyLight" href="/">Teacher&apos;s Assignments</Link>
                    </div>
                </div>
                <Performance />
                <Announcements />
            </div>

        </div>
    );
}

export default SingleTeacherPage;
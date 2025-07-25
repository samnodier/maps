const SingleTeacherPage = () => {
    return (
        <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
            {/*LEFT*/}
            <div className="w-full xl:w-2/3">
                {/*TOP*/}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/*USER INFO CARD*/}
                    <div className="bg-mapSky py-6 px-4 rounded-md flex-1 flex gap-4">
                        <div className=""></div>
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
import React from "react";

type InputFieldProps = {
    label: string;
    type?: string;
    register: any;
    name?: string;
    defaultValue?: string;
    error?: string;
    hidden?: boolean;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputField = ({
    label,
    type = "text",
    register,
    name,
    defaultValue,
    error,
    hidden,
    inputProps,
}: InputFieldProps) => {
    return (
        <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4"}>
            <label className="text-xs text-gray-500">{label}</label>
            <input
                type={type}
                {...register(name)}
                {...inputProps}
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                defaultValue={defaultValue}
            />
            {error && (<p className="text-xs text-red-400">{error.toString()}</p>)}
        </div>
    )
}

export default InputField;

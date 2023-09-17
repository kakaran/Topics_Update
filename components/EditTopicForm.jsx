"use client"

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const EditTopicForm = ({ id, title, description }) => {
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description)

    const router = useRouter()

    const handleChange = async () => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topics/${id}`, { newTitle, newDescription })

            if (res) {
                router.refresh()
                router.push("/")
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={handleChange}>
            <input className="border border-slate-500 px-8 py-2" type="text" placeholder="Topic Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} />

            <input className="border border-slate-500 px-8 py-2" type="text" placeholder="Topic Description" value={newDescription} onChange={e => setNewDescription(e.target.value)} />

            <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6  w-fit">Update Topic</button>
        </form>
    )
}

export default EditTopicForm


"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi"

const RemoveBtn = ({ id }) => {

    const router = useRouter()

    const removeTopic = async () => {
        try {
            const confirmed = confirm('Are you confirmed');

            if (confirmed) {
                await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topics?id=${id}`)

                router.refresh()
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <button className="text-red-400 " onClick={removeTopic}>
            <HiOutlineTrash size={24} />
        </button>
    )
}

export default RemoveBtn

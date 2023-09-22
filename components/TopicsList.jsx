import RemoveBtn from './RemoveBtn'
import Link from 'next/link'
import { HiPencilAlt } from "react-icons/hi"

const getTopics = async () => {
    try {
        console.log(process.env.NEXT_PUBLIC_BASE_URL);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topics`,{
            cache : "no-cache"
        })
        if (!res.ok) {
            throw new Error("Failed")
        }
        const Data = await res.json()
        return Data
    } catch (error) {
        console.log("Error loading topis", error);
    }
}

export default async function TopicsList() {

    const Data = await getTopics()

    return (
        <>
            {Data && Data.topics.map((t) => (
                <div key={t.title} className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start'>
                    <div>
                        <h2 className='font-bold text-2xl'>{t.title}</h2>
                        <div>{t.description}</div>
                    </div>
                    <div className='flex gap-2'>
                        <RemoveBtn id={t._id} />
                        <Link href={`/editTopic/${t._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>
                </div>
            ))}

        </>
    )
}


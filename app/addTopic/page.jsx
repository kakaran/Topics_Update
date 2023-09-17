"use client"

import { useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";

const AddTopic = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert('Title and Description are requyired');
    }
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topics`, { title, description });
      
      if (res) {
        router.refresh()
        router.push("/")
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input className="border border-slate-500 px-8 py-2" type="text" placeholder="Topic Title" onChange={e => setTitle(e.target.value)} value={title} />

      <input className="border border-slate-500 px-8 py-2" type="text" placeholder="Topic Description" onChange={e => setDescription(e.target.value)} value={description} />

      <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6  w-fit">Add Topic</button>
    </form>
  )
}

export default AddTopic

import EditTopicForm from '@/components/EditTopicForm'
import axios from 'axios';

const getTopicsById = async (id) => {
    try {
        const res = await (await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topics/${id}`)).data

        if (res) {
            return res
        }
    } catch (error) {
        console.log(error);
    }
}

const EditTopic = async ({ params }) => {
    const { id } = params
    const { topic } = await getTopicsById(id)
    const { title, description } = topic
    return (
        <EditTopicForm id={id} title={title} description={description} />
    )
}

export default EditTopic

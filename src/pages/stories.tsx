import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const Home = ({ stories }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            {stories.map((story) => (
                <div className='p-3'>
                    <div>Title: {story.title}</div>
                    <div>Description: {story.description}</div>
                </div>
            ))}
        </>
    );
};

type IStory = { title: string; description: string };

export const getServerSideProps = (async () => {
    // Fetch data from external API
    const res = await fetch('https://api.truyen.hatienloi.me/stories/?page=1&limit=100');
    const repo = await res.json();
    const stories: IStory[] = repo.items;
    // Pass data to the page via props
    return {
        props: {
            stories
        }
    };
}) satisfies GetServerSideProps<{ stories: IStory[] }>;

export default Home;

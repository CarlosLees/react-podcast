import { podcastData } from '@/constants';
import PodcastCard from '@/components/podcastCard/PodcastCard';

export default function Home() {
    return (
        <div className="mt-9 flex flex-col gap-9">
            <section className="flex flex-col gap-5">
                <h1 className="text-20 font-bold text-white-1">Trending Podcast</h1>
                <div className="podcast_grid">
                    {podcastData.map(({ id, title, imgURL, description }) => {
                        return (
                            <PodcastCard
                                key={id}
                                title={title}
                                imageURL={imgURL}
                                description={description}
                                podcastId={id}
                            />
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

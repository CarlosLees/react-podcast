const Podcast = ({ params }: { params: { podcastId: string } }) => {
    return <div>podcastId is : {params.podcastId}</div>;
};

export default Podcast;

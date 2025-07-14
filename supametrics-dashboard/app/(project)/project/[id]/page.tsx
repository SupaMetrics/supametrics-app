export default async function ProjectPage({ params, } : {
    params: Promise<{ slug: string}>
}) {
    const { id } = await params;

    return <div> My {id} </div>
}
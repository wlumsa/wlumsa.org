interface Resource{
    title:string,
    link:string;
}
interface Props {
    resources: Resource[],
    header: string,
}

const ResourceCollapse: React.FC<Props> = ({ resources, header }) => {
    return (
        <div className="collapse collapse-arrow border bg-secondary text-base-content">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium text-primary">{header}</div>
            <ul className="collapse-content">
                {resources.map((resource, index) => (
                    <li key={index}>
                        <a 
                            className='link' 
                            href={resource.link} 
                            target="_blank" rel="noopener noreferrer"
                        >
                            {resource.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResourceCollapse;

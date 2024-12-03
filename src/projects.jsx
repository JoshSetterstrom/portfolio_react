import './projects.css';
import Card from "./card";

import img1 from './assets/initek.png';
import InitekPlaceholder from './initek/initekPlaceholder';



const _projects = [
    {
        id: "initeksolutions",
        title: "Initek Solutions INC",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        href: "https://initeksolutions.com",
        placeholder: <InitekPlaceholder />,
        img: img1,
        alt: "Link to Initek Solutions.com",
        color: "#000"
    },
    {
        id: "algo",
        title: "Algo GUI",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        href: "",
        placeholder: null,
        img: null,
        alt: "Link to Algo GUI",
        color: "#fff"
    },
    {
        id: "future-game-project",
        title: "Future Game",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        href: "",
        placeholder: null,
        img: null,
        alt: "Link to Future game",
        color: "var(--compcolor6)"
    }
]


const Projects = () => {
    return (
        <section id='cards'>
            {_projects.map((item, i) => (
                <Card 
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                    placeholder={item.placeholder}
                    img={item.img}
                    alt={item.alt}
                    color={item.color}
                />
            ))}
        </section>
    );
};

export default Projects;
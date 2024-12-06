import { useEffect, useRef, useState } from 'react';
import './card.css';
import noImage from './noImage';

const Tag = ({name}) => {
    return <span className='card-tag'>{name}</span>
}

const Card = ({id, title, description, href, placeholder, img, alt, color, tags}) => {
    const [image, setImage] = useState(img ? <img src={img} alt={alt}/> : noImage);
    const ref = useRef(null);
    const articleRef = useRef(null);

    const handleAnchorClick = e => {
        e.preventDefault();

        articleRef.current.style.opacity = 0;

        ref.current.classList.add('transition');

        const rect = ref.current.getBoundingClientRect()

        ref.current.style.maxWidth = `${window.innerWidth}px`;
        ref.current.style.left = `-${rect.left}px`;

        ref.current.style.maxHeight = `${window.innerHeight}px`;
        ref.current.style.top = `-${rect.top}px`;

        setTimeout(() => setImage(placeholder), 200);
        setTimeout(() => window.location.href = href, 500);
    };

    return (
        <section className="card" id={id}>
            <a ref={ref} onClick={handleAnchorClick} href={href} className={img ? '' : 'no-preview'} style={{backgroundColor: color}}>
                {image}
            </a>

            <article ref={articleRef}>
                {tags.map(tag => <Tag name={tag}/>)}
                <header>
                    <h2>{title}</h2>
                </header>

                <p>{description}</p>
            </article>
        </section>
    );
};

export default Card;
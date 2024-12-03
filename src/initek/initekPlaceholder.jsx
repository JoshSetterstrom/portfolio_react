import './initekPlaceholder.css';
import headerLogo from '../assets/initek-logo.png'

const Header = () => {
    const sections = ['Home', 'About Us', 'Our Services', 'Contact Us'];

    const sectionElements = sections.map((section, i) => (
        <div
            className='nav-item'
            key={`a-${section}`}
        >
            {section}
        </div>
    ));

    return (
        <header id='initek-header'>
            <div className="header-img-container">
                <img src={headerLogo} alt="logo" />
            </div>

            <nav>{sectionElements}</nav>
        </header>
    )
}

export default function InitekPlaceholder() {
    return (
        <div id='initek-placeholder'>
            <Header />
            <section id='initek-home'/>

            <span id='initek-aboutus'>
                <div className='initek-background'/>
            </span>
        </div>
    );
};
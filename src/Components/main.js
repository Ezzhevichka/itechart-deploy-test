import Questions from './Questions/questions';
import Header from './Header/header';
import Footer from './Footer/footer';

export default function Main() {
    return(
        <section>
            <Header />
            <Questions />
            <Footer />
        </section>
    )
}
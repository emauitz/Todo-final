
import TodoNavBar from "./NavBar.jsx"
import Cotizaciones from "./ApiDolar.jsx"
import ContainerTodo from "./ContainerTodo.jsx";
import Footer from "./Footer.jsx"

function MainPage () {

    return (
        <>
            <TodoNavBar />
            <ContainerTodo />
            <Cotizaciones /> 
            <Footer />
        </>
    );
};

export default MainPage;
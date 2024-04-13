import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";

export default function Layout({ auth, children }) {

    return (
        <div className="h-[100%]">
            <Navbar auth={auth} />
            {children}
            <Footer />
        </div>
    )
}
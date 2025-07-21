import { ContainerPages } from "../../shared/ContainerPages"
import Footer from "../../shared/Footer"
import { SidebarPage } from "../../shared/ResponsiveSidebar"
import LogoHeader from "./components/LogoHeader"
import OrderForm from "./components/OrderForm"

const PageHome = () => {
    const domain = "PILAR"
    return (
        <SidebarPage>
            <ContainerPages className="bg-gradient-to-tr  from-gray-100 to-gray-100 ">
                <div className="space-y-16 max-w-5xl mx-auto pt-4 ">
                    {/* COMPONENTES  */}
                    <LogoHeader domain={domain} />
                    <OrderForm domain={domain} />
                </div>
                {/* FOOTER */}
                <Footer />
            </ContainerPages>
        </SidebarPage>
    )
}

export default PageHome
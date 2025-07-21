import { useState, type FC } from "react"
import { ContainerPages } from "../../shared/ContainerPages"
import Footer from "../../shared/Footer"
import { SidebarPage } from "../../shared/ResponsiveSidebar"
import OrderForm, { type DtoData } from "./components/OrderForm"
import { ContainerModals } from "../../shared/ContainerModals"
import ModalQr from "./components/mod/ModalQr"
import LogoHeader from "../../shared/ui/LogoHeader"
import GenerateOrderCard from "./components/GenerateOrderCard"

interface PageHomeProps {
    domain: string;
}
const PageHome: FC<PageHomeProps> = ({ domain }) => {
    const [modal, setModal] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")
    const [dataQr, setDataQr] = useState<DtoData | null>(null)
    const handleOpenModal = (data: DtoData) => {
        console.log(data);
        setDataQr(data)
        setModal(true)

    }
    return (
        <SidebarPage>
            <ContainerPages className="bg-gradient-to-tr  from-gray-100 to-gray-100 ">
                <div className="space-y-16 max-w-5xl mx-auto pt-4 ">
                    {/* COMPONENTES  */}
                    <LogoHeader domain={domain} />
                    <OrderForm success={(data: DtoData) => handleOpenModal(data)} domain={domain} />
                    {dataQr && dataQr.link && (
                        <GenerateOrderCard amount={parseInt(dataQr.monto)} qrLink={dataQr.link} domain={domain} />
                    )}
                </div>
                {/* FOOTER */}
                <Footer />
                {modal && (
                    <ContainerModals>
                        <ModalQr domain={domain} value={value} onClose={() => setModal(false)} />
                    </ContainerModals>
                )}
            </ContainerPages>
        </SidebarPage>
    )
}

export default PageHome
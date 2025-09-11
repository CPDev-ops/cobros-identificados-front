import { useState, type FC } from "react"
import { ContainerPages } from "../../shared/ContainerPages"
import { SidebarPage } from "../../shared/ResponsiveSidebar"
import OrderForm, { type DtoData } from "./components/OrderForm"
import { ContainerModals } from "../../shared/ContainerModals"
import ModalQr from "./components/mod/ModalQr"
import LogoHeader from "../../shared/ui/LogoHeader"
import GenerateOrderCard from "./components/GenerateOrderCard"
import CardList from "./components/CardList"
import LogoutButton from "../../shared/LogoutButton"

interface PageHomeProps {
    domain: string;
}
const
    PageHome: FC<PageHomeProps> = ({ domain }) => {
        const [modal, setModal] = useState<boolean>(false)
        const [dataQr, setDataQr] = useState<DtoData | null>(null)
        /* BOOLEANO DE LA PRIMER CARD ORDERFORM */
        const [isOpen, setIsOpen] = useState<boolean>(true)
        const handleOpenModal = (data: DtoData) => {
            console.log(data);
            setDataQr(data)
            setModal(true)
            setIsOpen(false)
        }

        return (
            <SidebarPage>
                <ContainerPages className="bg-gradient-to-tr  from-gray-100 to-gray-100 ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto pt-6">
                        {/* COMPONENTES  */}
                        {/* Botón de logout en la primera fila */}
                        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end mb-2">
                            <LogoutButton />
                        </div>
                        
                        {/* Logo que ocupa todas las columnas */}
                        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                            <LogoHeader domain={domain} />
                        </div>
                        <OrderForm isOpen={isOpen} setIsOpen={setIsOpen} success={(data: DtoData) => handleOpenModal(data)} domain={domain} />
                        {dataQr && dataQr.link && (
                            <GenerateOrderCard amount={parseInt(dataQr.monto)} qrLink={dataQr.link} domain={domain} />
                        )}
                        <CardList />
                    </div>
                    {modal && dataQr?.link && (
                        <ContainerModals>
                            <ModalQr domain={domain} value={dataQr?.link} onClose={() => setModal(false)} />
                        </ContainerModals>
                    )}
                </ContainerPages>
            </SidebarPage>
        )
    }

export default PageHome
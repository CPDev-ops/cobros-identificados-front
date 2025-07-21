import type { FC } from "react";
import { SidebarPage } from "../../shared/ResponsiveSidebar";
import { ContainerPages } from "../../shared/ContainerPages";
import LogoHeader from "../../shared/ui/LogoHeader";
import Footer from "../../shared/Footer";
import CardPayOrder from "./components/CardPayOrder";
import { useNavigate } from "react-router-dom";

interface PagePayOrderProps {
    domain: string;

}
const PagePayOrder: FC<PagePayOrderProps> = ({ domain }) => {
    const navigate = useNavigate();
    return (
        <SidebarPage>
            <ContainerPages>
                <div className="space-y-16 max-w-5xl mx-auto pt-4">
                    <LogoHeader domain={domain} />
                    <CardPayOrder amount={100} concepto="" domain={domain} onConfirm={() => navigate('/pay-order-success')} />
                </div>
                <Footer />
            </ContainerPages>
        </SidebarPage>
    )
}

export default PagePayOrder
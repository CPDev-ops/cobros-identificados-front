import type { FC } from "react";
import { ContainerPages } from "../../shared/ContainerPages"
import { SidebarPage } from "../../shared/ResponsiveSidebar"
import LogoHeader from "../../shared/ui/LogoHeader"
import CardPaySuccess from "./components/CardPaySuccess";
import Footer from "../../shared/Footer";

interface PageSuccessProps {
    domain: string;
}

const PageSuccess: FC<PageSuccessProps> = ({ domain }) => {
    return (
        <SidebarPage>
            <ContainerPages>
                <div className="space-y-16 max-w-5xl mx-auto pt-4">
                    <LogoHeader domain={domain} />
                    <CardPaySuccess domain={domain}
                        amount={100}
                        dateTime="11 de Julio de 2025, 16:48"
                        dni="20443014935"
                        paymentId="117755285803"
                    />
                </div>
                <Footer />
            </ContainerPages>
        </SidebarPage>
    )
}
export default PageSuccess
import { Route, Routes } from 'react-router-dom'
import RedirectModule from '../core/pages/Redirect'
import PageHome from '../core/pages/home/page'
import PagePayment from '../core/pages/payments/page'
import PageSuccess from '../core/pages/success/page'



export const RouterContainer = () => {
    const domain = 'PILAR'
    return (
        <div className='tracking-wider gothamMedium'>
            <Routes>
                <Route path='/' element={<RedirectModule route='/home' />} />
                <Route path='/home' element={<PageHome domain={domain} />} />
                <Route path='/pay-order' element={<PagePayment domain={domain} />} />
                <Route path='/pay-order-success' element={<PageSuccess domain={domain} />} />
            </Routes>
        </div>
    )
}


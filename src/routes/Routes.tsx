import { Route, Routes } from 'react-router-dom'
import RedirectModule from '../core/pages/Redirect'
import PagePayment from '../core/pages/payments/page'
import PageSuccess from '../core/pages/success/page'
import PageHome from '../core/pages/home/page'
import PageError from '../core/pages/error/page'
import { LoginPage } from '../core/pages/auth/login/page'



export const RouterContainer = () => {
    const domain = 'PILAR'
    return (
        <div className='tracking-wider gothamBook'>
            <Routes>
                <Route path='/' element={<RedirectModule domain={domain} route='/auth/login' />} />
                <Route path='/auth/login' element={< LoginPage />} />
                <Route path='/home' element={<PageHome domain={domain} />} />
                <Route path='/pagar/orden/:orderId' element={<PagePayment domain={domain} />} />
                <Route path='/pagar/orden/:orderId/success' element={<PageSuccess domain={domain} />} />
                <Route path='/pagar/orden/:orderId/error' element={<PageError domain={domain} />} />
            </Routes>
        </div>
    )
}

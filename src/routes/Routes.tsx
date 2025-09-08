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
                <Route path='/pagar/orden/success/:orderId' element={<PageSuccess domain={domain} />} />
                <Route path='/pagar/orden/error/:orderId' element={<PageError domain={domain} />} />
            </Routes>
        </div>
    )
}

/* /pagar/orden/5f689836-1ef3-4196-8e8d-b0d7b262b9eb/success?collection_id=124155163065&collection_status=approved&payment_id=124155163065&status=approved&external_reference=5f689836-1ef3-4196-8e8d-b0d7b262b9eb&payment_type=account_money&merchant_order_id=33698669766&preference_id=805179526-448181b0-041a-4122-818e-98d0a3b47457&site_id=MLA&processing_mode=aggregator&merchant_account_id=null */